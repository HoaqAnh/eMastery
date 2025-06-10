import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  checkApiKeyService,
  type ApiKeyValidationResult,
} from "../services/apiKeyService";

interface UseApiKeyCheckReturn {
  isLoading: boolean;
  error: string | null;
  validationResult: ApiKeyValidationResult | null;
  validateApiKey: (apiKey: string) => Promise<void>;
  resetApiKeyValidation: () => void;
}

export const useApiKeyCheck = (): UseApiKeyCheckReturn => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationResult, setValidationResult] =
    useState<ApiKeyValidationResult | null>(null);

  const validateApiKey = useCallback(async (apiKey: string) => {
    if (!apiKey || apiKey.trim() === "") {
      setIsLoading(true);
      const emptyKeyResult: ApiKeyValidationResult = {
        isValid: false,
        message: t("subscribe.api.error.keyRequired"),
      };
      setValidationResult(emptyKeyResult);
      setError(emptyKeyResult.message);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }

    setIsLoading(true);
    setError(null);
    setValidationResult(null);

    const result = await checkApiKeyService(apiKey);

    setValidationResult(result);
    if (!result.isValid) {
      setError(t("subscribe.api.error.keyFormatError"));
    }

    setIsLoading(false);
  }, []);

  const resetApiKeyValidation = useCallback(() => {
    setError(null);
    setValidationResult(null);
  }, []);

  return {
    isLoading,
    error,
    validationResult,
    validateApiKey,
    resetApiKeyValidation,
  };
};
