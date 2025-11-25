import { Container } from "../types/container";

const BASE_URL =
  "https://692450503ad095fb8473a7f1.mockapi.io/api/v1/containers";

export type FetchContainersParams = {
  search?: string;
  status?: string | null;
};

export async function fetchContainersApi(
  params?: FetchContainersParams
): Promise<Container[]> {
  const { search, status } = params ?? {};

  const url = new URL(BASE_URL);

  if (search) {
    url.searchParams.append("search", search);
  }

  if (status) {
    url.searchParams.append("status", status);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Не удалось загрузить контейнеры");
  }

  const data = (await response.json()) as Container[];
  return data;
}

export async function deleteContainersApi(ids: string[]): Promise<void> {
  await Promise.all(
    ids.map(async (id) => {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Не удалось удалить контейнер");
      }
    })
  );
}


