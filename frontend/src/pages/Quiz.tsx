import { type JSX, useEffect, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import Input from "@/features/quiz/components/Input.tsx";
import DescQuiz from "@/features/quiz/components/DescQuiz.tsx";
import Progress from "@/features/quiz/components/Progress.tsx";
import Error from "@components/common/Error";
import ProgressSkeleton from "@/features/quiz/components/ProgressSkeleton.tsx";
import ConfirmationPopup from "@/components/common/ConfirmationPopup.tsx";
import { useGenerateReading } from "@/features/quiz/hooks/useGenerateReading.ts";
import { useEvaluateReading } from "@/features/quiz/hooks/useEvaluateReading.ts";
import { useRegistration } from "@/context/RegistrationContext.tsx";
import { useLocalStorage } from "@/hooks/useLocalStorage.ts";
import { type GenerateReadingResponse } from "@/features/quiz/services/quizService.ts";
import "@styles/pages/Quiz.css";

type Level = "ez" | "med" | "hard";

const Quiz = (): JSX.Element => {
  const { t } = useTranslation();
  const { registrationData } = useRegistration();
  const [level, setLevel] = useLocalStorage<Level>("quizDifficultyLevel", "ez");
  const { data: readingData, loading, error, generate } = useGenerateReading();

  const [storedQuiz, setStoredQuiz] =
    useLocalStorage<GenerateReadingResponse | null>("currentQuizReading", null);
  const [readingHistory, setReadingHistory] = useLocalStorage<string[]>(
    "quizReadingHistory",
    []
  );

  const {
    loading: isEvaluating,
    error: evaluationError,
    evaluateGuess,
  } = useEvaluateReading();
  const [history, setHistory] = useLocalStorage<any[]>("quizHistory", []);

  const [isConfirmShowAnswerOpen, setIsConfirmShowAnswerOpen] = useState(false);

  useEffect(() => {
    const fetchInitialReading = async () => {
      if (!storedQuiz) {
        const { level: englishLevel, apiKey: geminiApiKey } = registrationData;
        if (englishLevel && geminiApiKey) {
          try {
            await generate({
              englishLevel,
              geminiApiKey,
              usedDescriptions: readingHistory,
            });
          } catch (err) {
            console.error(err);
          }
        }
      }
    };
    fetchInitialReading();
  }, [registrationData, generate]);

  const handleGenerateNewQuiz = useCallback(async () => {
    const { level: englishLevel, apiKey: geminiApiKey } = registrationData;
    if (englishLevel && geminiApiKey) {
      try {
        setHistory([]);
        await generate({
          englishLevel,
          geminiApiKey,
          usedDescriptions: readingHistory,
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [registrationData, generate, setHistory, readingHistory]);

  const handleGuessSubmit = useCallback(
    async (guess: string) => {
      if (!storedQuiz?.phrase || !registrationData.apiKey) {
        console.error("Thiếu thông tin để đánh giá câu trả lời.");
        return;
      }

      try {
        const result = await evaluateGuess({
          userGuess: guess,
          correctPhrase: storedQuiz.phrase,
          geminiApiKey: registrationData.apiKey,
        });

        if (result) {
          const newHistoryEntry = {
            userAnswer: guess,
            accuracy: result.accuracy,
            explanation: result.explanation,
          };
          setHistory((prev) => [...prev, newHistoryEntry]);
        }
      } catch (err) {
        console.error("Lỗi trong quá trình gửi câu trả lời:", err);
      }
    },
    [storedQuiz, registrationData, evaluateGuess, setHistory]
  );

  const handleShowAnswerClick = () => {
    if (storedQuiz) {
      setIsConfirmShowAnswerOpen(true);
    }
  };

  const handleConfirmShowAnswer = () => {
    if (storedQuiz) {
      toast.success(
        `${t("quiz.showAnswer.correctAnswerIs")}: "${storedQuiz.phrase}"`,
        {
          duration: 5000,
          icon: "💡",
        }
      );
    }
    setIsConfirmShowAnswerOpen(false);
  };

  useEffect(() => {
    if (readingData) {
      setStoredQuiz(readingData);
      setReadingHistory((prev) => {
        const newHistory = [...prev, readingData.description];
        return newHistory.slice(-20);
      });
    }
  }, [readingData, setStoredQuiz, setReadingHistory]);

  const displayDescription =
    readingData?.description ||
    storedQuiz?.description ||
    t("quiz.initialPrompt");

  const displayTranslation =
    readingData?.translation || storedQuiz?.translation || "";

  if (error || evaluationError) {
    return <Error />;
  }

  return (
    <div className="quiz">
      <ConfirmationPopup
        isOpen={isConfirmShowAnswerOpen}
        onClose={() => setIsConfirmShowAnswerOpen(false)}
        onConfirm={handleConfirmShowAnswer}
        title={t("quiz.showAnswer.confirmTitle")}
        message={t("quiz.showAnswer.confirmMessage")}
      />
      <div className="quiz__header">
        <DescQuiz
          description={displayDescription}
          translation={displayTranslation}
          level={level}
          isLoading={loading}
          onLevelChange={setLevel}
        />
      </div>
      <div className="quiz__body">
        <div className="quiz__body-container">
          <div className="quiz__body-content">
            {isEvaluating && <ProgressSkeleton />}
            {history
              .map((item, index) => (
                <Progress
                  key={index}
                  number={index + 1}
                  userAnswer={item.userAnswer}
                  accuracy={item.accuracy}
                  explanation={item.explanation}
                  level={level}
                />
              ))
              .reverse()}
          </div>
        </div>
      </div>
      <div className="quiz__footer">
        <div className="quiz__footer-container">
          <Input
            onNewQuiz={handleGenerateNewQuiz}
            isLoading={loading}
            onGuessSubmit={handleGuessSubmit}
            isEvaluating={isEvaluating}
            onShowAnswer={handleShowAnswerClick}
          />
        </div>
        <div className="quiz__footer-infomation">
          <p>{t("chatbot.info")}</p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;