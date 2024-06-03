import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchPaginatedData<T>(
  url: string,
  limit: number = 10,
  page: number = 1
) {
  const urlObj = new URL(url)

  if (limit >= 10 ) {
    urlObj.searchParams.append("limit", limit.toString())
  }
  urlObj.searchParams.append("page", page.toString())
  // urlObj.searchParams.append("offset", "2")

  const response = await fetch(urlObj.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  return response.json()
};
