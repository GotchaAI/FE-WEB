import intro_msg from "assets/intro-msg.png";
import rabbitBot from "assets/rabbit-bot.png";
import rabbit from "assets/rabbit-hand-up.png";
import StartButton from "commons/svgs/StartButton";
import { InformationContainer } from "components/home/InformationContainer";
import IntroduceCharacterPreview from "components/home/IntroduceCharacterPreview";
import { LOBBY_URL } from "constants/url";
import { useNavigate, useOutletContext } from "react-router-dom";
import { guestSignInAPI } from "services/auth/auth";
import { getUserInfoAPI } from "services/user/user";
import "styles/components/home/Home.scss";
import { getAuthToken } from "utils/token";
import { getUserInfo } from "utils/user";
import { RankingPreview } from "./RankingPreview";
const rankingData = [
  { username: "Player1", score: 1000 },
  { username: "Player2", score: 900 },
  { username: "Player3", score: 800 },
  { username: "Player4", score: 700 },
  { username: "Player5", score: 600 },
  { username: "Player6", score: 500 },
  { username: "Player7", score: 400 },
  { username: "Player8", score: 300 },
  { username: "Player9", score: 200 },
  { username: "Player10", score: 100 },
];
const Home = () => {
  const navigate = useNavigate();
  const { isSignIn } = useOutletContext();

  const handleStartBtn = async () => {
    if (isSignIn) navigate(LOBBY_URL);

    try {
      const res = await guestSignInAPI();
      const { setAccessToken } = getAuthToken();
      const accessToken = res.accessToken;
      const expireTime = res.expiredAt;

      // 토큰 저장
      setAccessToken(accessToken, expireTime);

      //유저 정보 저장
      const userInfo = await getUserInfoAPI();
      const { setProfile, setExperience } = getUserInfo();

      setProfile({
        email: userInfo.email,
        nickname: userInfo.nickname,
        role: userInfo.role,
        uuid: userInfo.uuid,
      });

      setExperience({
        level: userInfo.level,
        expInLevel: userInfo.expInLevel,
        expProgress: userInfo.expProgress,
        expToNextLevel: userInfo.expToNextLevel,
      });
      navigate(LOBBY_URL);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="home-container">
      <div className="home-top-container">
        <div className="background-container">
          <img
            src={rabbit}
            alt="공원 위 토끼"
            className="left-background-img"
          />
          <img
            src={rabbitBot}
            alt="공원 위 토끼 봇"
            className="right-background-img"
          />
          <img src={intro_msg} alt="게임 소개 글" className="intro-msg-img" />
        </div>
        <StartButton onClick={handleStartBtn} />
      </div>

      <div className="home-middle-container">
        <InformationContainer />
        <div className="preview-container">
          <RankingPreview rankingData={rankingData} />
          <IntroduceCharacterPreview />
        </div>
      </div>
    </div>
  );
};
export default Home;
