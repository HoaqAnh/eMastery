import type { JSX } from "react";
import { SendIcon, AddIcon } from "@/components/common/Icons";
import { useTranslation } from "react-i18next";

const Input = (): JSX.Element => {
    const { t } = useTranslation();


    const handleSubmit = () => {
        console.log("Submit function is not implemented yet.");
    };

    const handleNewQuiz = () => {
        console.log("New quiz function is not implemented yet.");
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
                            handleSubmit();
                        }
                    }}
                />
            </div>
            <div className="quiz__input-actions">
                <button
                    title={t("quiz.startQuiz")}
                    type="button"
                    onClick={handleNewQuiz}
                >
                    {AddIcon}
                </button>
                <button
                    title={t("quiz.submitAnswer")}
                    type="submit"
                >
                    {SendIcon}
                </button>
            </div>
        </form>
    );
};

export default Input;
