import type { JSX } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = (): JSX.Element => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="nav-actions__language-switcher">
      <button
        className={`nav-actions__button nav-actions__language-button${
          i18n.language === "en" ? " active" : ""
        }`}
        onClick={() => changeLanguage("en")}
        disabled={i18n.language === "en"}
        title="Switch to English"
        type="button"
      >
        {t("settings.languageSettings.en", "Language")}
      </button>
      <button
        className={`nav-actions__button nav-actions__language-button${
          i18n.language === "vi" ? " active" : ""
        }`}
        onClick={() => changeLanguage("vi")}
        disabled={i18n.language === "vi"}
        title="Chuyển sang Tiếng Việt"
        type="button"
      >
        {t("settings.languageSettings.vi", "Language")}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
