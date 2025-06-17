import { type JSX } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "@/context/RegistrationContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  LibraryBooksIcon,
  WritingIcon,
  QuizIcon,
  ChatBotIcon,
  StarIcon,
  LightbulbIcon,
  CodeBlockIcon,
} from "@components/common/Icons";
import "@styles/pages/Home.css";

const Home = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { registrationData } = useRegistration();

  const [dictionaryHistory] = useLocalStorage<string[]>(
    "dictionarySearchHistory",
    []
  );
  const [quizHistory] = useLocalStorage<any[]>("quizHistory", []);

  const features = [
    {
      path: "/dictionary",
      icon: LibraryBooksIcon,
      title: t("navMenu.dictionary"),
      description: t("home.features.dictionaryDesc"),
    },
    {
      path: "/quiz",
      icon: QuizIcon,
      title: t("navMenu.puzzleSolving"),
      description: t("home.features.quizDesc"),
    },
    {
      path: "/chatbot",
      icon: ChatBotIcon,
      title: t("navMenu.aiAssistant"),
      description: t("home.features.chatbotDesc"),
    },
    {
      path: "/welcome",
      icon: WritingIcon,
      title: t("home.comingSoon"),
      description: t("home.features.writingDesc"),
    },
    {
      path: "/",
      icon: CodeBlockIcon,
      title: t("home.developing"),
      description: t("home.features.developing"),
    },
  ];

  const stats = [
    {
      icon: StarIcon,
      label: t("home.stats.wordsSearched"),
      value: dictionaryHistory.length,
    },
    {
      icon: QuizIcon,
      label: t("home.stats.quizzesTaken"),
      value: quizHistory.length,
    },
  ];

  return (
    <div className="user-home">
      <div className="user-home__header">
        <h1>{t("greeting.helloUser", { name: registrationData.fullName })}</h1>
        <p>{t("home.welcome")}</p>
      </div>

      <div className="user-home__content-wrapper">
        <main className="user-home__main">
          {features.map((feature) => (
            <button
              key={feature.path}
              className="home-feature-card"
              onClick={() => navigate(feature.path)}
            >
              <div className="home-feature-card__icon">{feature.icon}</div>
              <div className="home-feature-card__content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </button>
          ))}
        </main>

        <aside className="user-home__sidebar">
          <div className="sidebar-widget">
            <h3 className="sidebar-widget__title">{t("home.stats.title")}</h3>
            <div className="sidebar-widget__content">
              {stats.map((stat, index) => (
                <div className="stat-item" key={index}>
                  <div className="stat-item__icon">{stat.icon}</div>
                  <div className="stat-item__text">
                    <span className="stat-item__label">{stat.label}</span>
                    <span className="stat-item__value">{stat.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-widget">
            <h3 className="sidebar-widget__title">{t("home.tip.title")}</h3>
            <div className="sidebar-widget__content">
              <div className="tip-item">
                <div className="tip-item__icon">{LightbulbIcon}</div>
                <p className="tip-item__text">{t("home.tip.content")}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
