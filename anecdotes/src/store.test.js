import { beforeEach, describe, expect, it, vi } from "vitest";
import useAnecdoteStore from "./store";
import anecdoteService from "./services/anecdotes";

vi.mock("./services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    remove: vi.fn(),
    vote: vi.fn(),
  },
}));

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [] });
  vi.clearAllMocks();
});

describe("anecdote store", () => {
  it("initialize loads notes from service", async () => {
    const mockAnecdotes = [
      {
        id: 1,
        content: "First anecdote",
        votes: 0,
      },
      {
        id: 2,
        content: "Second anecdote",
        votes: 0,
      },
    ];

    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);
    await useAnecdoteStore.getState().actions.initialize();
    expect(useAnecdoteStore.getState().anecdotes.length).toBe(2);
  });
});
