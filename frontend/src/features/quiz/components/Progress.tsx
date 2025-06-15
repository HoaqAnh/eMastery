import type { JSX } from "react";

const getColorByPercentage = (percentage: number): string => {
  const p = Math.max(0, Math.min(100, percentage));
  const hue = (p / 100) * 120;
  return `hsl(${hue}, 90%, 45%)`;
};

const Progress = (): JSX.Element => {
  const percentage = 20;
  const barColor = getColorByPercentage(percentage);
  const fillStyle = {
    width: `${percentage}%`,
    backgroundColor: barColor,
  };

  return (
    <div className="progress">
      <div className="progress__header">
        <span>Đáp án của bạn: </span>
        <strong>{percentage}%</strong>
      </div>

      <div className="progress__bar">
        <div className="progress__bar-fill" style={fillStyle}></div>
      </div>

      <div className="progress__hint">
        <p>Gợi ý: Cái gì có 4 bánh?</p>
      </div>
    </div>
  );
};

export default Progress;
