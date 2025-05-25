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
      <div className="home-top-section">
        <HomeHeader />
        <img
          src={intro_logo}
          className="intro-logo"
          alt="캐릭터 소개 로고"
        ></img>
        <ul className="intro-choose-bar">
          {character_info.map((character) => (
            <button
              key={character.index}
              className={`intro-choose-button ${
                chooseCharacter === character.characterName ? "active" : ""
              }`}
              onClick={() => setChooseCharacter(character.characterName)}
            >
              {character.characterName}
            </button>
          ))}
        </ul>
      </div>
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
