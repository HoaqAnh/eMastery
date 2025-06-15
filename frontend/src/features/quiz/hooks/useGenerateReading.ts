import { useState, useCallback } from "react";
import {
  generateReading,
  type GenerateReadingRequest,
  type GenerateReadingResponse,
} from "../services/quizService";

export const useGenerateReading = () => {
  const [data, setData] = useState<GenerateReadingResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const generate = useCallback(async (requestData: GenerateReadingRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateReading(requestData);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err);
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, generate };
};
