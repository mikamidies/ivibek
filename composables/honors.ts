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

export const useHonors = () => {
  const { accessToken } = useAuth();
  const API_BASE = "https://api.ivybek.com";

  const fetchHonors = async (): Promise<Honor[]> => {
    try {
      const data = await $fetch<PaginatedResponse<Honor>>(
        `${API_BASE}/api/v1/student/honors`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return data?.content || [];
    } catch (error) {
      console.error("Error fetching honors:", error);
      throw error;
    }
  };

  const fetchHonorById = async (id: number): Promise<Honor> => {
    try {
      const data = await $fetch<Honor>(
        `${API_BASE}/api/v1/student/honors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching honor:", error);
      throw error;
    }
  };

  const createHonor = async (payload: CreateHonorPayload): Promise<Honor> => {
    try {
      const data = await $fetch<Honor>(`${API_BASE}/api/v1/student/honors`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          "Content-Type": "application/json",
        },
        body: payload,
      });
      return data;
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
      const data = await $fetch<Honor>(
        `${API_BASE}/api/v1/student/honors/${id}`,
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
