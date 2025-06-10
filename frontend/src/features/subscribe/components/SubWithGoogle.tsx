import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import { GoogleIcon } from "@/components/common/Icons";
interface SubmitWithGoogleProps {
  onNext: () => void;
}

const SubWithGoogle = ({ onNext }: SubmitWithGoogleProps): JSX.Element => {
  const { t } = useTranslation();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleGoogleRedirectLogin = () => {
    if (!googleClientId) {
      console.error("Lỗi: Google Client ID chưa được cấu hình trong file .env");
      alert(t("subscribe.google.configError"));
      return;
    }

    const redirectUri = `${window.location.origin}${window.location.pathname}`;

    const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    const params = new URLSearchParams({
      client_id: googleClientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "profile",
    });

    window.location.href = `${oauth2Endpoint}?${params.toString()}`;
  };

  return (
    <div className="card">
      <div className="card__header">
        <span className="card__title">{t("subscribe.title")}</span>
        <p className="card__content">{t("subscribe.google.content")}</p>
      </div>
      <div className="card__form">
        <div className="card-form_input-key">
          <input
            id="fullname"
            placeholder={t("subscribe.google.placeholder")}
            type="text"
          />
          <button
            className="google-btn"
            title={t("subscribe.google.buttonTitle")}
            aria-label={t("subscribe.google.buttonTitle")}
            onClick={handleGoogleRedirectLogin}
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
