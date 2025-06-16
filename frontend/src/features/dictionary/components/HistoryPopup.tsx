import type { JSX } from "react";
import { CloseIcon, DeleteIcon } from "@/components/common/Icons";
import { useTranslation } from "react-i18next";
import "@styles/features/HistoryPopup.css";

interface HistoryPopupProps {
  history: string[];
  isOpen: boolean;
  onClose: () => void;
  onWordClick: (word: string) => void;
  onClearHistory: () => void;
}

const HistoryPopup = ({
  history,
  isOpen,
  onClose,
  onWordClick,
  onClearHistory,
}: HistoryPopupProps): JSX.Element | null => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="history-popup-overlay">
      <div className="history-popup">
        <div className="history-popup__header">
          <h3 className="history-popup__title">
            {t("dictionary.history.title")}
          </h3>
          <div className="history-popup__actions">
            <button
              className="history-popup__clear-btn"
              onClick={onClearHistory}
              disabled={history.length === 0}
              title={t("dictionary.history.deletePlaceholder")}
            >
              {DeleteIcon}
            </button>
            <button
              className="history-popup__close-btn"
              onClick={onClose}
              title={t("dictionary.history.closePlaceholder")}
            >
              {CloseIcon}
            </button>
          </div>
        </div>

        {history.length > 0 ? (
          <ul className="history-popup__list">
            {history.map((word) => (
              <li key={word} className="history-popup__item">
                <button onClick={() => onWordClick(word)}>{word}</button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="history-popup__empty">
            {t("dictionary.history.empty")}
          </p>
        )}
      </div>
    </div>
  );
};

export default HistoryPopup;
