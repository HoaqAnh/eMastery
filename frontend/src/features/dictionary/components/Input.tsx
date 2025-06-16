import type { JSX, FormEvent } from "react";
import { useState } from "react";
import { SendIcon, CachedIcon } from "@/components/common/Icons";
import { useTranslation } from "react-i18next";

interface InputProps {
  onSearch: (word: string) => void;
  isLoading: boolean;
  onHistoryClick: () => void;
}

const Input = ({
  onSearch,
  isLoading,
  onHistoryClick,
}: InputProps): JSX.Element => {
  const [inputValue, setInputValue] = useState("");
  const { t } = useTranslation();

  const handleTextareaInput = (event: FormEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setInputValue(textarea.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    onSearch(inputValue);
    setInputValue("");
  };

  return (
    <form className="chatbot__input" onSubmit={handleSubmit}>
      <div className="chatbot__input-container">
        <textarea
          rows={1}
          placeholder={t("dictionary.placeholder")}
          value={inputValue}
          onInput={handleTextareaInput}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          disabled={isLoading}
        />
      </div>
      <div className="chatbot__input-actions">
        <button
          title={t("dictionary.btnPlaceholder")}
          type="button"
          onClick={onHistoryClick}
          disabled={isLoading}
        >
          {CachedIcon}
        </button>
        <button
          title={t("dictionary.btnSend")}
          type="submit"
          disabled={!inputValue.trim() || isLoading}
        >
          {SendIcon}
        </button>
      </div>
    </form>
  );
};

export default Input;
