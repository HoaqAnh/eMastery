import { type JSX } from "react";
import "@styles/components/ProgressSkeleton.css";

const ProgressSkeleton = (): JSX.Element => {
  return (
    <div className="progress-skeleton">
      <div className="progress-skeleton__header">
        <div className="skeleton skeleton-text skeleton-text__title"></div>
        <div className="skeleton skeleton-text skeleton-text__percentage"></div>
      </div>
      <div className="skeleton skeleton-bar"></div>
      <div className="progress-skeleton__hint">
        <div className="skeleton skeleton-text skeleton-text__hint"></div>
      </div>
    </div>
  );
};

export default ProgressSkeleton;