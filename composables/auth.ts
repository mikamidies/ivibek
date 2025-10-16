interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const useAuth = () => {
  const user = useState<User | null>("user", () => null);
  const accessToken = useCookie("access_token", {
    maxAge: 60 * 15, // 15 минут
  });
  const refreshToken = useCookie("refresh_token", {
    maxAge: 60 * 60 * 24 * 30, // 30 дней
  });

  const API_BASE = "https://api.ivybek.com";

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
      user.value = data.user;

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.data?.message || "Неверный логин или пароль",
      };
    }
  };

  const register = async (formData: {
    username: string;
    password: string;
    passwordConfirm: string;
    fullName: string;
    gender: "MALE" | "FEMALE";
    dateOfBirth: string;
    email: string;
    countryId: number;
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
      user.value = data.user;

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.data?.message || "Ошибка регистрации",
      };
    }
  };

  const refresh = async () => {
    if (!refreshToken.value) return false;

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
      user.value = data.user;

      return true;
    } catch {
      logout();
      return false;
    }
  };

  const logout = () => {
    accessToken.value = null;
    refreshToken.value = null;
    user.value = null;
    navigateTo("/auth/login");
  };

  const fetchUser = async () => {
    if (!accessToken.value) {
      await refresh();
    }
  };

  return {
    user,
    accessToken,
    login,
    register,
    refresh,
    logout,
    fetchUser,
  };
};
