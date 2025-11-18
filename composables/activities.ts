interface Activity {
  id: number;
  name: string;
  description: string;
  schoolYear: number;
  orgName: string;
  hoursPerWeek: string;
  weekPerYear: string;
}

interface CreateActivityPayload {
  name: string;
  description: string;
  schoolYear: number;
  orgName: string;
  hoursPerWeek: string;
  weekPerYear: string;
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

export const useActivities = () => {
  const { accessToken } = useAuth();
  const API_BASE = "https://api.ivybek.com";

  const fetchActivities = async (): Promise<Activity[]> => {
    try {
      const data = await $fetch<PaginatedResponse<Activity>>(
        `${API_BASE}/api/v1/student/activities`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return data?.content || [];
    } catch (error) {
      console.error("Error fetching activities:", error);
      throw error;
    }
  };

  const fetchActivityById = async (id: number): Promise<Activity> => {
    try {
      const data = await $fetch<Activity>(
        `${API_BASE}/api/v1/student/activities/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching activity:", error);
      throw error;
    }
  };

  const createActivity = async (
    payload: CreateActivityPayload
  ): Promise<Activity> => {
    try {
      const data = await $fetch<Activity>(
        `${API_BASE}/api/v1/student/activities`,
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
      console.error("Error creating activity:", error);
      throw error;
    }
  };

  const updateActivity = async (
    id: number,
    payload: CreateActivityPayload
  ): Promise<Activity> => {
    try {
      const data = await $fetch<Activity>(
        `${API_BASE}/api/v1/student/activities/${id}`,
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
      console.error("Error updating activity:", error);
      throw error;
    }
  };

  return {
    fetchActivities,
    fetchActivityById,
    createActivity,
    updateActivity,
  };
};
