import useGameSocket from "hooks/useGameSocket";

const LobbyPage = () => {
  // 소켓 연결 테스트(지워도 됨!)
  const nickName = "jiwon";
  const roomId = "1234";

  useGameSocket({ nickName, roomId });

  return <div className="robby-page-container">lobby</div>;
};

export default LobbyPage;
