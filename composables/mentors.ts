interface ChoiceItem {
  id: number;
  name: string;
}

interface PaginatedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export const useMentors = () => {
  const API_BASE = "https://api.ivybek.com";

  const fetchMentors = async (
    universityId?: number | null,
    facultyId?: number | null,
    search?: string
  ): Promise<ChoiceItem[]> => {
    try {
      const token = useCookie("access_token");

      let url = `${API_BASE}/api/v1/student/mentors?`;

      const params = [];
      if (universityId) params.push(`universityId=${universityId}`);
      if (facultyId) params.push(`facultyId=${facultyId}`);
      if (search) params.push(`search=${search}`);

      url += params.join("&");

      const data = await $fetch<PaginatedResponse<ChoiceItem>>(url, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      const mentors = data?.content || [];

      return mentors;
    } catch (error) {
      console.error("Failed to fetch mentors:", error);
      return [];
    }
  };

  const fetchMentorById = async (id: number) => {
    try {
      const token = useCookie("access_token");

      const data = await $fetch(`${API_BASE}/api/v1/student/mentors/${id}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      return data;
    } catch (error) {
      console.error("Failed to fetch mentor:", error);
      return null;
    }
  };

  const fetchMentorTimeslots = async (
    mentorId: number,
    dateFrom: string,
    dateTo: string
  ) => {
    try {
      const token = useCookie("access_token");

      const data = await $fetch(
        `${API_BASE}/api/v1/student/mentors/${mentorId}/timeslots?dateFrom=${dateFrom}&dateTo=${dateTo}`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );

      return data;
    } catch (error) {
      console.error("Failed to fetch mentor timeslots:", error);
      return [];
    }
  };

  return {
    fetchMentors,
    fetchMentorById,
    fetchMentorTimeslots,
  };
};
