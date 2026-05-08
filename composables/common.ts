interface ChoiceItem {
  id: number;
  name: string;
}

export const useCommon = () => {
  const { fetchList } = useApiClient();

  const fetchChoiceList = async (path: string, errorLabel: string) => {
    try {
      return await fetchList<ChoiceItem>(path, {}, false);
    } catch (error) {
      console.error(`Failed to fetch ${errorLabel}:`, error);
      return [];
    }
  };

  const fetchCountries = async (): Promise<ChoiceItem[]> => {
    return fetchChoiceList("/api/v1/common/country/choice-list?search=", "countries");
  };

  const fetchUniversities = async (): Promise<ChoiceItem[]> => {
    return fetchChoiceList(
      "/api/v1/common/university/choice-list?search=",
      "universities"
    );
  };

  const fetchFaculties = async (): Promise<ChoiceItem[]> => {
    return fetchChoiceList("/api/v1/common/faculty/choice-list?search=", "faculties");
  };

  return {
    fetchCountries,
    fetchUniversities,
    fetchFaculties,
  };
};
