import {
  GAME1_ROBBY_URL,
  GAME2_ROBBY_URL,
  MY_PAGE_URL,
  MY_RECORD_URL,
  SETTING_URL,
} from "constants/url";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "styles/components/lobby/LobbyNavBar.scss";

const gameNav = [
  {
    title: "루루의 미대입시",
    url: GAME2_ROBBY_URL,
  },
  {
    title: "묘묘를 속여라!",
    url: GAME1_ROBBY_URL,
  },
];

const myInfoNav = [
  {
    title: "전적",
    url: MY_RECORD_URL,
  },
  {
    title: "내 정보",
    url: MY_PAGE_URL,
  },
];

const settingNav = [
  {
    title: "환경설정",
    url: SETTING_URL,
  },
];

const LobbyNavBar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [navType, setNavType] = useState(gameNav);

  useEffect(() => {
    if (path.includes("setting")) setNavType(settingNav);
    else if (path.includes("info")) setNavType(myInfoNav);
    else setNavType(gameNav);
  });

  return (
    <div className="lobby-nav-container">
      {navType.map((nav) => {
        return (
          <Link
            key={nav.title}
            to={nav.url}
            className={`${path.includes(nav.url) && "active"}`}
          >
            {nav.title}
          </Link>
        );
      })}
    </div>
  );
};

export default LobbyNavBar;
