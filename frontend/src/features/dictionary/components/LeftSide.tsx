import type { JSX } from "react";
import { SoundIcon, StarIcon, SearchIcon } from "@/components/common/Icons";

interface LeftSideProps {
  word: string;
  pronunciation: string;
  summary: string;
}

const LeftSide = ({
  word,
  pronunciation,
  summary,
}: LeftSideProps): JSX.Element => {
  return (
    <div className="dictionary__leftside">
      <div className="dictionary__leftside-word">
        <div className="dictionary__leftside-title">
          {SearchIcon}
          <p>{word}</p>
        </div>
      </div>
      <div className="dictionary__leftside-pronunciation">
        <div className="dictionary__leftside-title">
          {SoundIcon}
          <p>PRONUNCIATION</p>
        </div>
        <div className="dictionary__leftside-content">
          <p>{pronunciation}</p>
        </div>
      </div>
      <div className="dictionary__leftside-summary">
        <div className="dictionary__leftside-title">
          {StarIcon}
          <p>SUMMARY</p>
        </div>
        <div className="dictionary__leftside-content">
          <p>{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
