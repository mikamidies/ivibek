interface EssayOrder {
  id: number;
  mentorId: number;
  deadlineId: number;
  essayType: "PERSONAL" | "SUPPLEMENTAL";
  wordLimitId: number;
  title: string;
  body: string;
  price?: number;
  status?: string;
  createdAt?: string;
}

interface PaginatedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

interface CreateEssayPayload {
  mentorId: number;
  deadlineId: number;
  essayType: "PERSONAL" | "SUPPLEMENTAL";
  wordLimitId: number;
  title: string;
  body: string;
  price: number;
}

interface PriceCalculatePayload {
  deadlineId: number;
  wordLimitId: number;
}

interface EditEssayPayload {
  mentorId: number;
  deadlineId: number;
  essayType: "PERSONAL" | "SUPPLEMENTAL";
  wordLimitId: number;
  title: string;
  body: string;
  price: number;
}

export const useEssay = () => {
  const { accessToken } = useAuth();
  const API_BASE = "https://api.ivybek.com";

  const calculatePrice = async (payload: PriceCalculatePayload) => {
    if (!accessToken.value) {
      return { success: false, error: "Не авторизован", price: null };
    }

    try {
      const data = await $fetch(
        `${API_BASE}/api/v1/student/essay-orders/price/calculate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
          },
          body: payload,
        }
      );

      return { success: true, price: data };
    } catch (error: any) {
      return {
        success: false,
        error: error.data?.message || "Ошибка расчёта цены",
        price: null,
      };
    }
  };

  const createEssay = async (payload: CreateEssayPayload) => {
    if (!accessToken.value) {
      return { success: false, error: "Не авторизован" };
    }

    try {
      const data = await $fetch(
        `${API_BASE}/api/v1/student/essay-orders/place`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
          },
          body: payload,
        }
      );

      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: error.data?.message || "Ошибка создания эссе",
      };
    }
  };

  const fetchEssays = async (page = 0, size = 10) => {
    if (!accessToken.value) {
      return { success: false, error: "Не авторизован" };
    }

    try {
      const data = await $fetch(`${API_BASE}/api/v1/student/essay-orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
        params: {
          page,
          size,
        },
      });

      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: error.data?.message || "Ошибка загрузки эссе",
      };
    }
  };

  const fetchEssayById = async (id: number) => {
    if (!accessToken.value) {
      return { success: false, error: "Не авторизован" };
    }
    try {
      const data = await $fetch(
        `${API_BASE}/api/v1/student/essay-orders/${id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: error.data?.message || "Ошибка получения эссе",
      };
    }
  };

  const editEssay = async (id: number, payload: EditEssayPayload) => {
    if (!accessToken.value) {
      return { success: false, error: "Не авторизован" };
    }

    try {
      const data = await $fetch(
        `${API_BASE}/api/v1/student/essay-orders/${id}/edit`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
          },
          body: payload,
        }
      );

      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: error.data?.message || "Ошибка редактирования эссе",
      };
    }
  };

  const fetchWordLimits = async () => {
    if (!accessToken.value) {
      return { success: false, error: "Не авторизован", data: [] };
    }

    try {
      const response = await $fetch<PaginatedResponse<any>>(
        `${API_BASE}/api/v1/student/essay-orders/wordLimits`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );

      const wordLimits = response?.content || [];

      return { success: true, data: wordLimits };
    } catch (error: any) {
      console.error("Fetch word limits error:", error);
      return {
        success: false,
        error: error.data?.message || "Ошибка загрузки лимитов слов",
        data: [],
      };
    }
  };

  const fetchDeadlines = async () => {
    if (!accessToken.value) {
      return { success: false, error: "Не авторизован", data: [] };
    }

    try {
      const response = await $fetch<PaginatedResponse<any>>(
        `${API_BASE}/api/v1/student/essay-orders/deadlines`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );

      const deadlines = response?.content || [];

      return { success: true, data: deadlines };
    } catch (error: any) {
      console.error("Fetch deadlines error:", error);
      return {
        success: false,
        error: error.data?.message || "Ошибка загрузки дедлайнов",
        data: [],
      };
    }
  };

  return {
    calculatePrice,
    createEssay,
    fetchEssays,
    fetchEssayById,
    editEssay,
    fetchWordLimits,
    fetchDeadlines,
  };
};
