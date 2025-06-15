import { useState, type JSX, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  UserIcon,
} from "@/components/common/Icons";

interface DescQuizProps {
  description: string;
  translation: string;
}

const DescQuiz = ({ description, translation }: DescQuizProps): JSX.Element => {
  const { t } = useTranslation();
  const [extend, setExtend] = useState(false);
  const [level, setLevel] = useState<"ez" | "med" | "hard">("hard");

  const pRef = useRef<HTMLParagraphElement>(null);
  const [showButton, setShowButton] = useState(false);

  const getModeClass = (mode: "ez" | "med" | "hard"): string => {
    return level === mode ? `${mode}-mode active` : `${mode}-mode`;
  };

  const contentToDisplay = level === "hard" ? description : translation;

  useEffect(() => {
    const checkOverflow = () => {
      if (pRef.current) {
        const isOverflowing =
          pRef.current.scrollHeight > pRef.current.clientHeight;
        setShowButton(isOverflowing);
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [contentToDisplay]);

  return (
    <div className="descquiz">
      <div className="descquiz__header">
        <div className="response__info">
          <div className="response__info-bot__logo">{UserIcon}</div>
          <div className="response__info-bot__name">eMastery</div>
        </div>
        <div className="descquiz__level">
          <p>{t("quiz.level.title")} </p>
          <button
            className={getModeClass("ez")}
            title={t("quiz.level.ez")}
            onClick={() => setLevel("ez")}
          ></button>
          <button
            className={getModeClass("med")}
            title={t("quiz.level.med")}
            onClick={() => setLevel("med")}
          ></button>
          <button
            className={getModeClass("hard")}
            title={t("quiz.level.hard")}
            onClick={() => setLevel("hard")}
          ></button>
        </div>
      </div>
      <div className="descquiz__body">
        <div className={`descquiz__container ${!extend ? "collapsed" : ""}`}>
          <p ref={pRef}>{contentToDisplay}</p>
        </div>
        {showButton && (
          <button
            className="btn-expand__collapse"
            onClick={() => {
              setExtend(!extend);
            }}
          >
            {extend ? ArrowUpIcon : ArrowDownIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default DescQuiz;
