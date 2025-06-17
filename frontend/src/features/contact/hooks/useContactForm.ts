import { useState, useCallback } from "react";
import {
  sendContactEmailService,
  type ContactFormPayload,
} from "../services/contactService";

interface UseContactFormReturn {
  isLoading: boolean;
  error: Error | null;
  isSuccess: boolean;
  submitFeedback: (payload: ContactFormPayload) => Promise<void>;
  resetState: () => void;
}

export const useContactForm = (): UseContactFormReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const submitFeedback = useCallback(async (payload: ContactFormPayload) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      await sendContactEmailService(payload);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetState = useCallback(() => {
    setIsSuccess(false);
    setError(null);
  }, []);

  return { isLoading, error, isSuccess, submitFeedback, resetState };
};