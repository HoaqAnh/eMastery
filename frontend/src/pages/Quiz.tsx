import { type JSX, useEffect, useCallback } from "react";
import Input from "@/features/quiz/components/Input.tsx";
import DescQuiz from "@/features/quiz/components/DescQuiz.tsx";
import Progress from "@/features/quiz/components/Progress.tsx";
import Error from "@components/common/Error";
import { useGenerateReading } from "@/features/quiz/hooks/useGenerateReading.ts";
import { useRegistration } from "@/context/RegistrationContext.tsx";
import { useLocalStorage } from "@/hooks/useLocalStorage.ts";
import { type GenerateReadingResponse } from "@/features/quiz/services/quizService.ts";
import { useTranslation } from "react-i18next";

import "@styles/pages/Quiz.css";

const Quiz = (): JSX.Element => {
  const { t } = useTranslation();
  const { registrationData } = useRegistration();
  const { data: readingData, loading, error, generate } = useGenerateReading();
  const [storedQuiz, setStoredQuiz] =
    useLocalStorage<GenerateReadingResponse | null>("currentQuizReading", null);

  useEffect(() => {
    const fetchInitialReading = async () => {
      if (!storedQuiz) {
        console.log(
          "Không có bài đọc trong localStorage, đang tạo bài đọc mới..."
        );
        const { level: englishLevel, apiKey: geminiApiKey } = registrationData;

        if (!englishLevel || !geminiApiKey) {
          console.error(
            "Thiếu thông tin trình độ hoặc API key để tự động tạo bài đọc."
          );
          return;
        }

        try {
          await generate({ englishLevel, geminiApiKey });
        } catch (err) {
          console.error("Lỗi khi tự động tạo bài đọc ban đầu:", err);
        }
      }
    };

    fetchInitialReading();
  }, [storedQuiz, registrationData, generate]);

  const handleGenerateNewQuiz = useCallback(async () => {
    const { level: englishLevel, apiKey: geminiApiKey } = registrationData;

    if (!englishLevel || !geminiApiKey) {
      console.error("Thiếu thông tin trình độ hoặc API key.");
      return;
    }

    try {
      await generate({ englishLevel, geminiApiKey });
    } catch (err) {
      console.error("Lỗi khi tạo bài đọc:", err);
    }
  }, [registrationData, generate]);

  useEffect(() => {
    if (readingData) {
      setStoredQuiz(readingData);
    }
  }, [readingData, setStoredQuiz]);

  const displayDescription =
    readingData?.description ||
    storedQuiz?.description ||
    t("quiz.initialPrompt");

  if (error) {
    return <Error />;
  }

  return (
    <div className="quiz">
      <div className="quiz__header">
        <DescQuiz description={displayDescription} />
      </div>
      <div className="quiz__body">
        <div className="quiz__body-container">
          <div className="quiz__body-content">
            <Progress />
          </div>
        </div>
      </div>
      <div className="quiz__footer">
        <div className="quiz__footer-container">
          <Input onNewQuiz={handleGenerateNewQuiz} isLoading={loading} />
        </div>
        <div className="quiz__footer-infomation">
          <p>
            eMastery có thể mắc sai sót, vì vậy, hãy xác minh các câu trả lời
            của eMastery
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
