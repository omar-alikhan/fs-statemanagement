import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import anecdoteService from "./services/anecdotes";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const useAnecdoteStore = create(set => ({
  anecdotes: [],
  filter: "",
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);
      set(() => ({ anecdotes: sortedAnecdotes }));
    },
    vote: async anecdote => {
      const updatedAnecdote = await anecdoteService.vote(anecdote);
      set(state => ({
        anecdotes: state.anecdotes
          .map(a => (a.id === updatedAnecdote.id ? updatedAnecdote : a))
          .toSorted((a, b) => b.votes - a.votes),
      }));
    },
    add: async content => {
      const createdAnecdote = await anecdoteService.create(asObject(content));
      set(state => ({
        anecdotes: state.anecdotes.concat(createdAnecdote),
      }));
    },
    remove: async id => {
      const removedAnecdote = await anecdoteService.remove(id);
      set(state => ({
        anecdotes: state.anecdotes.filter(a => a.id !== removedAnecdote.id),
      }));
    },
    setFilter: value => set(() => ({ filter: value })),
  },
}));

let timer;

const useNotificationStore = create((set, get) => ({
  notification: null,
  actions: {
    showNotification: message => {
      clearTimeout(timer);
      set(() => ({ notification: message }));
      timer = setTimeout(() => get().actions.clearNotification(), 5000);
    },
    clearNotification: () => set({ notification: null }),
  },
}));

export const useNotifications = () =>
  useNotificationStore(state => state.notification);

export const useNotificationsActions = () =>
  useNotificationStore(state => state.actions);

export const useAnecdotes = () =>
  useAnecdoteStore(
    useShallow(({ anecdotes, filter }) => {
      if (filter === "" || filter === null) return anecdotes;
      return anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase()),
      );
    }),
  );
export const useAnecdotesActions = () =>
  useAnecdoteStore(state => state.actions);

export default useAnecdoteStore;
