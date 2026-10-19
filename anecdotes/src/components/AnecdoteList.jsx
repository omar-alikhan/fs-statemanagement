import {
  useAnecdotes,
  useAnecdotesActions,
  useNotificationsActions,
} from "../store";

const AnecdoteList = () => {
  const { showNotification } = useNotificationsActions();
  const anecdotes = useAnecdotes();
  const { vote, remove } = useAnecdotesActions();
  const handleVote = anecdote => {
    vote(anecdote);
    showNotification(`You voted '${anecdote.content}'`);
  };

  const handleDelete = anecdote => {
    remove(anecdote.id);
    showNotification(`You delete '${anecdote.content}'`);
  };

  return (
    <>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && (
              <button onClick={() => handleDelete(anecdote)}>delete</button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
