import useSignUpForm from "hooks/auth/useSignUpForm";
import { useState } from "react";
import { Form } from "react-router-dom";
import { sendEmailCodeAPI, verifyEmailCodeAPI } from "services/auth/auth";
import { checkNicknameDuplicateAPI } from "services/user/user";
import "styles/components/auth/SignUpForm.scss";
import { handleApiError } from "utils/apiError";

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
	const {
		nickname,
		email,
		emailCode,
		password,
		confirmPassword,
		handleNicknameChange,
		handlePasswordChange,
		handleConfirmPasswordChange,
		handleEmailChange,
		handleEmailCodeChange,
		nicknameError,
		passwordError,
		emailError,
	} = useSignUpForm();

	const [isNicknameConfirmed, setIsNicknameConfirmed] = useState(false);
	const [isEmailCodeRequested, setIsEmailCodeRequested] = useState(false); // 인증요청 클릭 여부
	const [isEmailVerified, setIsEmailVerified] = useState(false); // 인증 성공 여부

	const checkNicknameDuplicate = async () => {
		if (!nickname) return;

		try {
			const res = await checkNicknameDuplicateAPI(nickname);
			alert(res.message);
			setIsNicknameConfirmed(true);
		} catch (e) {
			handleApiError(e, {
				409: () => alert("이미 사용 중인 닉네임입니다."),
				422: () => alert("닉네임 형식이 잘못되었습니다."),
			});
		}
	};

	const requestEmailCode = async () => {
		try {
			const res = await sendEmailCodeAPI(email);
			alert(res.message);
			setIsEmailCodeRequested(true);
		} catch (e) {
			handleApiError(e, {
				404: () => alert("이미 가입된 이메일입니다."),
				422: () => alert("이메일 형식이 잘못되었거나 누락되었습니다."),
				429: () => alert("잠시 후 다시 요청해주세요. (1분 제한)"),
			});
		}
	};

	const confirmEmailCode = async () => {
		try {
			const res = await verifyEmailCodeAPI(email, emailCode);
			alert(res.message);
			setIsEmailVerified(true);
		} catch (e) {
			handleApiError(e, {
				400: () => alert("인증번호가 일치하지 않습니다."),
				422: () => alert("이메일과 인증번호는 모두 필수입니다."),
			});
		}
	};

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
						onChange={(e) => handleNicknameChange(e.target.value)}
						name="nickname"
						disabled={isNicknameConfirmed}
					/>
					<button
						type="button"
						className="check-nickname-btn"
						onClick={checkNicknameDuplicate}
						disabled={isNicknameConfirmed}
					>
						닉네임 중복 확인
					</button>
				</div>
				{nicknameError && (
					<div className="sign-up-error-message">{nicknameError}</div>
				)}
			</div>

			<div className="form-group">
				<label>비밀번호</label>
				<input
					type="password"
					value={password}
					onChange={(e) => handlePasswordChange(e.target.value)}
					name="password"
					placeholder="********"
				/>

				<label>비밀번호 재입력</label>
				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => handleConfirmPasswordChange(e.target.value)}
					name="confirmPassword"
					placeholder="********"
				/>

				{passwordError && (
					<div className="sign-up-error-message">{passwordError}</div>
				)}
			</div>

			<div className="form-group">
				<label>이메일</label>
				<div className="input-with-button">
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => handleEmailChange(e.target.value)}
						name="email"
						disabled={isEmailVerified}
					/>
					<button
						type="button"
						className="request-code-btn"
						onClick={requestEmailCode}
						disabled={isEmailVerified}
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
						onChange={(e) => handleEmailCodeChange(e.target.value)}
						name="emailCode"
						disabled={!isEmailCodeRequested || isEmailVerified}
					/>
					<button
						type="button"
						className="verify-code-btn"
						onClick={confirmEmailCode}
						disabled={!isEmailCodeRequested || isEmailVerified}
					>
						인증번호 확인
					</button>
				</div>

				{emailError && (
					<div className="sign-up-error-message">{emailError}</div>
				)}
			</div>

			<button type="submit" className="sign-up-btn">
				회원가입
			</button>
		</Form>
	);
};

export default SignUpForm;
