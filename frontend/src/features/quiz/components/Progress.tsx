import { useState, useEffect, type JSX } from "react";
import { useTranslation } from "react-i18next";

const getColorByPercentage = (percentage: number): string => {
  const p = Math.max(0, Math.min(100, percentage));
  const hue = (p / 100) * 120;
  return `hsl(${hue}, 90%, 45%)`;
};

interface ProgressProps {
  number: number;
  accuracy: number;
  userAnswer: string;
  explanation: string;
  level: "ez" | "med" | "hard";
}

const Progress = ({
  number,
  accuracy,
  userAnswer,
  explanation,
  level,
}: ProgressProps): JSX.Element => {
  const { t } = useTranslation();
  const [progressWidth, setProgressWidth] = useState(0);
  const [displayAccuracy, setDisplayAccuracy] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgressWidth(accuracy), 100);

    const interval = setInterval(() => {
      setDisplayAccuracy((prev) => {
        if (prev < accuracy) {
          return prev + 1;
        }
        clearInterval(interval);
        return accuracy;
      });
    }, 8);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [accuracy]);

  const barColor = getColorByPercentage(accuracy);
  const fillStyle = {
    width: `${progressWidth}%`,
    backgroundColor: barColor,
  };

  return (
    <div className="progress">
      <div className="progress__header">
        <span>
          {number}. {t("quiz.result.title")} {userAnswer}
        </span>
        <strong>{displayAccuracy}%</strong>
      </div>

      <div className="progress__bar">
        <div className="progress__bar-fill" style={fillStyle}></div>
      </div>

      {level === "ez" && (
        <div className="progress__hint">
          <p>
            {t("quiz.result.hint")} {explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default Progress;
