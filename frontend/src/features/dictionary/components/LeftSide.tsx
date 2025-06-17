import { type JSX, useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SoundIcon, StarIcon, SearchIcon } from "@/components/common/Icons";
import { useTranslation } from "react-i18next";
import { useWordAudio } from "../hooks/useWordAudio";
import toast from "react-hot-toast";

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
  const { t } = useTranslation();
  const { audioUrl, isLoading, error, fetchAudio } = useWordAudio();
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const coolDownTimer = useRef<number | null>(null);

  useEffect(() => {
    if (word) {
      fetchAudio(word);
    }
  }, [word, fetchAudio]);

  useEffect(() => {
    if (error) {
      toast.error(t("dictionary.error.audio"));
      console.error(error.message);
    }
  }, [error, t]);

  useEffect(() => {
    return () => {
      if (coolDownTimer.current !== null) {
        clearTimeout(coolDownTimer.current);
      }
    };
  }, []);

  const handlePlayAudio = () => {
    if (isLoading || isCoolingDown) return;

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio
        .play()
        .then(() => {
          setIsCoolingDown(true);
          coolDownTimer.current = window.setTimeout(() => {
            setIsCoolingDown(false);
          }, 1500);
        })
        .catch((e) => {
          console.error("Lỗi khi phát audio:", e);
          toast.error(t("dictionary.error.play"));
        });
    } else {
      toast.error(t("dictionary.error.noAudio"));
    }
  };

  const getButtonTitle = () => {
    if (isLoading) {
      return t("dictionary.loadingAudio");
    }
    if (isCoolingDown) {
      return t("dictionary.cooldown");
    }
    return t("dictionary.playAudio");
  };

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
          <button
            className={`audio-icon-button ${isLoading ? "loading" : ""}`}
            onClick={handlePlayAudio}
            disabled={isLoading || isCoolingDown}
            title={getButtonTitle() as string}
          >
            {SoundIcon}
          </button>
          <p>{t("dictionary.pronunciation")}</p>
        </div>
        <div className="dictionary__leftside-content markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {pronunciation}
          </ReactMarkdown>
        </div>
      </div>
      <div className="dictionary__leftside-summary">
        <div className="dictionary__leftside-title">
          {StarIcon}
          <p>{t("dictionary.summary")}</p>
        </div>
        <div className="dictionary__leftside-content markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;