import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import useAnecdoteStore, { useAnecdotes, useAnecdotesActions } from "./store";
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
  it("initialize loads anecdotes from service", async () => {
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

  it("anecdotes are sorted by votes", async () => {
    const mockAnecdotes = [
      {
        id: 1,
        content: "First anecdote",
        votes: 2,
      },
      {
        id: 2,
        content: "Second anecdote",
        votes: 3,
      },
      {
        id: 3,
        content: "Third anecdote",
        votes: 1,
      },
    ];

    useAnecdoteStore.setState({ anecdotes: mockAnecdotes });

    const { result } = renderHook(() => useAnecdotes());
    expect(result.current.map(a => a.id)).toEqual([2, 1, 3]);
  });

  it("voting increases the number of votes for an anecdote", async () => {
    const mockAnecdotes = [
      {
        id: 1,
        content: "First anecdote",
        votes: 2,
      },
    ];

    anecdoteService.vote.mockResolvedValue({
      ...mockAnecdotes[0],
      votes: mockAnecdotes[0].votes + 1,
    });
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes });

    const { result } = renderHook(() => useAnecdotesActions());
    await act(async () => {
      await result.current.vote(mockAnecdotes[0]);
    });

    expect(useAnecdoteStore.getState().anecdotes[0].votes).toEqual(3);
  });
});
