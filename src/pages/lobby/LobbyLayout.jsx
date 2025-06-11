import useGameSocket from "hooks/useGameSocket";
import { Outlet } from "react-router-dom";
import { tokenReissueAPI } from "services/auth/auth";
import "styles/pages/lobby/LobbyPage.scss";
import { getAuthToken } from "utils/token";
import { getUserUuid } from "utils/user";

const LobbyLayout = () => {
  const userUuid = getUserUuid();
  useGameSocket({ userUuid }); // 소켓 연결

  return (
    <div className="lobby-layout-container">
      <Outlet />
    </div>
  );
};

export default LobbyLayout;

export const loader = async () => {
  const { accessToken, setAccessToken } = getAuthToken();
  console.log("at없음1", accessToken);
  if (!accessToken) {
    // 토큰 재발급
    try {
      const res = await tokenReissueAPI();
      const newAccessToken = res.accessToken;
      const newExpireTime = res.expiredAt;

      setAccessToken(newAccessToken, newExpireTime);
    } catch (e) {
      console.log("at없음", accessToken);
      console.error("음", e);
      return;
    }
  }

  return;
};
