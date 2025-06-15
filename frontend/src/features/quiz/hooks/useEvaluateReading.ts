import { useState, useCallback } from "react";
import {
  evaluateReading,
  type EvaluateReadingRequest,
  type EvaluateReadingResponse,
} from "../services/quizService";

interface UseEvaluateReadingReturn {
  data: EvaluateReadingResponse | null;
  loading: boolean;
  error: Error | null;
  evaluateGuess: (
    requestData: EvaluateReadingRequest
  ) => Promise<EvaluateReadingResponse | undefined>;
}

export const useEvaluateReading = (): UseEvaluateReadingReturn => {
  const [data, setData] = useState<EvaluateReadingResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const evaluateGuess = useCallback(
    async (requestData: EvaluateReadingRequest) => {
      setLoading(true);
      setError(null);
      try {
        const result = await evaluateReading(requestData);
        setData(result);
        return result;
      } catch (err: any) {
        setError(err);
        setData(null);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, evaluateGuess };
};
