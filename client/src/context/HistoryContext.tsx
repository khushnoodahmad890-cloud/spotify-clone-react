import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Song } from "../types/song";

type HistoryContextType = {
  history: Song[];
  addToHistory: (song: Song) => void;
  clearHistory: () => void;
};

const HistoryContext =
  createContext<HistoryContextType | null>(null);

export function HistoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [history, setHistory] =
    useState<Song[]>(() => {
      const saved =
        localStorage.getItem("history");

      return saved
        ? JSON.parse(saved)
        : [];
    });

  function addToHistory(song: Song) {
    setHistory((prev) => {
      const updated = [
        song,
        ...prev.filter(
          (item) => item.id !== song.id
        ),
      ].slice(0, 20);

      localStorage.setItem(
        "history",
        JSON.stringify(updated)
      );

      return updated;
    });
  }

  function clearHistory() {
    setHistory([]);

    localStorage.removeItem("history");
  }

  return (
    <HistoryContext.Provider
      value={{
        history,
        addToHistory,
        clearHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context =
    useContext(HistoryContext);

  if (!context) {
    throw new Error(
      "useHistory must be used inside HistoryProvider"
    );
  }

  return context;
}