import type { JSX } from "react";
import { SendIcon } from "@/components/common/Icons";

const Input = (): JSX.Element => {
  const handleTextareaInput = (
    event: React.FormEvent<HTMLTextAreaElement>
  ): void => {
    const textarea = event.currentTarget;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="chatbot__input">
      <div className="chatbot__input-container">
        <textarea
          rows={1}
          placeholder="Hỏi eMastery..."
          onInput={handleTextareaInput}
        />
      </div>
      <div className="chatbot__input-actions">
        <button type="submit">{SendIcon}</button>
      </div>
    </div>
  );
};

export default Input;
