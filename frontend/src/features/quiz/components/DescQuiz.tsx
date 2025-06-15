import { useState, type JSX } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  UserIcon,
} from "@/components/common/Icons";

interface DescQuizProps {
  description: string;
}

const DescQuiz = ({ description }: DescQuizProps): JSX.Element => {
  const [extend, setExtend] = useState(false);

  return (
    <>
      <div className="response__info">
        <div className="response__info-bot__logo">{UserIcon}</div>
        <div className="response__info-bot__name">eMastery</div>
      </div>
      <div className="descquiz">
        <div className={`descquiz__container ${!extend ? "collapsed" : ""}`}>
          <p>{description}</p>
        </div>
        <button
          className="btn-expand__collapse"
          onClick={() => {
            setExtend(!extend);
          }}
        >
          {extend ? ArrowUpIcon : ArrowDownIcon}
        </button>
      </div>
    </>
  );
};

export default DescQuiz;
