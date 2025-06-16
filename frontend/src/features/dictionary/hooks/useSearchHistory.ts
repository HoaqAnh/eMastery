import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCallback } from "react";

const HISTORY_KEY = "dictionarySearchHistory";

export const useSearchHistory = () => {
  const [history, setHistory] = useLocalStorage<string[]>(HISTORY_KEY, []);

  const addWordToHistory = useCallback(
    (word: string) => {
      const lowerCaseWord = word.toLowerCase().trim();
      if (!lowerCaseWord) return;

      setHistory((prevHistory) => {
        const filteredHistory = prevHistory.filter((w) => w !== lowerCaseWord);
        const newHistory = [lowerCaseWord, ...filteredHistory].slice(0, 20);
        return newHistory;
      });
    },
    [setHistory]
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  return { history, addWordToHistory, clearHistory };
};
