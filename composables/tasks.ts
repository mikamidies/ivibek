interface Task {
  id: number;
  task: string;
  description: string;
  startDate: string;
  endDate: string;
  isDone: boolean;
}

interface CreateTaskPayload {
  task: string;
  description: string;
  startDate: string;
  endDate: string;
}

export const useTasks = () => {
  const { fetchList, request, postJson, putJson, patch } = useApiClient();

  const fetchTasks = async (): Promise<Task[]> => {
    try {
      return await fetchList<Task>("/api/v1/student/tasks");
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };

  const fetchTaskById = async (id: number): Promise<Task> => {
    try {
      return await request<Task>(`/api/v1/student/tasks/${id}`);
    } catch (error) {
      console.error("Error fetching task:", error);
      throw error;
    }
  };

  const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
    try {
      return await postJson<Task>("/api/v1/student/tasks", payload);
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };

  const updateTask = async (
    id: number,
    payload: CreateTaskPayload
  ): Promise<Task> => {
    try {
      return await putJson<Task>(`/api/v1/student/tasks/${id}`, payload);
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };

  const toggleTask = async (id: number): Promise<Task> => {
    try {
      return await patch<Task>(`/api/v1/student/tasks/${id}/toggle`);
    } catch (error) {
      console.error("Error toggling task:", error);
      throw error;
    }
  };

  return {
    fetchTasks,
    fetchTaskById,
    createTask,
    updateTask,
    toggleTask,
  };
};
