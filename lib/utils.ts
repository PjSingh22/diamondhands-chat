import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchUsers = async (page:number, searchQuery:string) => {
  const response = await fetch(`https://665621609f970b3b36c4625e.mockapi.io/users?page=${page}&limit=10&search=${searchQuery}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return Array.isArray(data) ? data : []
};
