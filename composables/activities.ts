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

export const useActivities = () => {
  const { fetchList, request, postJson, putJson } = useApiClient();

  const fetchActivities = async (): Promise<Activity[]> => {
    try {
      return await fetchList<Activity>("/api/v1/student/activities");
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
    fetchActivities,
    fetchActivityById,
    createActivity,
    updateActivity,
  };
};
