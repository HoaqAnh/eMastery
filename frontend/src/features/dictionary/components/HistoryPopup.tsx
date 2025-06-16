import type { JSX } from "react";
import "@styles/features/HistoryPopup.css";
import { CloseIcon } from "@/components/common/Icons";

interface HistoryPopupProps {
  history: string[];
  isOpen: boolean;
  onClose: () => void;
  onWordClick: (word: string) => void;
}

const HistoryPopup = ({
  history,
  isOpen,
  onClose,
  onWordClick,
}: HistoryPopupProps): JSX.Element | null => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="history-popup-overlay">
      <div className="history-popup">
        <div className="history-popup__header">
          <h3 className="history-popup__title">Lịch sử tra cứu</h3>
          <button
            className="history-popup__close-btn"
            onClick={onClose}
            title="Đóng"
          >
            {CloseIcon}
          </button>
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
          <p className="history-popup__empty">Chưa có lịch sử tra cứu.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPopup;
