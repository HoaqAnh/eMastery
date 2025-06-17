import type { JSX } from "react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useApiKeyCheck } from "../hooks/useApiKeyCheck";
import { useRegistration } from "@/context/RegistrationContext";

interface ApiKeySubmitProps {
  onNext: () => void;
}

const ApiKeySubmit = ({ onNext }: ApiKeySubmitProps): JSX.Element => {
  const { t } = useTranslation();
  const [apiKeyValue, setApiKeyValue] = useState<string>("");
  const { updateRegistrationData } = useRegistration();

  const {
    isLoading,
    error,
    validationResult,
    validateApiKey,
    resetApiKeyValidation,
  } = useApiKeyCheck();

  const handleGetKeyClickOpenInNewTab = () => {
    const targetUrl = "https://aistudio.google.com/app/apikey";
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  const handleVideoTutorial = () => {
    const targetUrl = "https://www.youtube.com/watch?v=6BRyynZkvf0";
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  const handleSubmitApiKey = async () => {
    await validateApiKey(apiKeyValue);
  };

  useEffect(() => {
    if (validationResult) {
      if (validationResult.isValid) {
        updateRegistrationData({ apiKey: apiKeyValue });
        onNext();
      } else {
        if (apiKeyValue !== "") {
          setApiKeyValue("");
        }
      }
    }
  }, [validationResult, onNext, apiKeyValue, updateRegistrationData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKeyValue(e.target.value);
    if (error || validationResult) {
      resetApiKeyValidation();
    }
  };

  let inputKeyContainerClasses = "card-form_input-key";
  if (error && !isLoading) {
    inputKeyContainerClasses += " apikey-error__input";
  }

  return (
    <div className="card">
      <div className="card__header">
        <span className="card__title">{t("subscribe.title")}</span>
        <p className="card__content">{t("subscribe.api.content")}</p>
      </div>
      <div className="card__form">
        <div className={inputKeyContainerClasses}>
          <input
            id="apiKey"
            placeholder={
              isLoading
                ? t("subscribe.api.loading")
                : t("subscribe.api.placeholder")
            }
            type="password"
            value={apiKeyValue}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button
            className="getKey-btn"
            onClick={handleGetKeyClickOpenInNewTab}
            disabled={isLoading}
          >
            {t("subscribe.api.getKey")}
          </button>
        </div>

        {error && !isLoading && <p className="form-error-message">{error}</p>}

        <button
          className={`subscribe-btn ${isLoading ? "loading" : ""}`}
          onClick={handleSubmitApiKey}
          disabled={isLoading}
        >
          {isLoading ? t("subscribe.loading") : t("subscribe.next")}
        </button>
      </div>
      <p className="card__info-title" onClick={handleVideoTutorial}>
        {t("subscribe.tutorial")}
      </p>
    </div>
  );
};

export default ApiKeySubmit;
