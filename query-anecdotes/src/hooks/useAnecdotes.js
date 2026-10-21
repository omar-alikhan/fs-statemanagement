import { useQuery } from "@tanstack/react-query";
import { getAnecdotes } from "../requests";

const useAnecdotes = () => {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
  };
};

export default useAnecdotes;
