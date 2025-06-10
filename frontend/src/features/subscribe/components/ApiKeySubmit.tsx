import type { JSX } from "react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useApiKeyCheck } from "../hooks/useApiKeyCheck";
import toast, { Toaster } from "react-hot-toast";

interface ApiKeySubmitProps {
  onNext: () => void;
}

const ApiKeySubmit = ({ onNext }: ApiKeySubmitProps): JSX.Element => {
  const { t } = useTranslation();
  const [apiKeyValue, setApiKeyValue] = useState<string>("");

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

  const handleSubmitApiKey = async () => {
    await validateApiKey(apiKeyValue);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (validationResult) {
      if (validationResult.isValid) {
        onNext();
      } else {
        if (apiKeyValue !== "") {
          setApiKeyValue("");
        }
      }
    }
  }, [validationResult, onNext]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKeyValue(e.target.value);
    if (error || validationResult) {
      resetApiKeyValidation();
    }
  };

  let inputKeyContainerClasses = "card-form_input-key";
  if (validationResult && !validationResult.isValid && !isLoading) {
    inputKeyContainerClasses += " apikey-error__input";
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
          <button
            className={`subscribe-btn ${isLoading ? "loading" : ""}`}
            onClick={handleSubmitApiKey}
            disabled={isLoading}
          >
            {isLoading ? t("subscribe.loading") : t("subscribe.next")}
          </button>
        </div>
      </div>
    </>
  );
};

export default ApiKeySubmit;
