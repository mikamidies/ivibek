interface CreateMeetingPayload {
  mentorId: number;
  date: string;
  timeFrom: string;
  timeTo: string;
  description: string;
}

interface Meeting {
  id: number;
  mentor: {
    id: number;
    fullName: string | null;
    email: string | null;
    image: string | null;
    university: string | null;
    faculty: string | null;
  };
  status: string;
  date: string;
  timeFrom: string;
  timeTo: string;
}

interface PaginatedMeetingsResponse {
  content: Meeting[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export const useMeetings = () => {
  const { accessToken } = useAuth();
  const API_BASE = "https://api.ivybek.com";

  const fetchMeetings = async (
    page = 0,
    size = 10
  ): Promise<PaginatedMeetingsResponse> => {
    try {
      const data = await $fetch<PaginatedMeetingsResponse>(
        `${API_BASE}/api/v1/student/meetings`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
          params: {
            page,
            size,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Failed to fetch meetings:", error);
      throw error;
    }
  };

  const createMeeting = async (payload: CreateMeetingPayload) => {
    try {
      const data = await $fetch(`${API_BASE}/api/v1/student/meetings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          "Content-Type": "application/json",
        },
        body: payload,
      });
      return data;
    } catch (error) {
      console.error("Failed to create meeting:", error);
      throw error;
    }
  };

  return {
    fetchMeetings,
    createMeeting,
  };
};
