interface Research {
  id: number;
  name: string;
  question: string;
  startDate: string;
  endDate: string;
}

interface CreateResearchPayload {
  name: string;
  question: string;
  startDate: string;
  endDate: string;
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

export const useResearches = () => {
  const { accessToken } = useAuth();
  const API_BASE = "https://api.ivybek.com";

  const fetchResearches = async (): Promise<Research[]> => {
    try {
      const data = await $fetch<PaginatedResponse<Research>>(
        `${API_BASE}/api/v1/student/researches`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return data?.content || [];
    } catch (error) {
      console.error("Error fetching researches:", error);
      throw error;
    }
  };

  const fetchResearchById = async (id: number): Promise<Research> => {
    try {
      const data = await $fetch<Research>(
        `${API_BASE}/api/v1/student/researches/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching research:", error);
      throw error;
    }
  };

  const createResearch = async (
    payload: CreateResearchPayload
  ): Promise<Research> => {
    try {
      const data = await $fetch<Research>(
        `${API_BASE}/api/v1/student/researches`,
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
      console.error("Error creating research:", error);
      throw error;
    }
  };

  const updateResearch = async (
    id: number,
    payload: CreateResearchPayload
  ): Promise<Research> => {
    try {
      const data = await $fetch<Research>(
        `${API_BASE}/api/v1/student/researches/${id}`,
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
      console.error("Error updating research:", error);
      throw error;
    }
  };

  return {
    fetchResearches,
    fetchResearchById,
    createResearch,
    updateResearch,
  };
};
