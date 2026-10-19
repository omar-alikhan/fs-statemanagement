import {
  useAnecdotes,
  useAnecdotesActions,
  useNotificationsActions,
} from "../store";

const AnecdoteList = () => {
  const { showNotification } = useNotificationsActions();
  const anecdotes = useAnecdotes();
  const { vote } = useAnecdotesActions();
  return (
    <>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                vote(anecdote);
                showNotification(`You voted '${anecdote.content}'`);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
