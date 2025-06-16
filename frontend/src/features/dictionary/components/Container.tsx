import type { JSX } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const contentToDisplay = data[activeTab] || t("dictionary.notFound.content");

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
          <p>{t("dictionary.meaning")}</p>
        </button>
        <button
          className={`dictionary___item ${
            activeTab === "grammarUsage" ? "active" : ""
          }`}
          onClick={() => setActiveTab("grammarUsage")}
        >
          {DialogIcon}
          <p>{t("dictionary.grammarUsage")}</p>
        </button>
        <button
          className={`dictionary___item ${
            activeTab === "phrasesAndIdioms" ? "active" : ""
          }`}
          onClick={() => setActiveTab("phrasesAndIdioms")}
        >
          {StarIcon}
          <p>{t("dictionary.phrasesAndIdioms")}</p>
        </button>
        <button
          className={`dictionary___item ${
            activeTab === "synonymsAndAntonyms" ? "active" : ""
          }`}
          onClick={() => setActiveTab("synonymsAndAntonyms")}
        >
          {CachedIcon}
          <p>{t("dictionary.synonymsAndAntonyms")}</p>
        </button>
        <button
          className={`dictionary___item ${
            activeTab === "funFactsAndTips" ? "active" : ""
          }`}
          onClick={() => setActiveTab("funFactsAndTips")}
        >
          {LightbulbIcon}
          <p>{t("dictionary.funFactsAndTips")}</p>
        </button>
      </div>
      <button
        className={`dictionary___extend ${!isExpanded ? "collapsed" : ""}`}
        onClick={onToggleExpand}
      >
        {isExpanded ? ArrowDownIcon : ArrowUpIcon}
        <p>
          {isExpanded ? t("dictionary.collapsed") : t("dictionary.expanded")}
        </p>
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
