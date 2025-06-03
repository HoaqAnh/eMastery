import { type JSX, useState, useRef, useEffect } from "react";
import { useTheme } from "@context/ThemeContext";
import { useTranslation } from "react-i18next";
import "@styles/components/NavActions.css";

type ThemeSetting = "light" | "dark" | "system";

const NavActions = (): JSX.Element => {
  const { themeSetting, setThemeSetting } = useTheme();
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // setIsDropdownOpen(true);
  };

  const handleThemeChange = (theme: ThemeSetting) => {
    setThemeSetting(theme);
    // setIsDropdownOpen(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="nav-actions">
      {/* User Settings*/}
      <div className="nav-actions__user-settings" ref={dropdownRef}>
        <button
          className="nav-actions__user-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          title="User Settings"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M240.92-268.31q51-37.84 111.12-59.77Q412.15-350 480-350t127.96 21.92q60.12 21.93 111.12 59.77 37.3-41 59.11-94.92Q800-417.15 800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 62.85 21.81 116.77 21.81 53.92 59.11 94.92ZM480.01-450q-54.78 0-92.39-37.6Q350-525.21 350-579.99t37.6-92.39Q425.21-710 479.99-710t92.39 37.6Q610-634.79 610-580.01t-37.6 92.39Q534.79-450 480.01-450ZM480-100q-79.15 0-148.5-29.77t-120.65-81.08q-51.31-51.3-81.08-120.65Q100-400.85 100-480t29.77-148.5q29.77-69.35 81.08-120.65 51.3-51.31 120.65-81.08Q400.85-860 480-860t148.5 29.77q69.35 29.77 120.65 81.08 51.31 51.3 81.08 120.65Q860-559.15 860-480t-29.77 148.5q-29.77 69.35-81.08 120.65-51.3 51.31-120.65 81.08Q559.15-100 480-100Zm0-60q54.15 0 104.42-17.42 50.27-17.43 89.27-48.73-39-30.16-88.11-47Q536.46-290 480-290t-105.77 16.65q-49.31 16.66-87.92 47.2 39 31.3 89.27 48.73Q425.85-160 480-160Zm0-350q29.85 0 49.92-20.08Q550-550.15 550-580t-20.08-49.92Q509.85-650 480-650t-49.92 20.08Q410-609.85 410-580t20.08 49.92Q450.15-510 480-510Zm0-70Zm0 355Z" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <div className={`nav-actions__dropdown ${isDropdownOpen ? 'nav-actions__dropdown--open' : ''}`}>
          <div className="nav-actions__dropdown-content">
            {/* Theme Settings Section */}
            <div className="nav-actions__dropdown-section">
              <h3 className="nav-actions__dropdown-title">{t("settings.themeSettings.title", "Theme")}</h3>
              <div className="nav-actions__dropdown-theme-group">
                <button
                  className={`nav-actions__dropdown-item nav-actions__dropdown-theme-item${
                    themeSetting === "light" ? " active" : ""
                  }`}
                  onClick={() => handleThemeChange("light")}
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="currentColor"
                  >
                    <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 60q-74.92 0-127.46-52.54Q300-405.08 300-480q0-74.92 52.54-127.46Q405.08-660 480-660q74.92 0 127.46 52.54Q660-554.92 660-480q0 74.92-52.54 127.46Q554.92-300 480-300ZM200-450H50v-60h150v60Zm710 0H760v-60h150v60ZM450-760v-150h60v150h-60Zm0 710v-150h60v150h-60ZM262.92-656.92l-93.69-90.46 42.39-44.39 90.23 92.69-38.93 42.16Zm485.46 488.69-90.84-93.31 39.54-41.54 93.69 90.46-42.39 44.39Zm-91.46-528.85 90.46-93.69 44.39 42.39-92.69 90.23-42.16-38.93ZM168.23-211.62l93.31-90.84 40.77 39.54-90.08 94.07-44-42.77ZM480-480Z" />
                  </svg>
                  <span>{t("settings.themeSettings.light", "Light")}</span>
                </button>
                <button
                  className={`nav-actions__dropdown-item nav-actions__dropdown-theme-item${
                    themeSetting === "system" ? " active" : ""
                  }`}
                  onClick={() => handleThemeChange("system")}
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="currentColor"
                  >
                    <path d="M340-140v-60h80v-80H172.31Q142-280 121-301q-21-21-21-51.31v-395.38Q100-778 121-799q21-21 51.31-21h615.38Q818-820 839-799q21 21 21 51.31v395.38Q860-322 839-301q-21 21-51.31 21H540v80h80v60H340ZM172.31-340h615.38q4.62 0 8.46-3.84 3.85-3.85 3.85-8.47v-395.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H172.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v395.38q0 4.62 3.85 8.47 3.84 3.84 8.46 3.84ZM160-340v-420 420Z" />
                  </svg>
                  <span>{t("settings.themeSettings.system", "System")}</span>
                </button>
                <button
                  className={`nav-actions__dropdown-item nav-actions__dropdown-theme-item${
                    themeSetting === "dark" ? " active" : ""
                  }`}
                  onClick={() => handleThemeChange("dark")}
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="currentColor"
                  >
                    <path d="M481.15-140q-141.66 0-240.83-99.17-99.16-99.16-99.16-240.83 0-135.77 92.11-232.88 92.11-97.12 225.57-105.2 8.62 0 16.93.62 8.3.62 16.3 1.85-30.61 28.61-48.76 69.15-18.16 40.54-18.16 86.46 0 98.33 68.84 167.17Q562.82-424 661.15-424q46.54 0 86.77-18.15 40.23-18.16 68.46-48.77 1.23 8 1.85 16.31.61 8.3.61 16.92-7.69 133.46-104.8 225.57Q616.92-140 481.15-140Zm0-60q88 0 158-48.5t102-126.5q-20 5-40 8t-40 3q-123 0-209.5-86.5T365.15-660q0-20 3-40t8-40q-78 32-126.5 102t-48.5 158q0 116 82 198t198 82Zm-10-270Z" />
                  </svg>
                  <span>{t("settings.themeSettings.dark", "Dark")}</span>
                </button>
              </div>
            </div>

            {/* Language Settings Section */}
            <div className="nav-actions__dropdown-section">
              <h3 className="nav-actions__dropdown-title">{t("settings.languageSettings.title", "Language")}</h3>
              <div className="nav-actions__dropdown-language-group">
                <button
                  className={`nav-actions__dropdown-item nav-actions__dropdown-language-item${
                    i18n.language === "en" ? " active" : ""
                  }`}
                  onClick={() => changeLanguage("en")}
                  disabled={i18n.language === "en"}
                  type="button"
                >
                  <span>{t("settings.languageSettings.en", "Language")}</span>
                </button>
                <button
                  className={`nav-actions__dropdown-item nav-actions__dropdown-language-item${
                    i18n.language === "vi" ? " active" : ""
                  }`}
                  onClick={() => changeLanguage("vi")}
                  disabled={i18n.language === "vi"}
                  type="button"
                >
                  <span>{t("settings.languageSettings.vi", "Language")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Switcher */}
      <div role="radiogroup" className="nav-actions__theme-switcher">
        {/* Light theme */}
        <button
          className={`nav-actions__button nav-actions__theme-button${
            themeSetting === "light" ? " active" : ""
          }`}
          aria-pressed={themeSetting === "light"}
          onClick={() => setThemeSetting("light")}
          title={t("settings.themeSettings.light")}
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 60q-74.92 0-127.46-52.54Q300-405.08 300-480q0-74.92 52.54-127.46Q405.08-660 480-660q74.92 0 127.46 52.54Q660-554.92 660-480q0 74.92-52.54 127.46Q554.92-300 480-300ZM200-450H50v-60h150v60Zm710 0H760v-60h150v60ZM450-760v-150h60v150h-60Zm0 710v-150h60v150h-60ZM262.92-656.92l-93.69-90.46 42.39-44.39 90.23 92.69-38.93 42.16Zm485.46 488.69-90.84-93.31 39.54-41.54 93.69 90.46-42.39 44.39Zm-91.46-528.85 90.46-93.69 44.39 42.39-92.69 90.23-42.16-38.93ZM168.23-211.62l93.31-90.84 40.77 39.54-90.08 94.07-44-42.77ZM480-480Z" />
          </svg>
        </button>

        {/* System theme */}
        <button
          className={`nav-actions__button nav-actions__theme-button${
            themeSetting === "system" ? " active" : ""
          }`}
          aria-pressed={themeSetting === "system"}
          onClick={() => setThemeSetting("system")}
          title={t("settings.themeSettings.system")}
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M340-140v-60h80v-80H172.31Q142-280 121-301q-21-21-21-51.31v-395.38Q100-778 121-799q21-21 51.31-21h615.38Q818-820 839-799q21 21 21 51.31v395.38Q860-322 839-301q-21 21-51.31 21H540v80h80v60H340ZM172.31-340h615.38q4.62 0 8.46-3.84 3.85-3.85 3.85-8.47v-395.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H172.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v395.38q0 4.62 3.85 8.47 3.84 3.84 8.46 3.84ZM160-340v-420 420Z" />
          </svg>
        </button>

        {/* Dark theme */}
        <button
          className={`nav-actions__button nav-actions__theme-button${
            themeSetting === "dark" ? " active" : ""
          }`}
          aria-pressed={themeSetting === "dark"}
          onClick={() => setThemeSetting("dark")}
          title={t("settings.themeSettings.dark")}
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M481.15-140q-141.66 0-240.83-99.17-99.16-99.16-99.16-240.83 0-135.77 92.11-232.88 92.11-97.12 225.57-105.2 8.62 0 16.93.62 8.3.62 16.3 1.85-30.61 28.61-48.76 69.15-18.16 40.54-18.16 86.46 0 98.33 68.84 167.17Q562.82-424 661.15-424q46.54 0 86.77-18.15 40.23-18.16 68.46-48.77 1.23 8 1.85 16.31.61 8.3.61 16.92-7.69 133.46-104.8 225.57Q616.92-140 481.15-140Zm0-60q88 0 158-48.5t102-126.5q-20 5-40 8t-40 3q-123 0-209.5-86.5T365.15-660q0-20 3-40t8-40q-78 32-126.5 102t-48.5 158q0 116 82 198t198 82Zm-10-270Z" />
          </svg>
        </button>
      </div>

      {/* Language Switcher */}
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
    </div>
  );
};

export default NavActions;