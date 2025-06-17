import type { JSX } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useClickOutside from "@/hooks/useClickOutside";
import { useTranslation } from "react-i18next";
import {
  // WritingIcon,
  QuizIcon,
  ChatBotIcon,
  MailIcon,
  LibraryBooksIcon,
  MenuIcon,
} from "@components/common/Icons";

const MobileMenu = (): JSX.Element => {
  const { t } = useTranslation();
  const navigator = useNavigate();
  const location = useLocation();

  const {
    ref: dropdownRef,
    isOpen: isDropdownOpen,
    toggleDropdown,
  } = useClickOutside<HTMLDivElement>();

  const featureItems = [
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
  ];

  const handleNavigate = (path: string) => {
    navigator(path);
    toggleDropdown();
  };

  return (
    <div className="nav-menu__mobile" ref={dropdownRef}>
      <button
        className="nav-menu-item"
        onClick={toggleDropdown}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        title={t("navMenu.features")}
        type="button"
      >
        {MenuIcon}
        <span>{t("navMenu.features")}</span>
      </button>

      <div
        className={`nav-menu__dropdown ${
          isDropdownOpen ? "nav-menu__dropdown--open" : ""
        }`}
      >
        <div className="nav-menu__dropdown-content">
          {/* Features Section */}
          <div className="nav-menu__dropdown-section">
            <h3 className="nav-menu__dropdown-title">
              {t("navMenu.features", "Features")}
            </h3>
            <div className="nav-menu__dropdown-group">
              {featureItems.map((item) => (
                <button
                  key={item.path}
                  className={`nav-menu__dropdown-item ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                  title={item.text}
                  type="button"
                  onClick={() => handleNavigate(item.path)}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="nav-menu__dropdown-section">
            <h3 className="nav-menu__dropdown-title">
              {t("navMenu.contact.title")}
            </h3>
            <div className="nav-menu__dropdown-group">
              <button
                className="nav-menu__dropdown-item"
                title={t("navMenu.contact.mail")}
                type="button"
                onClick={() => handleNavigate("/contact")}
              >
                {MailIcon}
                <span>{t("navMenu.contact.mail")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
