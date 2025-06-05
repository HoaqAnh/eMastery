import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import { GoogleIcon } from "@/components/common/Icons";

interface SubmitWithGoogleProps {
  onNext: () => void;
}

const SubWithGoogle = ({ onNext }: SubmitWithGoogleProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="card">
      <div>
        <span className="card__title">{t("subscribe.title")}</span>
        <p className="card__content">{t("subscribe.google.content")}</p>
      </div>
      <div className="card__form">
        <div className="card-form_input-key">
          <input placeholder={t("subscribe.google.placeholder")} type="text" />
          <button
            className="google-btn"
            title={t("subscribe.google.buttonTitle")}
            // onClick={handleGetKeyClickOpenInNewTab}
          >
            {GoogleIcon}
          </button>
        </div>
        <button className="subscribe-btn" onClick={onNext}>
          {t("subscribe.next")}
        </button>
      </div>
    </div>
  );
};

export default SubWithGoogle;
