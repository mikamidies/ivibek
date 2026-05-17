interface Honor {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  categoryId?: number;
}

interface HonorCategory {
  id: number;
  name: string;
  title?: string;
  categoryName?: string;
}

interface CreateHonorPayload {
  categoryId?: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export const useHonors = () => {
  const { fetchList, request, postJson, putJson } = useApiClient();

  const fetchHonorCategories = async (): Promise<HonorCategory[]> => {
    try {
      return await fetchList<HonorCategory>("/api/v1/student/honors/categories", {
        params: {
          page: 0,
          pageSize: 100,
        },
      });
    } catch (error) {
      console.error("Error fetching honor categories:", error);
      throw error;
    }
  };

  const fetchHonors = async (categoryId: number): Promise<Honor[]> => {
    try {
      return await fetchList<Honor>("/api/v1/student/honors", {
        params: {
          categoryId,
          page: 0,
          pageSize: 100,
        },
      });
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
    fetchHonorCategories,
    fetchHonors,
    fetchHonorById,
    createHonor,
    updateHonor,
  };
};
