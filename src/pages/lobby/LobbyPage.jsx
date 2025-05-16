import springImg from "assets/commons/spring.png";
import LobbyChatting from "components/lobby/LobbyChatting";
import LobbyHeader from "components/lobby/LobbyHeader";
import Friend from "components/lobby/friend/Friend";
import { GAME1_ROBBY_URL, GAME2_ROBBY_URL, ROOT_URL } from "constants/url";
import useGameSocket from "hooks/useGameSocket";
import { Link, Outlet, redirect, useLocation } from "react-router-dom";
import { tokenReissueAPI } from "services/auth/auth";
import { useModalStore } from "store/modal";
import "styles/pages/lobby/LobbyPage.scss";
import { getAuthToken } from "utils/token";

const LobbyPage = () => {
	// 소켓 연결 테스트(지워도 됨!)
	const nickName = "jiwon";
	const roomId = "1234";
	useGameSocket({ nickName, roomId });
	const location = useLocation();

	const navType = location.pathname.endsWith("/game2") ? "game2" : "game1";

	const handleClick = () => {
		// useModalStore.getState().openModal(
		// 	// "confirm",
		// 	// { message: "정말 삭제하시겠어요?" },
		// 	"alert",
		// 	{
		// 		message: "신고가 완료되었습니다.",
		// 	},
		// 	() => {
		// 		// 확인 버튼 눌렀을 때
		// 		console.log("삭제!");
		// 	},
		// 	() => {
		// 		// 취소 눌렀을 때
		// 		console.log("취소!");
		// 	}
		// );
		// useModalStore.getState().openModal(
		// 	"codeInput",
		// 	{
		// 		title: "코드 입력",
		// 	},
		// 	(code) => {
		// 		console.log("입력된 코드:", code); // 여기서 처리 가능
		// 	}
		// );
		useModalStore.getState().openModal(
			"roomEnter",
			{
				roomType: "묘묘를 속여라!",
				hostName: "엉덩이탐정",
				roomName: "성인만/19/여기 보통 뭐적지?/19시출",
			},
			(password) => {
				console.log("입력한 비밀번호:", password);
				// API 호출 or 검증 처리
			}
		);
	};

	return (
		<div className="lobby-page-container">
			<LobbyHeader />
			<div className="body-container">
				<Friend />
				<div className="main-content-container">
					<img src={springImg} alt="스프링" />
					<div className="main-content-nav-container">
						<Link
							to={GAME1_ROBBY_URL}
							className={`a-btn ${navType === "game1" ? "active" : ""}`}
						>
							A
						</Link>
						<Link
							to={GAME2_ROBBY_URL}
							className={`b-btn ${navType === "game2" ? "active" : ""}`}
						>
							B
						</Link>
					</div>
					<div className="main-content-layout">
						{/* 상태나 라우팅에 따라 WaitingRoom or Mypage로 */}
						<Outlet />
					</div>
				</div>

				<div className="lobby-chat-container">
					<LobbyChatting />
				</div>
			</div>

			<button onClick={handleClick}>asdf</button>
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
