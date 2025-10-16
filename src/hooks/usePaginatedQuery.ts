import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  status: string;
  page: number;
  totalPages: number;
}

export function usePaginatedQuery<T>(
  key: string,
  queryFn: (
    page: number,
    limit: number,
    status: string,
    searchTerm: string,
  ) => Promise<PaginatedResponse<T>>,
  limit = 6,
  status: string = "all",
  searchTerm: string = "",
) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [key, page, limit, status, searchTerm],
    queryFn: () => queryFn(page, limit, status, searchTerm),
  });

  return {
    page,
    setPage,
    isLoading,
    isError,
    error,
    refetch,
    data: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
  };
}
