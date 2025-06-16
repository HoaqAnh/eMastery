import { useState, useCallback } from "react";
import {
  translateWordService,
  type TranslateRequest,
  type TranslateResponse,
} from "../services/dictionaryService";

interface UseDictionaryReturn {
  data: TranslateResponse | null;
  isLoading: boolean;
  error: Error | null;
  fetchTranslation: (request: TranslateRequest) => Promise<void>;
}

export const useDictionary = (): UseDictionaryReturn => {
  const [data, setData] = useState<TranslateResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTranslation = useCallback(async (request: TranslateRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await translateWordService(request);
      setData(result);
    } catch (err: any) {
      setError(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetchTranslation };
};