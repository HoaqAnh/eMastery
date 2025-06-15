import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  WritingIcon,
  QuizIcon,
  ChatBotIcon,
  LibraryBooksIcon,
  MailIcon
} from "@components/common/Icons";

const DesktopFeatures = (): JSX.Element => {
  const { t } = useTranslation();
  const navigator = useNavigate();
  return (
    <div className="nav-menu__features">
      <button
        className={`nav-menu-item`}
        title={t("navMenu.dictionary")}
        type="button"
      >
        {LibraryBooksIcon}
        <span>{t("navMenu.dictionary")}</span>
      </button>
      <button
        className={`nav-menu-item active`}
        title={t("navMenu.writingPractice")}
        type="button"
      >
        {WritingIcon}
        <span>{t("navMenu.writingPractice")}</span>
      </button>
      <button
        className={`nav-menu-item`}
        title={t("navMenu.puzzleSolving")}
        type="button"
        onClick={() => navigator("/quiz")}
      >
        {QuizIcon}
        <span>{t("navMenu.puzzleSolving")}</span>
      </button>
      <button
        className={`nav-menu-item`}
        title={t("navMenu.aiAssistant")}
        type="button"
        onClick={() => navigator("/chatbot")}
      >
        {ChatBotIcon}
        <span>{t("navMenu.aiAssistant")}</span>
      </button>
      <button
        className={`nav-menu-item`}
        title={t("navMenu.aiAssistant")}
        type="button"
      >
        {MailIcon}
        <span>{t("navMenu.contact.title")}</span>
      </button>
    </div>
  );
};

export default DesktopFeatures;
