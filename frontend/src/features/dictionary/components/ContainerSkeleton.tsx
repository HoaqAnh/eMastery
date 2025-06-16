import type { JSX } from "react";
import "@styles/features/DictionarySkeleton.css";

const ContainerSkeleton = (): JSX.Element => {
  return (
    <div className="dictionary__container-skeleton">
      <div className="skeleton-block skeleton-tabs">
        <div className="skeleton skeleton-tab" />
        <div className="skeleton skeleton-tab" />
        <div className="skeleton skeleton-tab" />
        <div className="skeleton skeleton-tab" />
        <div className="skeleton skeleton-tab" />
      </div>
      <div className="skeleton-block skeleton-main">
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line w-90" />
        <br />
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line w-80" />
        <div className="skeleton skeleton-line" />
        <br />
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line w-70" />
      </div>
    </div>
  );
};

export default ContainerSkeleton;
