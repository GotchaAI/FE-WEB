import {
  ANNOUNCE_URL,
  CHARACTER_INTRO_URL,
  RANKING_URL,
  SERVICE_CENTER_URL,
  SIGN_IN_URL,
} from "constants/url";
import { Link, useLoaderData } from "react-router-dom";
import logo from "assets/commons/home-logo.png";
import Profile from "pages/home/Profile";
import "styles/components/home/HomeHeader.scss";

export const HomeHeader = () => {
  const { isSignIn } = useLoaderData();
  return (
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
  );
};
