interface Activity {
  id: number;
  name: string;
  description: string;
  schoolYear: number;
  orgName: string;
  hoursPerWeek: string;
  weekPerYear: string;
  categoryId?: number;
}

interface ActivityCategory {
  id: number;
  name: string;
  title?: string;
  categoryName?: string;
}

interface CreateActivityPayload {
  categoryId?: number;
  name: string;
  description: string;
  schoolYear: number;
  orgName: string;
  hoursPerWeek: string;
  weekPerYear: string;
}

export const useActivities = () => {
  const { fetchList, request, postJson, putJson } = useApiClient();

  const fetchActivityCategories = async (): Promise<ActivityCategory[]> => {
    try {
      return await fetchList<ActivityCategory>(
        "/api/v1/student/activities/categories",
        {
          params: {
            page: 0,
            pageSize: 100,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching activity categories:", error);
      throw error;
    }
  };

  const fetchActivities = async (categoryId: number): Promise<Activity[]> => {
    try {
      return await fetchList<Activity>("/api/v1/student/activities", {
        params: {
          categoryId,
          page: 0,
          pageSize: 100,
        },
      });
    } catch (error) {
      console.error("Error fetching activities:", error);
      throw error;
    }
  };

  const fetchActivityById = async (id: number): Promise<Activity> => {
    try {
      return await request<Activity>(`/api/v1/student/activities/${id}`);
    } catch (error) {
      console.error("Error fetching activity:", error);
      throw error;
    }
  };

  const createActivity = async (
    payload: CreateActivityPayload
  ): Promise<Activity> => {
    try {
      return await postJson<Activity>("/api/v1/student/activities", payload);
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
      return await putJson<Activity>(
        `/api/v1/student/activities/${id}`,
        payload
      );
    } catch (error) {
      console.error("Error updating activity:", error);
      throw error;
    }
  };

  return {
    fetchActivityCategories,
    fetchActivities,
    fetchActivityById,
    createActivity,
    updateActivity,
  };
};
