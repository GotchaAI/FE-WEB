import intro_msg from "assets/intro-msg.png";
import rabbitBot from "assets/rabbit-bot.png";
import rabbit from "assets/rabbit-hand-up.png";
import StartButton from "commons/svgs/StartButton";
import { InformationContainer } from "components/home/InformationContainer";
import IntroduceCharacterPreview from "components/home/IntroduceCharacterPreview";
import { LOBBY_URL } from "constants/url";
import { useNavigate } from "react-router-dom";
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

  const handleStartBtn = () => {
    navigate(LOBBY_URL);
  };
  return (
    <div>
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
