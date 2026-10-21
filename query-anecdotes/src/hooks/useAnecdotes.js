import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote, getAnecdotes } from "../requests";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const useAnecdotes = () => {
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: anecdote => newAnecdoteMutation.mutate(asObject(anecdote)),
  };
};

export default useAnecdotes;
