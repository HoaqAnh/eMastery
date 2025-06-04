import { type JSX } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import "@styles/components/NavMenu.css";
import { useTranslation } from "react-i18next";
import {
  WritingIcon,
  QuizIcon,
  ChatBotIcon,
  MailIcon,
  LibraryBooksIcon,
} from "@components/common/Icons";

const NavMenu = (): JSX.Element => {
  const { t } = useTranslation();

  const {
    ref: dropdownRef,
    isOpen: isDropdownOpen,
    // setIsOpen: setIsDropdownOpen,
    toggleDropdown,
  } = useClickOutside<HTMLDivElement>();

  return (
    <div className="nav-menu">
      {/* Mobile Menu */}
      <div className="nav-menu__mobile" ref={dropdownRef}>
        <button
          className="nav-menu-item"
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          title={t("navMenu.features")}
          type="button"
        >
          {/* {MenuIcon} */}
          <span>{t("navMenu.features")}</span>
        </button>

        {/* Dropdown Menu */}
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
                <button
                  className="nav-menu__dropdown-item"
                  title={t("navMenu.dictionary")}
                  type="button"
                >
                  {LibraryBooksIcon}
                  <span>{t("navMenu.dictionary")}</span>
                </button>
                <button
                  className="nav-menu__dropdown-item active"
                  title={t("navMenu.writingPractice")}
                  type="button"
                >
                  {WritingIcon}
                  <span>{t("navMenu.writingPractice")}</span>
                </button>
                <button
                  className="nav-menu__dropdown-item"
                  title={t("navMenu.puzzleSolving")}
                  type="button"
                >
                  {QuizIcon}
                  <span>{t("navMenu.puzzleSolving")}</span>
                </button>
                <button
                  className="nav-menu__dropdown-item"
                  title={t("navMenu.aiAssistant")}
                  type="button"
                >
                  {ChatBotIcon}
                  <span>{t("navMenu.aiAssistant")}</span>
                </button>
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
                  title={t("navMenu.aiAssistant")}
                  type="button"
                >
                  {MailIcon}
                  <span>{t("navMenu.contact.mail")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Features */}
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
        >
          {QuizIcon}
          <span>{t("navMenu.puzzleSolving")}</span>
        </button>
        <button
          className={`nav-menu-item`}
          title={t("navMenu.aiAssistant")}
          type="button"
        >
          {ChatBotIcon}
          <span>{t("navMenu.aiAssistant")}</span>
        </button>
      </div>

      {/* Desktop Settings */}
      <div className="nav-menu__settings">
        <button
          className={`nav-menu-item`}
          title={t("navMenu.aiAssistant")}
          type="button"
        >
          {MailIcon}
          <span>{t("navMenu.contact.title")}</span>
        </button>
      </div>
    </div>
  );
};

export default NavMenu;
