import intro_msg from "assets/intro-msg.png";
import rabbitBot from "assets/rabbit-bot.png";
import rabbit from "assets/rabbit-hand-up.png";
import StartButton from "commons/svgs/StartButton";
import { HomeHeader } from "components/home/HomeHeader";
import { InformationContainer } from "components/home/InformationContainer";
import IntroduceCharacterPreview from "components/home/IntroduceCharacterPreview";
import { RankingPreview } from "components/home/RankingPreview";
import { LOBBY_URL } from "constants/url";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokenReissueAPI } from "services/auth/auth";
import "styles/pages/home/HomePage.scss";
import { getAuthToken } from "utils/token";

const rankingData = [
  { username: "Player1", score: 1000 },
  { username: "Player2", score: 900 },
  { username: "Player3", score: 800 },
  { username: "Player4", score: 700 },
  { username: "Player5", score: 600 },
  { username: "Player6", score: 500 },
  { username: "Player7", score: 400 },
  { username: "Player8", score: 300 },
  { username: "Player9", score: 200 },
  { username: "Player10", score: 100 },
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartBtn = () => {
    navigate(LOBBY_URL);
  };

  return (
    <div className="home-page-container">
      <HomeHeader />
      <div className="home-top-container">
        <div className="background-container">
          <img
            src={rabbit}
            alt="공원 위 토끼"
            className="left-background-img"
          />
          <img
            src={rabbitBot}
            alt="공원 위 토끼 봇"
            className="right-background-img"
          />
          <img src={intro_msg} alt="게임 소개 글" className="intro-msg-img" />
        </div>

        <StartButton onClick={handleStartBtn} />
      </div>

      <div className="home-middle-container">
        <InformationContainer />
        <div className="preview-container">
          <RankingPreview rankingData={rankingData} />
          <IntroduceCharacterPreview />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

export const loader = async () => {
  const { accessToken, setAccessToken } = getAuthToken();

  if (!accessToken) {
    // 토큰 재발급
    try {
      const res = await tokenReissueAPI();
      const newAccessToken = res.accessToken;
      const expireTime = res.expiredAt;
      setAccessToken(newAccessToken, expireTime);
    } catch (e) {
      console.error(e);
      return { isSignIn: false };
    }
  }
  return { isSignIn: true };
};
