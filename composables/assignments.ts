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

  return {
    fetchAssignments,
    fetchAssignmentById,
  };
};
