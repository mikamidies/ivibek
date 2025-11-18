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

export const useInternships = () => {
  const { accessToken } = useAuth();
  const API_BASE = "https://api.ivybek.com";

  const fetchInternships = async (): Promise<Internship[]> => {
    try {
      const data = await $fetch<PaginatedResponse<Internship>>(
        `${API_BASE}/api/v1/student/internships`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return data?.content || [];
    } catch (error) {
      console.error("Error fetching internships:", error);
      throw error;
    }
  };

  const fetchInternshipById = async (id: number): Promise<Internship> => {
    try {
      const data = await $fetch<Internship>(
        `${API_BASE}/api/v1/student/internships/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching internship:", error);
      throw error;
    }
  };

  const createInternship = async (
    payload: CreateInternshipPayload
  ): Promise<Internship> => {
    try {
      const data = await $fetch<Internship>(
        `${API_BASE}/api/v1/student/internships`,
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
      console.error("Error creating internship:", error);
      throw error;
    }
  };

  const updateInternship = async (
    id: number,
    payload: CreateInternshipPayload
  ): Promise<Internship> => {
    try {
      const data = await $fetch<Internship>(
        `${API_BASE}/api/v1/student/internships/${id}`,
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
