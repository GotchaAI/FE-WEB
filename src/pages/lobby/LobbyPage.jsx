import Lobby from "components/lobby/Lobby";
import { ROOT_URL } from "constants/url";
import useGameSocket from "hooks/useGameSocket";
import { redirect } from "react-router-dom";
import { tokenReissueAPI } from "services/auth/auth";
import "styles/pages/lobby/LobbyPage.scss";
import { getAuthToken } from "utils/token";

const LobbyPage = () => {
  // 소켓 연결 테스트(지워도 됨!)
  const nickName = "jiwon";
  const roomId = "1234";

  useGameSocket({ nickName, roomId });

  return (
    <div className="lobby-page-container">
      <Lobby />
    </div>
  );
};

export default LobbyPage;

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
