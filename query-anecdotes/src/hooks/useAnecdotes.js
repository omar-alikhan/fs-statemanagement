import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote, getAnecdotes, updateAnecdote } from "../requests";
import useNotification from "../hooks/useNotification";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const useAnecdotes = () => {
  const queryClient = useQueryClient();
  const { displayNotification } = useNotification();
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
      displayNotification(`anecdote '${newAnecdote.content}' created`);
    },
    onError: () => {
      displayNotification("too short anecdote, must have length 5 or more");
    },
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries(["anecdotes"]);
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: anecdote => newAnecdoteMutation.mutate(asObject(anecdote)),
    voteAnecdote: anecdote => {
      displayNotification(`anecdote '${anecdote.content}' voted`);
      updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    },
  };
};

export default useAnecdotes;
