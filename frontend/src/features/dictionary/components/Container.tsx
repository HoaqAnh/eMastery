import type { JSX } from "react";
import {
  StarIcon,
  BookIcon,
  DialogIcon,
  CachedIcon,
  LightbulbIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@/components/common/Icons";
import { type Explanation } from "../services/dictionaryService";

type DictionaryTab =
  | "meaning"
  | "grammarUsage"
  | "phrasesAndIdioms"
  | "synonymsAndAntonyms"
  | "funFactsAndTips";

interface ContainerProps {
  data: Explanation;
  isExpanded: boolean;
  onToggleExpand: () => void;
  activeTab: DictionaryTab;
  setActiveTab: (tab: DictionaryTab) => void;
}

const Container = ({
  data,
  isExpanded,
  onToggleExpand,
  activeTab,
  setActiveTab,
}: ContainerProps): JSX.Element => {
  const contentToDisplay = data[activeTab] || "Nội dung không có sẵn.";

  return (
    <div className="dictionary__body-container">
      <div className="dictionary__body-container__actions">
        <button
          className={`dictionary___item ${
            activeTab === "meaning" ? "active" : ""
          }`}
          onClick={() => setActiveTab("meaning")}
        >
          {BookIcon}
          <p>Giải nghĩa</p>
        </button>
        <button
          className={`dictionary___item ${
            activeTab === "grammarUsage" ? "active" : ""
          }`}
          onClick={() => setActiveTab("grammarUsage")}
        >
          {DialogIcon}
          <p>Ngữ pháp</p>
        </button>
        <button
          className={`dictionary___item ${
            activeTab === "phrasesAndIdioms" ? "active" : ""
          }`}
          onClick={() => setActiveTab("phrasesAndIdioms")}
        >
          {StarIcon}
          <p>Cụm từ</p>
        </button>
        <button
          className={`dictionary___item ${
            activeTab === "synonymsAndAntonyms" ? "active" : ""
          }`}
          onClick={() => setActiveTab("synonymsAndAntonyms")}
        >
          {CachedIcon}
          <p>Từ liên quan</p>
        </button>
        <button
          className={`dictionary___item ${
            activeTab === "funFactsAndTips" ? "active" : ""
          }`}
          onClick={() => setActiveTab("funFactsAndTips")}
        >
          {LightbulbIcon}
          <p>Mẹo nhớ</p>
        </button>
      </div>
      <button
        className={`dictionary___extend ${!isExpanded ? "collapsed" : ""}`}
        onClick={onToggleExpand}
      >
        {isExpanded ? ArrowUpIcon : ArrowDownIcon}
        <p>{isExpanded ? "Thu gọn" : "Mở rộng"}</p>
      </button>
      <div
        className={`dictionary__body-container__main ${
          !isExpanded ? "collapsed" : ""
        }`}
      >
        <p>{contentToDisplay}</p>
      </div>
    </div>
  );
};

export default Container;
