export interface PaginatedResponse<T> {
  content: T[];
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  last?: boolean;
  size?: number;
  number?: number;
  numberOfElements?: number;
  empty?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

type RequestOptions = Record<string, any> & {
  headers?: Record<string, string>;
};

export const useApiClient = () => {
  const { accessToken } = useAuth();
  const apiBase = useApiBaseUrl();

  const buildUrl = (path: string) =>
    path.startsWith("http") ? path : `${apiBase}${path}`;

  const request = async <T>(
    path: string,
    options: RequestOptions = {},
    requiresAuth = true
  ): Promise<T> => {
    const headers = { ...(options.headers || {}) };

    if (requiresAuth) {
      if (!accessToken.value) {
        throw new Error("Not authorized");
      }

      headers.Authorization = `Bearer ${accessToken.value}`;
    }

    return await $fetch<T>(buildUrl(path), {
      ...options,
      headers,
    });
  };

  const fetchList = async <T>(
    path: string,
    options: RequestOptions = {},
    requiresAuth = true
  ): Promise<T[]> => {
    const response = await request<PaginatedResponse<T>>(
      path,
      options,
      requiresAuth
    );

    return response?.content ?? [];
  };

  const postJson = async <T>(path: string, body: unknown): Promise<T> =>
    request<T>(
      path,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      },
      true
    );

  const putJson = async <T>(path: string, body: unknown): Promise<T> =>
    request<T>(
      path,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      },
      true
    );

  const patch = async <T>(
    path: string,
    options: RequestOptions = {}
  ): Promise<T> =>
    request<T>(
      path,
      {
        method: "PATCH",
        ...options,
      },
      true
    );

  return {
    apiBase,
    request,
    fetchList,
    postJson,
    putJson,
    patch,
  };
};
