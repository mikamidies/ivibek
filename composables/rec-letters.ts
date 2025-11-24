interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

interface RecLetterChat {
  uuid: string;
  title?: string;
  messages: Message[];
  createdAt?: string;
  updatedAt?: string;
}

interface SendMessagePayload {
  message: string;
}

export const useRecLetters = () => {
  const { accessToken } = useAuth();
  const API_BASE = "https://api.ivybek.com";

  const createChat = async (message: string, title?: string) => {
    if (!accessToken.value) {
      return {
        success: false,
        error: "Не авторизован",
        uuid: null,
        requiresPayment: false,
      };
    }

    try {
      const data: any = await $fetch(
        `${API_BASE}/api/v1/student/rec-letter-ai-orders/place`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
          },
          body: {
            message,
            title: title || message.substring(0, 50),
          },
        }
      );

      return {
        success: true,
        data,
        uuid: data.uuid || data.id,
        requiresPayment: true,
      };
    } catch (error: any) {
      console.error("Error creating chat:", error);
      return {
        success: false,
        error: error.data?.message || error.message || "Ошибка создания чата",
        uuid: null,
        requiresPayment: false,
      };
    }
  };

  const sendMessage = async (uuid: string, message: string) => {
    if (!accessToken.value) {
      return { success: false, error: "Не авторизован" };
    }

    try {
      const data = await $fetch(
        `${API_BASE}/api/v1/student/rec-letter-ai-orders/${uuid}/sendMessage`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
          },
          body: { message },
        }
      );

      return { success: true, data };
    } catch (error: any) {
      console.error("Error sending message:", error);
      return {
        success: false,
        error:
          error.data?.message || error.message || "Ошибка отправки сообщения",
      };
    }
  };

  const getChats = async (page = 0, size = 20) => {
    if (!accessToken.value) {
      return { success: false, error: "Не авторизован", data: null };
    }

    try {
      const data = await $fetch(
        `${API_BASE}/api/v1/student/rec-letter-ai-orders`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
          params: {
            page,
            size,
          },
        }
      );

      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: error.data?.message || "Ошибка загрузки чатов",
        data: null,
      };
    }
  };

  const getChatById = async (uuid: string) => {
    if (!accessToken.value) {
      return { success: false, error: "Не авторизован", data: null };
    }

    try {
      const data = await $fetch(
        `${API_BASE}/api/v1/student/rec-letter-ai-orders/${uuid}`,
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
        error: error.data?.message || "Ошибка загрузки чата",
        data: null,
      };
    }
  };

  return {
    createChat,
    sendMessage,
    getChats,
    getChatById,
  };
};
