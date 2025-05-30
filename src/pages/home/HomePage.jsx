import ContextMenu from "commons/contextMenu/ContextMenu";
import ScrollToTop from "components/common/ScrollToTop";
import { HomeHeader } from "components/home/HomeHeader";
import useContextMenu from "hooks/contextmenu/useContextMenu";
import { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { tokenReissueAPI } from "services/auth/auth";
import "styles/pages/home/HomePage.scss";
import { getAuthToken } from "utils/token";

const HomePage = () => {
  const { isSignIn } = useLoaderData();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const a = () => console.log("a");
  const b = () => console.log("b");
  const c = () => console.log("c");

  const { isOpen, menus, position, openMenu, closeMenu } = useContextMenu();

  const menuList = [
    {
      label: "a버튼",
      action: a,
    },
    {
      label: "b버튼",
      action: b,
    },
    {
      label: "c버튼",
      action: c,
    },
  ];

  const menuHandler = (e) => {
    openMenu(e.pageX, e.pageY, menuList);
  };

  return (
    <div className="home-page-container">
      <ScrollToTop />

      <HomeHeader isSignIn={isSignIn} />

      <Outlet />
      {isOpen && (
        <ContextMenu menus={menus} position={position} onClose={closeMenu} />
      )}
      <button onClick={menuHandler}>테스트버튼</button>
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
