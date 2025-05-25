import { HomeHeader } from "components/home/HomeHeader";
import { tokenReissueAPI } from "services/auth/auth";
import { getAuthToken } from "utils/token";

const IntroducePage = () => {
  return (
    <div className="introduce-page-container">
      <div className="home-fixed-section">
        <HomeHeader></HomeHeader>
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
