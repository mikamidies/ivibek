interface Internship {
  id: number;
  name: string;
  description: string;
  orgName: string;
  position: string;
  programProvider: string;
  startDate: string;
  endDate: string;
}

interface CreateInternshipPayload {
  name: string;
  description: string;
  orgName: string;
  position: string;
  programProvider: string;
  startDate: string;
  endDate: string;
}

export const useInternships = () => {
  const { fetchList, request, postJson, putJson } = useApiClient();

  const fetchInternships = async (): Promise<Internship[]> => {
    try {
      return await fetchList<Internship>("/api/v1/student/internships");
    } catch (error) {
      console.error("Error fetching internships:", error);
      throw error;
    }
  };

  const fetchInternshipById = async (id: number): Promise<Internship> => {
    try {
      return await request<Internship>(`/api/v1/student/internships/${id}`);
    } catch (error) {
      console.error("Error fetching internship:", error);
      throw error;
    }
  };

  const createInternship = async (
    payload: CreateInternshipPayload
  ): Promise<Internship> => {
    try {
      return await postJson<Internship>("/api/v1/student/internships", payload);
    } catch (error) {
      console.error("Error creating internship:", error);
      throw error;
    }
  };

  const updateInternship = async (
    id: number,
    payload: CreateInternshipPayload
  ): Promise<Internship> => {
    try {
      return await putJson<Internship>(
        `/api/v1/student/internships/${id}`,
        payload
      );
    } catch (error) {
      console.error("Error updating internship:", error);
      throw error;
    }
  };

  return {
    fetchInternships,
    fetchInternshipById,
    createInternship,
    updateInternship,
  };
};
