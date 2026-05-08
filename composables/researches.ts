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

export const useResearches = () => {
  const { fetchList, request, postJson, putJson } = useApiClient();

  const fetchResearches = async (): Promise<Research[]> => {
    try {
      return await fetchList<Research>("/api/v1/student/researches");
    } catch (error) {
      console.error("Error fetching researches:", error);
      throw error;
    }
  };

  const fetchResearchById = async (id: number): Promise<Research> => {
    try {
      return await request<Research>(`/api/v1/student/researches/${id}`);
    } catch (error) {
      console.error("Error fetching research:", error);
      throw error;
    }
  };

  const createResearch = async (
    payload: CreateResearchPayload
  ): Promise<Research> => {
    try {
      return await postJson<Research>("/api/v1/student/researches", payload);
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
      return await putJson<Research>(
        `/api/v1/student/researches/${id}`,
        payload
      );
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
