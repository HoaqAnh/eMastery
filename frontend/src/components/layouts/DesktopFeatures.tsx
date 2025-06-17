import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  // WritingIcon,
  QuizIcon,
  ChatBotIcon,
  LibraryBooksIcon,
  MailIcon,
} from "@components/common/Icons";

const DesktopFeatures = (): JSX.Element => {
  const { t } = useTranslation();
  const navigator = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      path: "/dictionary",
      icon: LibraryBooksIcon,
      text: t("navMenu.dictionary"),
    },
    // {
    //   path: "/",
    //   icon: WritingIcon,
    //   text: t("navMenu.writingPractice"),
    // },
    {
      path: "/quiz",
      icon: QuizIcon,
      text: t("navMenu.puzzleSolving"),
    },
    {
      path: "/chatbot",
      icon: ChatBotIcon,
      text: t("navMenu.aiAssistant"),
    },
    {
      path: "/contact",
      icon: MailIcon,
      text: t("navMenu.contact.title"),
    },
  ];

  return (
    <div className="nav-menu__features">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={`nav-menu-item ${
            location.pathname === item.path ? "active" : ""
          }`}
          title={item.text}
          type="button"
          onClick={() => navigator(item.path)}
        >
          {item.icon}
          <span>{item.text}</span>
        </button>
      ))}
    </div>
  );
};

export default DesktopFeatures;
