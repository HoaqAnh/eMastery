import { type JSX } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  LibraryBooksIcon,
  WritingIcon,
  QuizIcon,
  ChatBotIcon,
} from "@components/common/Icons";
import "@styles/pages/Welcome.css";

const Welcome = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const features = [
    {
      icon: LibraryBooksIcon,
      title: t("features.dictionary.title"),
      description: t("features.dictionary.description"),
    },
    {
      icon: WritingIcon,
      title: t("features.writing.title"),
      description: t("features.writing.description"),
    },
    {
      icon: QuizIcon,
      title: t("features.quiz.title"),
      description: t("features.quiz.description"),
    },
    {
      icon: ChatBotIcon,
      title: t("features.chatbot.title"),
      description: t("features.chatbot.description"),
    },
  ];

  return (
    <div className="welcome-page">
      <div className="welcome-page__hero">
        <h1 className="hero__title">{t("welcome.title")}</h1>
        <p className="hero__description">{t("welcome.description")}</p>
        <button
          className="hero__cta-button"
          onClick={() => navigate("/subscribe")}
        >
          {t("welcome.cta")}
        </button>
      </div>
      <div className="welcome-page__features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-card__icon">{feature.icon}</div>
            <div className="feature-card__content">
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Welcome;
