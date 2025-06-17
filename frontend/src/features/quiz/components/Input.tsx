import { useState, type JSX } from "react";
import { SendIcon, AddIcon, LightbulbIcon } from "@/components/common/Icons";
import { useTranslation } from "react-i18next";

interface InputProps {
  onNewQuiz: () => void;
  isLoading: boolean;
  onGuessSubmit: (guess: string) => void;
  isEvaluating: boolean;
  onShowAnswer: () => void;
}

const Input = ({
  onNewQuiz,
  isLoading,
  onGuessSubmit,
  isEvaluating,
  onShowAnswer,
}: InputProps): JSX.Element => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isEvaluating) return;
    onGuessSubmit(inputValue);
    setInputValue("");
  };

  return (
    <form className="quiz__input" onSubmit={handleSubmit}>
      <div className="quiz__input-container">
        <textarea
          rows={1}
          placeholder={t("quiz.title")}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
      </div>
      <div className="quiz__input-actions">
        <button
          title={t("quiz.startQuiz")}
          type="button"
          onClick={onNewQuiz}
          disabled={isLoading || isEvaluating}
        >
          {AddIcon}
        </button>
        <button
          title={t("quiz.showAnswer.buttonTitle")}
          type="button"
          onClick={onShowAnswer}
          disabled={isLoading || isEvaluating}
        >
          {LightbulbIcon}
        </button>
        <button
          title={t("quiz.submitAnswer")}
          type="submit"
          disabled={!inputValue.trim() || isEvaluating}
        >
          {SendIcon}
        </button>
      </div>
    </form>
  );
};

export default Input;