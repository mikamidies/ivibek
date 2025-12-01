interface Program {
  id: number;
  name: string;
  university: string;
  description: string;
  startDate: string;
  endDate: string;
  category: string;
  isOnline: boolean;
}

interface CreateProgramPayload {
  name: string;
  university: string;
  description: string;
  startDate: string;
  endDate: string;
  category: string;
  isOnline: boolean;
}

interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export const usePrograms = () => {
  const { accessToken } = useAuth();
  const API_BASE = "https://api.ivybek.com";

  const fetchPrograms = async (): Promise<Program[]> => {
    try {
      console.log(
        "Fetching programs with token:",
        accessToken.value?.substring(0, 20) + "..."
      );
      const data = await $fetch<PaginatedResponse<Program>>(
        `${API_BASE}/api/v1/student/programs`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
          async onResponseError({ response }) {
            console.error("Response error:", {
              status: response.status,
              statusText: response.statusText,
              body: response._data,
              headers: response.headers,
            });
          },
        }
      );
      console.log("Programs fetched successfully:", data);
      return data?.content || [];
    } catch (error: any) {
      console.error("Error fetching programs:", error);
      console.error("Error response:", error.response);
      console.error("Error data:", error.data);
      console.error("Full error object:", JSON.stringify(error, null, 2));
      throw error;
    }
  };

  const fetchProgramById = async (id: number): Promise<Program> => {
    try {
      const data = await $fetch<Program>(
        `${API_BASE}/api/v1/student/programs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching program:", error);
      throw error;
    }
  };

  const createProgram = async (
    payload: CreateProgramPayload
  ): Promise<Program> => {
    try {
      const data = await $fetch<Program>(
        `${API_BASE}/api/v1/student/programs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
          },
          body: payload,
        }
      );
      return data;
    } catch (error) {
      console.error("Error creating program:", error);
      throw error;
    }
  };

  const updateProgram = async (
    id: number,
    payload: CreateProgramPayload
  ): Promise<Program> => {
    try {
      const data = await $fetch<Program>(
        `${API_BASE}/api/v1/student/programs/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
          },
          body: payload,
        }
      );
      return data;
    } catch (error) {
      console.error("Error updating program:", error);
      throw error;
    }
  };

  return {
    fetchPrograms,
    fetchProgramById,
    createProgram,
    updateProgram,
  };
};
