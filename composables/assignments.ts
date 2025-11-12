export const useAssignments = () => {
  const { accessToken } = useAuth();

  const fetchAssignments = async () => {
    try {
      const data = await $fetch(
        "https://api.ivybek.com/api/v1/student/assignments",
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching assignments:", error);
      throw error;
    }
  };

  const fetchAssignmentById = async (id) => {
    try {
      const data = await $fetch(
        `https://api.ivybek.com/api/v1/student/assignments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching assignment:", error);
      throw error;
    }
  };

  const submitAssignmentSolution = async (id, submissionUrl) => {
    try {
      const data = await $fetch(
        `https://api.ivybek.com/api/v1/student/assignments/${id}/submitSolution`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
          },
          body: {
            submissionUrl,
          },
        }
      );
      return data;
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
