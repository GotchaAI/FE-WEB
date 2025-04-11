import { ROOT_URL } from "constants/url";
import { Outlet, redirect } from "react-router-dom";
import { tokenReissueAPI } from "services/auth/auth";
import { testAPI } from "services/test";
import { getAuthToken } from "utils/token";

const LobbyLayout = () => {
  const go = async () => {
    try {
      const res = await testAPI();
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="robby-layout-container">
      <Outlet />

      <button onClick={go}>ddd</button>
    </div>
  );
};

export default LobbyLayout;

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
      return redirect(ROOT_URL);
    }
  }

  return;
};
