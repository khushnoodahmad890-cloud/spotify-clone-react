import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type SearchContextType = {
  history: string[];

  addSearch: (term: string) => void;

  clearHistory: () => void;
};

const SearchContext =
  createContext<SearchContextType | null>(
    null
  );

export function SearchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [history, setHistory] =
    useState<string[]>(() => {
      const saved =
        localStorage.getItem(
          "searchHistory"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  function addSearch(term: string) {
    if (!term.trim()) return;

    const updated = [
      term,
      ...history.filter(
        (item) =>
          item.toLowerCase() !==
          term.toLowerCase()
      ),
    ].slice(0, 10);

    setHistory(updated);

    localStorage.setItem(
      "searchHistory",
      JSON.stringify(updated)
    );
  }

  function clearHistory() {
    setHistory([]);

    localStorage.removeItem(
      "searchHistory"
    );
  }

  return (
    <SearchContext.Provider
      value={{
        history,
        addSearch,
        clearHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchHistory() {
  const context =
    useContext(SearchContext);

  if (!context) {
    throw new Error(
      "useSearchHistory must be used inside SearchProvider"
    );
  }

  return context;
}