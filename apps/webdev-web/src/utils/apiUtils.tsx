// wrapper for fetch calls to handle common tasks like setting headers, error handling, etc.
export const fetchApi = async (
  input: string | URL | Request,
  init?: RequestInit | undefined
): Promise<Response> => {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const full_url = `${base_url}/api${input}`;

  return fetch(full_url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    ...init,
  });
};

export const fetchApiParsed = async (
  input: string | URL | Request,
  init?: RequestInit | undefined
): Promise<unknown> => {
  const response = await fetchApi(input, init);

  if (!response.ok) {
    throw new Error(`Error fetching: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
