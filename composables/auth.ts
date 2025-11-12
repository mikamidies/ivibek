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

let refreshPromise: Promise<boolean> | null = null;

export const useAuth = () => {
  const user = useState<User | null>("user", () => null);

  const accessToken = useCookie("access_token", {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  const refreshToken = useCookie("refresh_token", {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });

  const API_BASE = "https://api.ivybek.com";

  const logout = async () => {
    accessToken.value = null;
    refreshToken.value = null;
    user.value = null;
    refreshPromise = null;

    if (import.meta.client) {
      await navigateTo("/auth/login", { replace: true });
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

  const refresh = async (): Promise<boolean> => {
    if (refreshPromise) {
      return refreshPromise;
    }

    if (!refreshToken.value) {
      return false;
    }

    if (isTokenExpired(refreshToken.value)) {
      await logout();
      return false;
    }

    refreshPromise = (async () => {
      try {
        const data: AuthResponse = await $fetch(
          `${API_BASE}/api/v1/common/auth/refresh`,
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

        return true;
      } catch (error: any) {
        if (error.status === 401 || error.status === 403) {
          await logout();
          return false;
        }
        return false;
      } finally {
        refreshPromise = null;
      }
    })();

    return refreshPromise;
  };

  const fetchUser = async () => {
    if (!accessToken.value || isTokenExpired(accessToken.value)) {
      const refreshed = await refresh();
      if (!refreshed || !accessToken.value) {
        return;
      }
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
      if (error.status === 401) {
        console.warn("401 when fetching user - token may be invalid");
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
      return { success: false, error: "Unauthorized" };
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

      const imagePath = uploadResponse.filePath;

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
  };
};
