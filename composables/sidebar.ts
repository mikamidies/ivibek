interface SidebarMentor {
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
}

interface ActiveSession {
  id: number;
  mentor: SidebarMentor;
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
}

interface SentEssay {
  id: number;
  title: string;
  mentor: {
    id: number;
    fullName: string;
    university: {
      id: number;
      name: string;
    };
  };
  status: string;
  createdAt: string;
}

interface SidebarResponse {
  activeSessionsCount: number;
  sentEssaysCount: number;
  activeSessions: ActiveSession[];
  sentEssays: SentEssay[];
}

export const useSidebar = () => {
  const { accessToken } = useAuth();
  const API_BASE = "https://api.ivybek.com";

  const fetchSidebarData = async (): Promise<SidebarResponse> => {
    try {
      const data = await $fetch<SidebarResponse>(
        `${API_BASE}/api/v1/student/sidebar`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Failed to fetch sidebar data:", error);
      throw error;
    }
  };

  return {
    fetchSidebarData,
  };
};
