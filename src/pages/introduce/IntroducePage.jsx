import { HomeHeader } from "components/home/HomeHeader";
import { tokenReissueAPI } from "services/auth/auth";
import { getAuthToken } from "utils/token";
import "styles/pages/introduce/IntroducePage.scss";
import intro_logo from "assets/components/introduce/character-intro.png";
import { character_info } from "constants/characterIntroduce";
import { useState } from "react";
const IntroducePage = () => {
  const [chooseCharacter, setChooseCharacter] = useState("");

  return (
    <div className="introduce-page-container">
      <div className="introduce-top-section">
        <HomeHeader />
        <img
          src={intro_logo}
          className="introduce-logo"
          alt="캐릭터 소개 로고"
        ></img>
        <ul className="introduce-choose-bar">
          {character_info.map((character) => (
            <button
              key={character.index}
              className={`introduce-choose-button ${
                chooseCharacter === character.characterName ? "active" : ""
              }`}
              onClick={() => setChooseCharacter(character.characterName)}
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
            className={`introduce-character-box ${
              chooseCharacter === character.characterName ? "active" : ""
            }  ${character.index % 2 === 0 ? "left" : "right"}`}
          >
            {character.svg}
            <img
              src={character.background}
              alt={`${character.characterName} 배경 사진`}
            ></img>
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
    // 토큰 재발급
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
