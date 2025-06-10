import { useState, type JSX } from "react";
import { useTranslation } from "react-i18next";
import { GoogleIcon } from "@/components/common/Icons";
import { useRegistration } from "@/context/RegistrationContext";

interface SubmitWithGoogleProps {
  onNext: () => void;
}

const SubWithGoogle = ({ onNext }: SubmitWithGoogleProps): JSX.Element => {
  const { t } = useTranslation();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const { updateRegistrationData } = useRegistration();
  const [fullName, setFullName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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

  const handleSkipGoogle = () => {
    const trimmedName = fullName.trim();

    if (trimmedName === "") {
      setError(t("subscribe.google.error.nameRequired"));
      return;
    }

    if (trimmedName.length < 3 || trimmedName.length > 30) {
      setError(t("subscribe.google.error.nameLengthError"));
      return;
    }

    setError(null);
    updateRegistrationData({ fullName: trimmedName });
    onNext();
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
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (error) setError(null);
            }}
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
        {error && <p className="form-error-message">{error}</p>}
        <button className="subscribe-btn" onClick={handleSkipGoogle}>
          {t("subscribe.next")}
        </button>
      </div>
    </div>
  );
};

export default SubWithGoogle;
