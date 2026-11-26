import { useSearchParams, type NavigateOptions } from "react-router-dom";

export const useGetQuery = (queryParam: string) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get(queryParam);
  return query;
};

export const useSetQuery = <T extends NavigateOptions>(
  queryName: string,
  value: T,
) => {
  const [, setSearchParams] = useSearchParams();
  setSearchParams(queryName, value);
};
