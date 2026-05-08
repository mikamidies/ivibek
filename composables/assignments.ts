interface Assignment {
  id: number;
  title: string;
  status: string;
  mentor: {
    fullName: string;
    image: string | null;
    university: {
      name: string;
    };
    faculty: {
      name: string;
    };
  };
  submission?: {
    submissionUrl: string | null;
  };
  grade?: {
    grade: number | null;
  };
  startDate?: string;
  endDate?: string;
  description?: string;
}

interface AssignmentListResponse {
  content?: Assignment[];
}

export const useAssignments = () => {
  const { request } = useApiClient();

  const fetchAssignments = async (): Promise<Assignment[]> => {
    try {
      const response = await request<Assignment[] | AssignmentListResponse | null>(
        "/api/v1/student/assignments"
      );

      if (Array.isArray(response)) {
        return response;
      }

      return response?.content ?? [];
    } catch (error) {
      console.error("Error fetching assignments:", error);
      throw error;
    }
  };

  const fetchAssignmentById = async (
    id: number | string
  ): Promise<Assignment> => {
    try {
      return await request<Assignment>(`/api/v1/student/assignments/${id}`);
    } catch (error) {
      console.error("Error fetching assignment:", error);
      throw error;
    }
  };

  const submitAssignmentSolution = async (
    id: number | string,
    submissionUrl: string
  ): Promise<Assignment> => {
    try {
      return await request<Assignment>(
        `/api/v1/student/assignments/${id}/submitSolution`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            submissionUrl,
          },
        }
      );
    } catch (error) {
      console.error("Error submitting assignment solution:", error);
      throw error;
    }
  };

  return {
    fetchAssignments,
    fetchAssignmentById,
    submitAssignmentSolution,
  };
};
