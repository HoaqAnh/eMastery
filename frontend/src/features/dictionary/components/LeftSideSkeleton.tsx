import type { JSX } from "react";
import "@styles/features/DictionarySkeleton.css";

const LeftSideSkeleton = (): JSX.Element => {
  return (
    <div className="dictionary__leftside-skeleton">
      <div className="skeleton-block skeleton-block--word">
        <div className="skeleton skeleton-title" />
      </div>

      <div className="skeleton-block">
        <div className="skeleton skeleton-subtitle" />
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line w-80" />
      </div>

      <div className="skeleton-block">
        <div className="skeleton skeleton-subtitle" />
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line w-90" />
      </div>
    </div>
  );
};

export default LeftSideSkeleton;
