interface MajorCareer {
  id: number;
  title: string;
  description: string;
  type: "RESEARCH" | "EXPLORATION" | "NETWORKING";
  startDate: string;
  endDate: string;
}

interface CreateMajorCareerPayload {
  title: string;
  description: string;
  type: "RESEARCH" | "EXPLORATION" | "NETWORKING";
  startDate: string;
  endDate: string;
}

interface MajorCareerGroup {
  type: "RESEARCH" | "EXPLORATION" | "NETWORKING";
  items: MajorCareer[];
}

export const useMajorsCareers = () => {
  const { accessToken } = useAuth();
  const apiBase = useApiBaseUrl();

  const fetchMajorsCareers = async (): Promise<MajorCareer[]> => {
    try {
      if (!accessToken.value) {
        return [];
      }

      const data = await $fetch<any>(
        `${apiBase}/api/v1/student/majors-careers`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );

      const content = data?.content;

      if (Array.isArray(content)) {
        const flatData: MajorCareer[] = [];
        content.forEach((group: any) => {
          if (group.items && Array.isArray(group.items)) {
            flatData.push(...group.items);
          }
        });
        return flatData;
      }

      return [];
    } catch (error) {
      return [];
    }
  };

  const fetchMajorsCareersGrouped = async (): Promise<MajorCareerGroup[]> => {
    try {
      if (!accessToken.value) {
        return [];
      }

      const data = await $fetch<any>(
        `${apiBase}/api/v1/student/majors-careers`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );

      const content = data?.content;

      if (Array.isArray(content)) {
        return content;
      }

      return [];
    } catch (error) {
      return [];
    }
  };

  const fetchMajorCareerById = async (id: number): Promise<MajorCareer> => {
    try {
      const data = await $fetch<MajorCareer>(
        `${apiBase}/api/v1/student/majors-careers/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  const createMajorCareer = async (
    payload: CreateMajorCareerPayload
  ): Promise<MajorCareer> => {
    try {
      const data = await $fetch<MajorCareer>(
        `${apiBase}/api/v1/student/majors-careers`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
          },
          body: payload,
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateMajorCareer = async (
    id: number,
    payload: CreateMajorCareerPayload
  ): Promise<MajorCareer> => {
    try {
      const data = await $fetch<MajorCareer>(
        `${apiBase}/api/v1/student/majors-careers/${id}`,
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
      throw error;
    }
  };

  return {
    fetchMajorsCareers,
    fetchMajorsCareersGrouped,
    fetchMajorCareerById,
    createMajorCareer,
    updateMajorCareer,
  };
};
