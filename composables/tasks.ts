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

export const useTasks = () => {
  const { accessToken } = useAuth();
  const API_BASE = "https://api.ivybek.com";

  const fetchTasks = async (): Promise<Task[]> => {
    try {
      const data = await $fetch<PaginatedResponse<Task>>(
        `${API_BASE}/api/v1/student/tasks`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return data?.content || [];
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };

  const fetchTaskById = async (id: number): Promise<Task> => {
    try {
      const data = await $fetch<Task>(
        `${API_BASE}/api/v1/student/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching task:", error);
      throw error;
    }
  };

  const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
    try {
      const data = await $fetch<Task>(`${API_BASE}/api/v1/student/tasks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          "Content-Type": "application/json",
        },
        body: payload,
      });
      return data;
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
      const data = await $fetch<Task>(
        `${API_BASE}/api/v1/student/tasks/${id}`,
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
      console.error("Error updating task:", error);
      throw error;
    }
  };

  const toggleTask = async (id: number): Promise<Task> => {
    try {
      const data = await $fetch<Task>(
        `${API_BASE}/api/v1/student/tasks/${id}/toggle`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return data;
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
