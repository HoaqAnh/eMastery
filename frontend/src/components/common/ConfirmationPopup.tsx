import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import { CloseIcon } from "@/components/common/Icons";
import "@styles/components/ConfirmationPopup.css";

interface ConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationPopup = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
}: ConfirmationPopupProps): JSX.Element | null => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="confirmation-popup-overlay" onClick={onClose}>
      <div className="confirmation-popup" onClick={(e) => e.stopPropagation()}>
        <div className="confirmation-popup__header">
          <h3 className="confirmation-popup__title">{title}</h3>
          <button
            className="confirmation-popup__close-btn"
            onClick={onClose}
            title={t("dictionary.history.closePlaceholder")}
          >
            {CloseIcon}
          </button>
        </div>
        <div className="confirmation-popup__body">
          <p>{message}</p>
        </div>
        <div className="confirmation-popup__actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            {cancelText || t("confirmation.cancel", "Cancel")}
          </button>
          <button
            type="button"
            className="btn btn-destructive"
            onClick={onConfirm}
          >
            {confirmText || t("confirmation.confirm", "Confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;