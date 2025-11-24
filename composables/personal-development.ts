interface PersonalDevelopment {
  id: number;
  name: string;
  description: string;
  type:
    | "READING"
    | "WRITING"
    | "EXPERIENCE"
    | "RELATIONSHIP"
    | "ACADEMIC_SKILLS"
    | "ACADEMIC_ENRICH";
  startDate: string;
  endDate: string;
}

interface CreatePersonalDevelopmentPayload {
  name: string;
  description: string;
  type:
    | "READING"
    | "WRITING"
    | "EXPERIENCE"
    | "RELATIONSHIP"
    | "ACADEMIC_SKILLS"
    | "ACADEMIC_ENRICH";
  startDate: string;
  endDate: string;
}

interface PersonalDevelopmentGroup {
  type:
    | "READING"
    | "WRITING"
    | "EXPERIENCE"
    | "RELATIONSHIP"
    | "ACADEMIC_SKILLS"
    | "ACADEMIC_ENRICH";
  items: PersonalDevelopment[];
}

export const usePersonalDevelopment = () => {
  const { accessToken } = useAuth();
  const API_BASE = "https://api.ivybek.com";

  const fetchPersonalDevelopments = async (): Promise<
    PersonalDevelopment[]
  > => {
    try {
      if (!accessToken.value) {
        return [];
      }

      const data = await $fetch<any>(
        `${API_BASE}/api/v1/student/personalDevelopments`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );

      const content = data?.content;

      if (Array.isArray(content)) {
        const flatData: PersonalDevelopment[] = [];
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

  const fetchPersonalDevelopmentsGrouped = async (): Promise<
    PersonalDevelopmentGroup[]
  > => {
    try {
      if (!accessToken.value) {
        return [];
      }

      const data = await $fetch<any>(
        `${API_BASE}/api/v1/student/personalDevelopments`,
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

  const fetchPersonalDevelopmentById = async (
    id: number
  ): Promise<PersonalDevelopment> => {
    try {
      const data = await $fetch<PersonalDevelopment>(
        `${API_BASE}/api/v1/student/personalDevelopments/${id}`,
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

  const createPersonalDevelopment = async (
    payload: CreatePersonalDevelopmentPayload
  ): Promise<PersonalDevelopment> => {
    try {
      const data = await $fetch<PersonalDevelopment>(
        `${API_BASE}/api/v1/student/personalDevelopments`,
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

  const updatePersonalDevelopment = async (
    id: number,
    payload: CreatePersonalDevelopmentPayload
  ): Promise<PersonalDevelopment> => {
    try {
      const data = await $fetch<PersonalDevelopment>(
        `${API_BASE}/api/v1/student/personalDevelopments/${id}`,
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
    fetchPersonalDevelopments,
    fetchPersonalDevelopmentsGrouped,
    fetchPersonalDevelopmentById,
    createPersonalDevelopment,
    updatePersonalDevelopment,
  };
};
