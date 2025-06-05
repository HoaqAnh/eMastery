import { useState, useCallback } from 'react';
import { checkApiKeyService, type ApiKeyValidationResult } from '../services/apiKeyService';

interface UseApiKeyCheckReturn {
  isLoading: boolean;
  error: string | null;
  validationResult: ApiKeyValidationResult | null;
  validateApiKey: (apiKey: string) => Promise<void>;
  resetApiKeyValidation: () => void; // Hàm mới để reset
}

export const useApiKeyCheck = (): UseApiKeyCheckReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<ApiKeyValidationResult | null>(null);

  const validateApiKey = useCallback(async (apiKey: string) => {
    if (!apiKey || apiKey.trim() === "") {
      const emptyKeyResult: ApiKeyValidationResult = { 
        isValid: false, 
        message: "API Key không được để trống." 
      };
      setValidationResult(emptyKeyResult);
      setError(emptyKeyResult.message);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setValidationResult(null);

    const result = await checkApiKeyService(apiKey);
    
    setValidationResult(result);
    if (!result.isValid) {
      setError(result.message);
    }
    
    setIsLoading(false);
  }, []);

  // Hàm mới để reset trạng thái lỗi và kết quả
  const resetApiKeyValidation = useCallback(() => {
    setError(null);
    setValidationResult(null);
    // Không cần reset isLoading ở đây vì nó chỉ liên quan đến quá trình validate
  }, []);

  return { isLoading, error, validationResult, validateApiKey, resetApiKeyValidation };
};