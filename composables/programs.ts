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

export const usePrograms = () => {
  const { fetchList, request, postJson, putJson } = useApiClient();

  const fetchPrograms = async (): Promise<Program[]> => {
    try {
      return await fetchList<Program>("/api/v1/student/programs");
    } catch (error: any) {
      console.error("Error fetching programs:", error);
      throw error;
    }
  };

  const fetchProgramById = async (id: number): Promise<Program> => {
    try {
      return await request<Program>(`/api/v1/student/programs/${id}`);
    } catch (error) {
      console.error("Error fetching program:", error);
      throw error;
    }
  };

  const createProgram = async (
    payload: CreateProgramPayload
  ): Promise<Program> => {
    try {
      return await postJson<Program>("/api/v1/student/programs", payload);
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
      return await putJson<Program>(`/api/v1/student/programs/${id}`, payload);
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
