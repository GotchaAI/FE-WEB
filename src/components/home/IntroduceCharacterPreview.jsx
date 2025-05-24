import { PlusButton } from "commons/svgs/PlusButton";
import { character_info } from "constants/characterIntroduce";
import { CHARACTER_INTRO_URL } from "constants/url";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "styles/components/home/IntroduceCharacterPreview.scss";

const IntroduceCharacterPreview = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const character = character_info[index];
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % character_info.length);
        setFade(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="character-introduce-preview-container">
      <div className="character-introduce-header">
        <h2> 캐릭터 소개</h2>
        <Link
          to={CHARACTER_INTRO_URL}
          className="character-introduce-move-button"
        >
          <PlusButton />
        </Link>
      </div>
      <div
        className={`character-introduce-main-content ${
          fade ? "fade-out" : "fade-in"
        }`}
      >
        <div className="character-svg">{character.svg}</div>
        <div className="character-info">
          <h3>{character.characterName}</h3>
          <h2>{character.description}</h2>
        </div>
      </div>
    </div>
  );
};

export default IntroduceCharacterPreview;
