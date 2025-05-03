import logo from "assets/commons/home-logo.png";
import intro_msg from "assets/intro-msg.png";
import rabbitBot from "assets/rabbit-bot.png";
import rabbit from "assets/rabbit-hand-up.png";
import start_btn from "assets/start-btn.png";
import {
  ANNOUNCE_URL,
  CHARACTER_INTRO_URL,
  RANKING_URL,
  SERVICE_CENTER_URL,
  SIGN_IN_URL,
} from "constants/url";
import { Link, useLoaderData } from "react-router-dom";
import "styles/components/home/HomePage.scss";
import Profile from "./Profile";

const HomePage = () => {
  const { isSignIn } = useLoaderData();

  return (
    <div className="home-page-container">
      <header className="home-page-header-container">
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
        <img src={rabbit} alt="rabbit" className="left-background-img" />
        <img
          src={rabbitBot}
          alt="rabbit-bot"
          className="right-background-img"
        />
        <img src={intro_msg} alt="intro-msg" className="intro-msg-img" />
      </div>

      <button class="start-svg-btn">
        <svg
          viewBox="0 0 434 97"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="게임 시작 버튼"
        >
          <title>START</title>
          <desc>게임을 시작하는 버튼입니다</desc>
          <path
            d="M432.635 1.31396V55.2153C432.635 77.567 414.515 95.687 392.163 95.687H1.41235V1.31396H432.635Z"
            fill="#FFC466"
            stroke="black"
            stroke-width="1.5"
          />
          <path
            d="M432.735 51.5771V55.2148C432.735 77.5664 414.616 95.6864 392.265 95.6865H386.765V51.5771H432.735Z"
            fill="#F28110"
            stroke="black"
            stroke-width="1.5"
          />
        </svg>
        <span class="label">
          <img src={start_btn} alt="start-btn" className="start-btn-img" />
        </span>
      </button>
    </div>
  );
};

export default HomePage;
