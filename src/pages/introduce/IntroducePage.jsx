import { HomeHeader } from "components/home/HomeHeader";
import { tokenReissueAPI } from "services/auth/auth";
import { getAuthToken } from "utils/token";
import "styles/pages/introduce/IntroducePage.scss";
import intro_logo from "assets/components/introduce/character-intro.png";
import { character_info } from "constants/characterIntroduce";
import { useState, useRef } from "react";

const IntroducePage = () => {
  const [chooseCharacter, setChooseCharacter] = useState("루루");
  const characterRefs = useRef({});

  const handleOnclick = (characterName) => {
    const target = characterRefs.current[characterName];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });

      setTimeout(() => {
        setChooseCharacter("루루");
      }, 500);
    }
  };
  const getCharacterBoxClassName = (character, chooseCharacter) => {
    const isActive = chooseCharacter === character.characterName;
    const isEven = character.index % 2 === 0;

    return [
      "introduce-character-box",
      isActive && "active",
      isEven ? "left" : "right",
    ]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <div className="introduce-page-container">
      <div className="introduce-top-section">
        <HomeHeader />
        <img
          src={intro_logo}
          className="introduce-logo"
          alt="캐릭터 소개 로고"
        />
        <ul className="introduce-choose-bar">
          {character_info.map((character) => (
            <button
              key={character.index}
              className={`introduce-choose-button ${
                chooseCharacter === character.characterName ? "active" : ""
              }`}
              onClick={() => handleOnclick(character.characterName)}
            >
              {character.characterName}
            </button>
          ))}
        </ul>
      </div>

      <div className="introduce-main-section">
        {character_info.map((character) => (
          <div
            key={character.index}
            ref={(el) => (characterRefs.current[character.characterName] = el)}
            className={getCharacterBoxClassName(character, chooseCharacter)}
          >
            {character.svg}
            <img
              src={character.background}
              alt={`${character.characterName} 배경 사진`}
            />
            <div className="introduce-character-info">
              <h2 className="introduce-character-name">
                {character.characterEngName}
              </h2>
              <p className="introduce-character-description">
                {character.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      <span className="coming-soon">새로운 동물친구들이 오고 있어요!</span>
    </div>
  );
};

export default IntroducePage;

export const loader = async () => {
  const { accessToken, setAccessToken } = getAuthToken();

  if (!accessToken) {
    try {
      const res = await tokenReissueAPI();
      const newAccessToken = res.accessToken;
      const newExpireTime = res.expiredAt;
      setAccessToken(newAccessToken, newExpireTime);
    } catch (e) {
      console.error(e);
      return { isSignIn: false };
    }
  }

  return;
};
