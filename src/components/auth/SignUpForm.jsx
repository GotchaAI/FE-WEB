import { useState } from "react";
import { Form } from "react-router-dom";
import "styles/components/auth/SignUpForm.scss";

/**
 * SignUpForm 컴포넌트
 *
 * - 회원가입 입력 폼을 구성하고 회원가입 시 필요한 사용자 입력을 처리
 * - 닉네임, 비밀번호, 이메일 입력, 인증번호 입력, 회원가입 버튼 포함
 *
 * props:
 * @param {string} errorMessage - 회원가입 실패 시 출력할 에러 메시지
 *
 * 주요 기능:
 */

const SignUpForm = ({ errorMessage }) => {
	const [nickname, setNickname] = useState("");
	const [email, setEmail] = useState("");
	const [emailCode, setEmailCode] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// 로그인 제출 전 로직
	const submitHandler = (e) => {};

	return (
		<Form
			className="sign-up-form-container"
			method="post"
			onSubmit={submitHandler}
		>
			<div className="form-group">
				<label>닉네임</label>
				<div className="input-with-button">
					<input
						placeholder="NAME"
						value={nickname}
						// onChange={(e) => setNickname(e.target.value)}
						name="nickname"
					/>
					<button
						type="button"
						className="check-nickname-btn"
						// onClick={checkNicknameDuplicate}
					>
						닉네임 중복 확인
					</button>
				</div>
			</div>

			<div className="form-group">
				<label>비밀번호</label>
				<input
					type="password"
					value={password}
					// onChange={(e) => setPassword(e.target.value)}
					name="password"
					placeholder="********"
				/>

				<label>비밀번호 재입력</label>
				<input
					type="password"
					value={confirmPassword}
					// onChange={(e) => setConfirmPassword(e.target.value)}
					name="confirmPassword"
					placeholder="********"
				/>
			</div>

			<div className="form-group">
				<label>이메일</label>
				<div className="input-with-button">
					<input
						type="email"
						placeholder="Email"
						value={email}
						// onChange={(e) => setEmail(e.target.value)}
						name="email"
					/>
					<button
						type="button"
						className="request-code-btn"
						// onClick={requestEmailCode}
					>
						인증번호 요청
					</button>
				</div>

				<label>이메일 인증번호</label>
				<div className="input-with-button">
					<input
						type="text"
						placeholder="인증번호를 입력해주세요."
						value={emailCode}
						// onChange={(e) => setEmailCode(e.target.value)}
						name="emailCode"
					/>
					<button
						type="button"
						className="verify-code-btn"
						// onClick={confirmEmailCode}
					>
						인증번호 확인
					</button>
				</div>
			</div>

			<button type="submit" className="sign-up-btn">
				회원가입
			</button>
		</Form>
	);
};

export default SignUpForm;
