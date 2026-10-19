import { useAnecdotesActions } from "../store";
const AnecdoteForm = () => {
  const { add } = useAnecdotesActions();
  const addAnecdote = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    add(content);
    event.target.reset();
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" data-testid="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
