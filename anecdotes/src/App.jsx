import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { useAnecdotesActions } from "./store";

const App = () => {
  const { initialize } = useAnecdotesActions();
  useEffect(() => {
    initialize();
  }, [initialize]);
  return (
    <div>
      <Notification></Notification>
      <Filter></Filter>
      <h2>Anecdotes</h2>
      <AnecdoteList></AnecdoteList>
      <AnecdoteForm></AnecdoteForm>
    </div>
  );
};

export default App;
