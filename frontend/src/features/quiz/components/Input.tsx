import type { JSX } from "react";
import { SendIcon, AddIcon } from "@/components/common/Icons";
import { useTranslation } from "react-i18next";

interface InputProps {
  onNewQuiz: () => void;
  isLoading: boolean;
}

const Input = ({ onNewQuiz, isLoading }: InputProps): JSX.Element => {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit function is not implemented yet.");
  };

  return (
    <form className="quiz__input" onSubmit={handleSubmit}>
      <div className="quiz__input-container">
        <textarea
          rows={1}
          placeholder={t("quiz.title")}
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
          disabled={isLoading}
        >
          {AddIcon}
        </button>
        <button title={t("quiz.submitAnswer")} type="submit">
          {SendIcon}
        </button>
      </div>
    </form>
  );
};

export default Input;
