interface Honor {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface CreateHonorPayload {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export const useHonors = () => {
  const { fetchList, request, postJson, putJson } = useApiClient();

  const fetchHonors = async (): Promise<Honor[]> => {
    try {
      return await fetchList<Honor>("/api/v1/student/honors");
    } catch (error) {
      console.error("Error fetching honors:", error);
      throw error;
    }
  };

  const fetchHonorById = async (id: number): Promise<Honor> => {
    try {
      return await request<Honor>(`/api/v1/student/honors/${id}`);
    } catch (error) {
      console.error("Error fetching honor:", error);
      throw error;
    }
  };

  const createHonor = async (payload: CreateHonorPayload): Promise<Honor> => {
    try {
      return await postJson<Honor>("/api/v1/student/honors", payload);
    } catch (error) {
      console.error("Error creating honor:", error);
      throw error;
    }
  };

  const updateHonor = async (
    id: number,
    payload: CreateHonorPayload
  ): Promise<Honor> => {
    try {
      return await putJson<Honor>(`/api/v1/student/honors/${id}`, payload);
    } catch (error) {
      console.error("Error updating honor:", error);
      throw error;
    }
  };

  return {
    fetchHonors,
    fetchHonorById,
    createHonor,
    updateHonor,
  };
};
