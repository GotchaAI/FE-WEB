import { tokenReissueAPI } from "services/auth/auth";
import "styles/pages/home/HomeLayout.scss";
import { getAuthToken } from "utils/token";
import HomePage from "./HomePage";

const HomeLayout = () => {
  return (
    <div className="home-layout-container">
      <HomePage />
    </div>
  );
};

export default HomeLayout;

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
