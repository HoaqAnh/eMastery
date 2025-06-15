import { useState, type JSX } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  UserIcon,
} from "@/components/common/Icons";

const DescQuiz = (): JSX.Element => {
  const [extend, setExtend] = useState(true);

  return (
    <>
      <div className="response__info">
        <div className="response__info-bot__logo">{UserIcon}</div>
        <div className="response__info-bot__name">eMastery</div>
      </div>
      <div className="descquiz">
        <div className="descquiz__container">
          <p>
            It was a very hot day. My friend and I wanted to go swimming, but we
            were too tired to walk to the pool. We decided to stay home and
            relax instead. We were both very happy with our decision.
          </p>
        </div>
        <button
          className="btn-expand__collapse"
          onClick={() => {
            setExtend(!extend);
          }}
        >
          {extend ? ArrowUpIcon : ArrowDownIcon}{" "}
        </button>
      </div>
    </>
  );
};

export default DescQuiz;
