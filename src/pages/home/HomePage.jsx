import logo from "assets/commons/home-logo.png";
import intro_msg from "assets/intro-msg.png";
import rabbitBot from "assets/rabbit-bot.png";
import rabbit from "assets/rabbit-hand-up.png";
import StartButton from "commons/svgs/StartButton";
import {
	ANNOUNCE_URL,
	CHARACTER_INTRO_URL,
	LOBBY_URL,
	RANKING_URL,
	SERVICE_CENTER_URL,
	SIGN_IN_URL,
} from "constants/url";
import Profile from "pages/home/Profile";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { tokenReissueAPI } from "services/auth/auth";
import "styles/pages/home/HomePage.scss";
import { getAuthToken } from "utils/token";

const HomePage = () => {
	const { isSignIn } = useLoaderData();

	const navigate = useNavigate();

	const handleStartBtn = () => {
		navigate(LOBBY_URL);
	};

	return (
		<div className="home-page-container">
			<header className="home-page-header">
				<img src={logo} alt="logo" className="home-logo-img" />
				<nav className="home-page-nav-container">
					<Link to={ANNOUNCE_URL}>공지사항</Link>
					<Link to={RANKING_URL}>랭킹</Link>
					<Link to={CHARACTER_INTRO_URL}>캐릭터 소개</Link>
					<Link to={SERVICE_CENTER_URL}>고객센터</Link>
				</nav>
				{isSignIn ? (
					<Profile />
				) : (
					<Link to={SIGN_IN_URL} className="sign-in-btn">
						로그인
					</Link>
				)}
			</header>

			<div className="background-container">
				<img src={rabbit} alt="공원 위 토끼" className="left-background-img" />
				<img
					src={rabbitBot}
					alt="공원 위 토끼 봇"
					className="right-background-img"
				/>
				<img src={intro_msg} alt="게임 소개 글" className="intro-msg-img" />
			</div>

			<StartButton onClick={handleStartBtn} />
		</div>
	);
};

export default HomePage;

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
