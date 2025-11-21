import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  StarIcon,
  BookIcon,
  DialogIcon,
  CachedIcon,
  LightbulbIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@/components/common/Icons";
import { type Explanation } from "@features/dictionary/services/dictionaryService";

export type DictionaryTab =
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

  const getButtonClass = (tabName: DictionaryTab) =>
    `dictionary___item ${activeTab === tabName ? "active" : ""}`;

  return (
    <div className="dictionary__body-container">
      <div className="dictionary__body-container__actions">
        <button
          className={getButtonClass("meaning")}
          onClick={() => setActiveTab("meaning")}
        >
          {BookIcon}
          <p>{t("dictionary.meaning")}</p>
        </button>

        <button
          className={getButtonClass("grammarUsage")}
          onClick={() => setActiveTab("grammarUsage")}
        >
          {DialogIcon}
          <p>{t("dictionary.grammarUsage")}</p>
        </button>

        <button
          className={getButtonClass("phrasesAndIdioms")}
          onClick={() => setActiveTab("phrasesAndIdioms")}
        >
          {StarIcon}
          <p>{t("dictionary.phrasesAndIdioms")}</p>
        </button>

        <button
          className={getButtonClass("synonymsAndAntonyms")}
          onClick={() => setActiveTab("synonymsAndAntonyms")}
        >
          {CachedIcon}
          <p>{t("dictionary.synonymsAndAntonyms")}</p>
        </button>

        <button
          className={getButtonClass("funFactsAndTips")}
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

      <div className="dictionary__body-container__main">
        <div
          className={`dictionary__body-container__content markdown-content  ${
            !isExpanded ? "collapsed" : ""
          }`}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {contentToDisplay}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Container;
