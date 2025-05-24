import logo from "assets/commons/home-logo.png";
import intro_msg from "assets/intro-msg.png";
import rabbitBot from "assets/rabbit-bot.png";
import rabbit from "assets/rabbit-hand-up.png";
import StartButton from "commons/svgs/StartButton";
import { InformationContainer } from "components/home/InformationContainer";
import { RankingPreview } from "components/home/RankingPreview";
import {
  ANNOUNCE_URL,
  CHARACTER_INTRO_URL,
  LOBBY_URL,
  RANKING_URL,
  SERVICE_CENTER_URL,
  SIGN_IN_URL,
} from "constants/url";
import Profile from "pages/home/Profile";
import { useEffect, useState } from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
  const { isSignIn } = useLoaderData();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const navType = searchParams.get("type") || "notice";

  const handleStartBtn = () => {
    navigate(LOBBY_URL);
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    if (navType === "notice") {
      // 공지사항 더미 데이터
      setData([
        { title: "상대방에게 욕설, 비난이 담긴 채팅 신고", date: "2025.06.21" },
        { title: "2025. 07. 21 업데이트 안내", date: "2025.06.21" },
        { title: "AI 업그레이드 안내", date: "2025.06.21" },
        { title: "2026. 08. 21 점검 안내", date: "2025.06.21" },
        { title: "상대방에게 욕설, 비난이 담긴 채팅 신고", date: "2025.06.21" },
      ]);
    } else if (navType === "help") {
      // 고객센터 더미 데이터
      setData([
        { title: "게임이 실행되지 않아요0", date: "2025.06.21" },
        { title: "게임이 실행되지 않아요1", date: "2025.06.21" },
        { title: "게임이 실행되지 않아요2", date: "2025.06.21" },
        { title: "게임이 실행되지 않아요3", date: "2025.06.21" },
        { title: "게임이 실행되지 않아요4", date: "2025.06.21" },
      ]);
    }
  }, [navType]);

  return (
    <div className="home-page-container">
      <div className="home-fixed-section">
        <header className="home-page-header">
          <img src={logo} alt="logo" className="home-logo-img" />
          <nav className="home-page-nav-container">
            <Link to={ANNOUNCE_URL}>공지사항</Link>
            <Link to={RANKING_URL}>랭킹</Link>
            <Link to={CHARACTER_INTRO_URL}>캐릭터 소개</Link>
            <Link to={SERVICE_CENTER_URL}>고객센터</Link>
          </nav>
          {isSignIn ? (
            <Profile />
          ) : (
            <Link to={SIGN_IN_URL} className="sign-in-btn">
              로그인
            </Link>
          )}
        </header>

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

      <div className="home-scroll-section">
        <div className="information-type-container">
          <Link
            to="?type=notice"
            className={`information-type-button ${
              navType === "notice" ? "active" : ""
            }`}
          >
            공지사항
          </Link>
          <Link
            to="?type=help"
            className={`information-type-button ${
              navType === "help" ? "active" : ""
            }`}
          >
            고객센터
          </Link>
        </div>
        <InformationContainer data={data} />
        <div className="bottom-container">
          <RankingPreview rankingData={rankingData} />
          <RankingPreview rankingData={rankingData} />
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
