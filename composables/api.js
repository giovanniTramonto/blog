export const useApi = () => {
  const { apiBase } = useRuntimeConfig().public;
  return {
    apiFetch: (url) => useFetch(`${apiBase}/${url}`),
    apiPost: (url, data) =>
      $fetch(`${apiBase}/${url}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    apiPut: (url, data) =>
      $fetch(`${apiBase}/${url}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    apiDelete: (url) =>
      $fetch(`${apiBase}/${url}`, {
        method: "DELETE",
      }),
  };
};
