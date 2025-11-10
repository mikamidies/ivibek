interface Country {
  id: number;
  name: string;
}

interface UserInfo {
  fullName: string;
  gender: string;
  email: string;
  dateOfBirth: string;
  country: Country;
  timezone: string | null;
}

interface User {
  id: number;
  username: string;
  image: string | null;
  info: UserInfo;
  about: string | null;
  joinedAt: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user?: User;
}

export const useAuth = () => {
  const user = useState<User | null>("user", () => null);
  const accessToken = useCookie("access_token", {
    maxAge: 60 * 15,
  });
  const refreshToken = useCookie("refresh_token", {
    maxAge: 60 * 60 * 24 * 30,
  });

  const API_BASE = "https://api.ivybek.com";

  const logout = () => {
    console.log("LOGGING OUT...");
    console.trace("Logout called from:");

    accessToken.value = null;
    refreshToken.value = null;
    user.value = null;

    if (import.meta.client) {
      window.location.href = "/auth/login";
    }
  };

  const login = async (
    username: string,
    password: string,
    remember: boolean = false
  ) => {
    try {
      const data: AuthResponse = await $fetch(
        `${API_BASE}/api/v1/student/auth/login`,
        {
          method: "POST",
          body: { username, password },
        }
      );

      accessToken.value = data.accessToken;
      refreshToken.value = data.refreshToken;

      if (data.user) {
        user.value = data.user;
      } else {
        await fetchUser();
      }

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.data?.message || "Invalid username or password",
      };
    }
  };

  const register = async (formData: {
    username: string;
    password: string;
    passwordConfirm: string;
    fullName?: string;
    gender?: "MALE" | "FEMALE";
    dateOfBirth?: string;
    email?: string;
    countryId?: number;
  }) => {
    try {
      const data: AuthResponse = await $fetch(
        `${API_BASE}/api/v1/student/auth/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      accessToken.value = data.accessToken;
      refreshToken.value = data.refreshToken;

      if (data.user) {
        user.value = data.user;
      } else {
        await fetchUser();
      }

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.data?.message || "Registration error",
      };
    }
  };

  const refresh = async () => {
    if (!refreshToken.value) {
      console.warn("⚠️ No refreshToken available for refresh");
      return false;
    }

    console.log("REFRESHING TOKENS...");

    try {
      const data: AuthResponse = await $fetch(
        `${API_BASE}/api/v1/student/auth/refresh`,
        {
          method: "POST",
          body: { refreshToken: refreshToken.value },
        }
      );

      accessToken.value = data.accessToken;
      refreshToken.value = data.refreshToken;

      if (data.user) {
        user.value = data.user;
      }

      console.log("TOKENS SUCCESSFULLY REFRESHED");
      return true;
    } catch (error: any) {
      console.error("ERROR REFRESHING TOKENS:", error);
      console.error("STATUS:", error.status || "undefined");
      console.error("MESSAGE:", error.message || "no message");
      console.error("DATA:", error.data || "no data");

      if (error.status === 401 || error.status === 403) {
        console.error("RefreshToken invalid - logging out");
        logout();
        return false;
      }

      console.warn("Temporary network error - tokens NOT reset");
      console.warn("ERROR TYPE:", error.constructor.name);
      return false;
    }
  };

  const fetchUser = async () => {
    if (!accessToken.value) {
      await refresh();
      if (!accessToken.value) return;
    }

    try {
      const data = await $fetch(`${API_BASE}/api/v1/student/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });

      user.value = data as User;
    } catch (error: any) {
      console.error("Failed to fetch user:", error);

      if (error.status === 401) {
        const refreshed = await refresh();
        if (!refreshed) {
          console.warn("Failed to refresh token while loading profile");
        }
      }
    }
  };

  const updateProfile = async (profileData: {
    fullName?: string;
    countryId?: number;
    email?: string;
    dateOfBirth?: string;
    gender?: "MALE" | "FEMALE";
    timezone?: string;
  }) => {
    if (!accessToken.value) {
      return { success: false, error: "Not authorized" };
    }

    try {
      await $fetch(`${API_BASE}/api/v1/student/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          "Content-Type": "application/json",
        },
        body: profileData,
      });

      await fetchUser();

      return { success: true };
    } catch (error: any) {
      console.error("Composable error:", error);
      return {
        success: false,
        error: error.data?.message || "Error updating profile",
      };
    }
  };

  const updateProfileImage = async (imageFile: File) => {
    if (!accessToken.value) {
      return { success: false, error: "Не авторизован" };
    }

    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const response = await fetch(`${API_BASE}/api/v1/common/files/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const uploadResponse = await response.json();
      console.log("Upload response:", uploadResponse);

      const imagePath = uploadResponse.filePath;
      console.log("Image path:", imagePath);

      if (!imagePath) {
        throw new Error("Failed to get image path");
      }

      await $fetch(`${API_BASE}/api/v1/student/profile/updateImage`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          "Content-Type": "application/json",
        },
        body: {
          image: imagePath,
        },
      });

      await fetchUser();

      return { success: true };
    } catch (error: any) {
      console.error("Image upload error:", error);
      return {
        success: false,
        error: error.message || "Error uploading photo",
      };
    }
  };

  const updateAbout = async (about: string) => {
    if (!accessToken.value) {
      return { success: false, error: "Not authorized" };
    }

    try {
      await $fetch(`${API_BASE}/api/v1/student/profile/updateAbout`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          "Content-Type": "application/json",
        },
        body: { about },
      });

      await fetchUser();

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.data?.message || "Error updating description",
      };
    }
  };

  const resetPassword = async (
    username: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      await $fetch(`${API_BASE}/api/v1/student/auth/reset-password`, {
        method: "POST",
        body: { username, newPassword, confirmPassword },
      });

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error:
          error.data?.message ||
          "Password reset error. Please check the username",
      };
    }
  };

  const safeFetch = async (url: string, options: any = {}) => {
    if (!accessToken.value) {
      const refreshed = await refresh();
      if (!refreshed) {
        throw new Error("Not authenticated");
      }
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken.value}`,
    };

    try {
      return await $fetch(url, { ...options, headers });
    } catch (error: any) {
      if (error.status === 401) {
        console.log("401 в safeFetch, refreshing token...");
        const refreshed = await refresh();

        if (refreshed && accessToken.value) {
          const newHeaders = {
            ...options.headers,
            Authorization: `Bearer ${accessToken.value}`,
          };
          return await $fetch(url, { ...options, headers: newHeaders });
        }
      }
      throw error;
    }
  };

  return {
    user,
    accessToken,
    refreshToken,
    login,
    register,
    refresh,
    fetchUser,
    updateProfile,
    updateProfileImage,
    updateAbout,
    resetPassword,
    logout,
    safeFetch,
  };
};
