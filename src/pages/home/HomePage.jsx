import ScrollToTop from "components/common/ScrollToTop";
import { HomeHeader } from "components/home/HomeHeader";
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

  return (
    <div className="home-page-container">
      <ScrollToTop />
      <HomeHeader isSignIn={isSignIn} />
      <Outlet />
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
