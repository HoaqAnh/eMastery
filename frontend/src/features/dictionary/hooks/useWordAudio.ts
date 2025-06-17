import { useState, useCallback } from "react";
import { getWordAudioService } from "../services/audioService";

interface UseWordAudioReturn {
  audioUrl: string | null;
  isLoading: boolean;
  error: Error | null;
  fetchAudio: (word: string) => Promise<void>;
}

export const useWordAudio = (): UseWordAudioReturn => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAudio = useCallback(async (word: string) => {
    if (!word || !word.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const url = await getWordAudioService(word);
      setAudioUrl(url);
    } catch (err: any) {
      setError(err);
      setAudioUrl(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { audioUrl, isLoading, error, fetchAudio };
};