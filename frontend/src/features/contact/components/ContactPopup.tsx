import { type JSX, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useContactForm } from "../hooks/useContactForm";
import { useRegistration } from "@/context/RegistrationContext";
import { CloseIcon } from "@/components/common/Icons";
import "@styles/components/ProfilePopup.css";

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  message?: string;
}

const ContactPopup = ({
  isOpen,
  onClose,
}: ContactPopupProps): JSX.Element | null => {
  const { t } = useTranslation();
  const { registrationData } = useRegistration();
  const { isLoading, isSuccess, error, submitFeedback, resetState } =
    useContactForm();

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleClose = useCallback(() => {
    onClose();
    resetState();
  }, [onClose, resetState]);

  useEffect(() => {
    if (isOpen) {
      setName(registrationData.fullName || "");
      setMessage("");
      setErrors({});
    }
  }, [isOpen, registrationData.fullName]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(t("contact.success"));
      handleClose();
    }
    if (error) {
      toast.error(`${t("contact.error")}: ${error.message}`);
    }
  }, [isSuccess, error, handleClose, t]);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!name.trim()) {
      newErrors.name = t("contact.validation.nameRequired");
    }
    if (!message.trim()) {
      newErrors.message = t("contact.validation.messageRequired");
    } else if (message.trim().length < 10) {
      newErrors.message = t("contact.validation.messageLength");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      submitFeedback({ name, message });
    }
  };

  return (
    <div
      className="profile-popup-overlay"
      onClick={isLoading ? undefined : handleClose}
    >
      <div className="profile-popup" onClick={(e) => e.stopPropagation()}>
        <div className="profile-popup__header">
          <h3 className="profile-popup__title">{t("contact.title")}</h3>
          <button
            className="profile-popup__close-btn"
            onClick={handleClose}
            title={t("dictionary.history.closePlaceholder")}
            disabled={isLoading}
          >
            {CloseIcon}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="profile-popup__form">
          <div className="profile-popup__form-group">
            <label htmlFor="contact-name">{t("contact.name")}</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              placeholder={t("contact.namePlaceholder")}
            />
            {errors.name && <p className="form-error-message">{errors.name}</p>}
          </div>

          <div className="profile-popup__form-group">
            <label htmlFor="contact-message">{t("contact.message")}</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
              placeholder={t("contact.messagePlaceholder")}
              style={{ resize: "vertical" }}
            />
            {errors.message && (
              <p className="form-error-message">{errors.message}</p>
            )}
          </div>

          <div className="profile-popup__actions">
            <button
              type="button"
              className="btn__profile-popup-cancel"
              onClick={handleClose}
              disabled={isLoading}
            >
              {t("userProfile.profilePopup.cancel")}
            </button>
            <button
              type="submit"
              className="btn__profile-popup-save"
              disabled={isLoading}
            >
              {isLoading ? t("contact.sending") : t("contact.send")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPopup;