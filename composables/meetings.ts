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

interface MeetingDetail {
  id: number;
  mentor: {
    id: number;
    fullName: string;
    email: string;
    image: string;
    university: {
      id: number;
      name: string;
    };
    faculty: {
      id: number;
      name: string;
    };
  };
  status: string;
  date: string;
  timeFrom: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  timeTo: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  meetingLink: {
    id: number;
    link: string;
  };
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

interface UpcomingMeeting {
  id: number;
  meetingWith: {
    id: number;
    fullName: string;
    email: string;
    image: string;
  };
  timeFrom: string;
  timeTo: string;
  description: string;
}

interface UpcomingMeetingsGroup {
  date: string;
  meetings: UpcomingMeeting[];
}

interface UpcomingMeetingsResponse {
  meetings: UpcomingMeetingsGroup[];
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

  const fetchMeetingById = async (id: number): Promise<MeetingDetail> => {
    try {
      const data = await $fetch<MeetingDetail>(
        `${API_BASE}/api/v1/student/meetings/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Failed to fetch meeting by id:", error);
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

  const fetchUpcomingMeetings = async (): Promise<UpcomingMeetingsResponse> => {
    try {
      const data = await $fetch<UpcomingMeetingsResponse>(
        `${API_BASE}/api/v1/student/meetings/upcoming`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Failed to fetch upcoming meetings:", error);
      throw error;
    }
  };

  return {
    fetchMeetings,
    fetchMeetingById,
    createMeeting,
    fetchUpcomingMeetings,
  };
};
