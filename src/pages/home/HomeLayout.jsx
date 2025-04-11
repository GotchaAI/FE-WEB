import { Outlet } from "react-router-dom";
import { tokenReissueAPI } from "services/auth/auth";
import { getAuthToken } from "utils/token";

const HomeLayout = () => {
  return (
    <div className="home-layout-container">
      <Outlet />
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
    }
  }
};
