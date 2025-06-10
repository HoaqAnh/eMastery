import type { JSX, FormEvent } from "react";
import { useState } from "react";
import { SendIcon, AddIcon } from "@/components/common/Icons";
import { useTranslation } from "react-i18next";

interface InputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onNewChat: () => void;
}

const Input = ({
  onSendMessage,
  isLoading,
  onNewChat,
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

    onSendMessage(inputValue);
    setInputValue("");
    const textarea = (event.currentTarget as HTMLFormElement).querySelector(
      "textarea"
    );
    if (textarea) {
      textarea.style.height = "auto";
    }
  };

  const handleNewChat = () => {
    onNewChat();
    setInputValue("");
  };

  return (
    <form className="chatbot__input" onSubmit={handleSubmit}>
      <div className="chatbot__input-container">
        <textarea
          rows={1}
          placeholder={t("chatbot.placeholder")}
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
          title={t("chatbot.new")}
          type="button"
          onClick={handleNewChat}
          disabled={isLoading}
        >
          {AddIcon}
        </button>
        <button
          title={t("chatbot.send")}
          type="submit"
          disabled={isLoading || !inputValue.trim()}
        >
          {SendIcon}
        </button>
      </div>
    </form>
  );
};

export default Input;
