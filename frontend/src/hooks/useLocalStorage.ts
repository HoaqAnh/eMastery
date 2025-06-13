import { useState, useEffect, useCallback } from "react";

const LOCAL_STORAGE_CHANGE_EVENT = "onLocalStorageChange";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const readValue = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Lỗi khi đọc localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        setStoredValue((currentStoredValue) => {
          const valueToStore =
            value instanceof Function ? value(currentStoredValue) : value;
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          window.dispatchEvent(new Event(LOCAL_STORAGE_CHANGE_EVENT));
          return valueToStore;
        });
      } catch (error) {
        console.warn(`Lỗi khi ghi localStorage key “${key}”:`, error);
      }
    },
    [key]
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(LOCAL_STORAGE_CHANGE_EVENT, handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        LOCAL_STORAGE_CHANGE_EVENT,
        handleStorageChange
      );
    };
  }, [readValue]);

  return [storedValue, setValue] as const;
}