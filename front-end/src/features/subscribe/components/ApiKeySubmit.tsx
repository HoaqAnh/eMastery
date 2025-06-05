import type { JSX } from "react";
import { useTranslation } from "react-i18next";

interface ApiKeySubmitProps {
  onNext: () => void;
}

const ApiKeySubmit = ({ onNext }: ApiKeySubmitProps): JSX.Element => {
  const { t } = useTranslation();

  const handleGetKeyClickOpenInNewTab = () => {
    const targetUrl = "https://aistudio.google.com/app/apikey";
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="card">
      <div>
        <span className="card__title">{t("subscribe.title")}</span>
        <p className="card__content">{t("subscribe.api.content")}</p>
      </div>
      <div className="card__form">
        <div className="card-form_input-key">
          <input placeholder={t("subscribe.api.placeholder")} type="password" />
          <button
            className="getKey-btn"
            onClick={handleGetKeyClickOpenInNewTab}
          >
            {t("subscribe.api.getKey")}
          </button>
        </div>
        <button className="subscribe-btn" onClick={onNext}>
          {t("subscribe.next")}
        </button>
      </div>
    </div>
  );
};

export default ApiKeySubmit;
