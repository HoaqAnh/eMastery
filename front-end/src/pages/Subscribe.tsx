import { type JSX } from "react";
import { useTranslation } from "react-i18next";
import "@styles/pages/Subscribe.css";

const Subscribe = (): JSX.Element => {
  const { t } = useTranslation();
  const handleGetKeyClickOpenInNewTab = () => {
    const targetUrl = "https://aistudio.google.com/app/apikey";
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="subscribe">
      <div className="card">
        <span className="card__title">{t("subscribe.title")}</span>
        <p className="card__content">{t("subscribe.content")}</p>
        <div className="card__form">
          <div className="card-form_input-key">
            <input placeholder={t("subscribe.placeholder")} type="password" />
            <button
              className="getKey-btn"
              onClick={handleGetKeyClickOpenInNewTab}
            >
              {t("subscribe.getKey")}
            </button>
          </div>
          <button className="subscribe-btn">{t("subscribe.title")}</button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
