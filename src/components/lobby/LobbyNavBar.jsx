import { GAME1_ROBBY_URL, GAME2_ROBBY_URL, SETTING_URL } from "constants/url";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "styles/components/lobby/LobbyNavBar.scss";
import { getLastLocationPath } from "utils/filter";
const gameNav = [
  {
    title: "루루의 미대입시",
    name: "game2",
    url: GAME2_ROBBY_URL,
  },
  {
    title: "묘묘를 속여라!",
    name: "game1",
    url: GAME1_ROBBY_URL,
  },
];

// 임시
const myInfoNav = [
  {
    title: "전적",
    name: "",
    url: "url",
  },
  {
    title: "내 정보",
    name: "",
    url: "url",
  },
];

const settingNav = [
  {
    title: "환경설정",
    name: "setting",
    url: SETTING_URL,
  },
];

const LobbyNavBar = () => {
  const location = useLocation();
  const lastPath = getLastLocationPath(location.pathname);
  const [navType, setNavType] = useState(gameNav);

  useEffect(() => {
    if (lastPath.includes("setting")) setNavType(settingNav);
    else if (lastPath.includes("info")) setNavType(myInfoNav);
    else setNavType(gameNav);
  });

  return (
    <div className="lobby-nav-container">
      {navType.map((nav) => {
        return (
          <Link to={nav.url} className={`${lastPath === nav.name && "active"}`}>
            {nav.title}
          </Link>
        );
      })}
    </div>
  );
};

export default LobbyNavBar;
