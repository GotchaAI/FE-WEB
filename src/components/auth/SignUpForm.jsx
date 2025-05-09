import {
	EMAIL_CODE_EXPIRED,
	EMAIL_CODE_NOT_MACHTED,
	EMAIL_TOO_MANY_REQUEST_ERROR,
	NICKNAME_DUPLICATED,
} from "constants/errorCode";
import {
	EMAIL_CODE_EXPIRED_ERROR_MESSAGE,
	EMAIL_CODE_MISMATCH_ERROR_MESSAGE,
	EMAIL_CODE_VALIDATION_ERROR,
	EMAIL_DUPLICATED_ERROR_MESSAGE,
	EMAIL_TOO_MANY_REQUEST_ERROR_MESSAGE,
	EMAIL_VALIDATION_ERROR_MESSAGE,
	NICKNAME_DUPLICATED_ERROR_MESSAGE,
	NICKNAME_VAILDATION_ERROR_MESSAGE,
} from "constants/errorMessage";
import useCodeTimer from "hooks/auth/useCodeTimer";
import useSignUpForm from "hooks/auth/useSignUpForm";
import { useCallback, useState } from "react";
import { Form } from "react-router-dom";
import { sendEmailCodeAPI, verifyEmailCodeAPI } from "services/auth/auth";
import { checkNicknameDuplicateAPI } from "services/user/user";
import "styles/components/auth/SignUpForm.scss";
import { handleApiError } from "utils/apiError";
import { isValidEmail } from "utils/validation";

/**
 * SignUpForm 컴포넌트
 *
 * - 회원가입 입력 폼을 구성하고 회원가입 시 필요한 사용자 입력을 처리
 * - 닉네임, 비밀번호, 이메일 입력, 인증번호 입력, 회원가입 버튼 포함
 *
 * 주요 기능:
 * - 닉네임 중복 여부 확인 및 성공 시 확인 메시지 출력
 * - 이메일 형식 검증 및 인증번호 전송, 인증번호 입력 후 서버 확인
 * - 인증번호 전송 시 5분 유효시간 타이머 표시
 * - 인증 시간이 만료되면 만료 메시지 자동 출력
 * - 각 입력 항목에 대해 유효성 검사 및 에러 메시지 출력
 * - 입력값이 유효한 경우에만 회원가입 버튼 클릭 가능
 */

const SignUpForm = () => {
	const [isNicknameConfirmed, setIsNicknameConfirmed] = useState(false);
	const [isEmailCodeRequested, setIsEmailCodeRequested] = useState(false); // 인증요청 클릭 여부
	const [isEmailVerified, setIsEmailVerified] = useState(false); // 인증 성공 여부

	// 폼 검증 및 에러핸들링 훅
	const {
		nickname,
		email,
		emailCode,
		password,
		passwordCheck,
		handleNicknameChange,
		handlePasswordChange,
		handleConfirmPasswordChange,
		handleEmailChange,
		handleEmailCodeChange,
		nicknameError,
		passwordError,
		emailError,
		setNicknameError,
		setPasswordError,
		setEmailError,
		isValid,
	} = useSignUpForm({
		isNicknameConfirmed,
		setIsNicknameConfirmed,
		isEmailVerified,
		setIsEmailVerified,
	});

	// onExpire 넘길 시 항상 같은 참조를 유지하도록
	const handleExpire = useCallback(() => {
		setEmailError(EMAIL_CODE_EXPIRED_ERROR_MESSAGE);
	});

	// 인증번호 타이머 훅
	const {
		remainingTime,
		formattedTime,
		start: startTimer,
	} = useCodeTimer(300, handleExpire);

	// 닉네임 중복 체크 서비스 호출 및 에러처리
	const checkNicknameDuplicate = async () => {
		if (!nickname) return;

		try {
			await checkNicknameDuplicateAPI(nickname);
			setIsNicknameConfirmed(true);
		} catch (e) {
			handleApiError(e, {
				409: {
					[NICKNAME_DUPLICATED]: () =>
						setNicknameError(NICKNAME_DUPLICATED_ERROR_MESSAGE),
					default: () => setNicknameError(NICKNAME_DUPLICATED_ERROR_MESSAGE),
				},
				422: {
					default: () => setNicknameError(NICKNAME_VAILDATION_ERROR_MESSAGE),
				},
			});
		}
	};

	// 이메일 인증번호 전송 서비스 호출 및 에러처리
	const requestEmailCode = async () => {
		if (!isValidEmail(email)) return;
		try {
			await sendEmailCodeAPI(email);
			setIsEmailVerified(false);
			setEmailError("");
			setIsEmailCodeRequested(true);
			startTimer();
		} catch (e) {
			handleApiError(e, {
				409: {
					default: () => setEmailError(EMAIL_DUPLICATED_ERROR_MESSAGE),
				},
				422: {
					default: () => setEmailError(EMAIL_VALIDATION_ERROR_MESSAGE),
				},
				429: {
					[EMAIL_TOO_MANY_REQUEST_ERROR]: () =>
						setEmailError(EMAIL_TOO_MANY_REQUEST_ERROR_MESSAGE),
					default: () => setEmailError(EMAIL_TOO_MANY_REQUEST_ERROR_MESSAGE),
				},
			});
		}
	};

	// 인증번호 확인 서비스 호출 및 에러처리
	const confirmEmailCode = async () => {
		try {
			await verifyEmailCodeAPI(email, emailCode);
			setIsEmailVerified(true);
			setEmailError("");
		} catch (e) {
			handleApiError(e, {
				400: {
					[EMAIL_CODE_NOT_MACHTED]: () =>
						setEmailError(EMAIL_CODE_MISMATCH_ERROR_MESSAGE),
					[EMAIL_CODE_EXPIRED]: () =>
						setEmailError(EMAIL_CODE_EXPIRED_ERROR_MESSAGE),
					default: () => setEmailError(EMAIL_CODE_MISMATCH_ERROR_MESSAGE),
				},
				422: {
					default: () => setEmailError(EMAIL_CODE_VALIDATION_ERROR),
				},
			});
		}
	};

	// 회원가입 제출 전 로직
	const submitHandler = (e) => {
		if (nickname === "") setNicknameError("닉네임을 입력해주세요.");
		if (password === "") setPasswordError("비밀번호를 입력해주세요.");
		if (email === "") setEmailError("이메일을 입력해주세요.");
		if (!isValid) {
			e.preventDefault();
			return;
		}
	};

	return (
		<Form
			className="sign-up-form-container"
			method="post"
			onSubmit={submitHandler}
		>
			<div className="form-group">
				<label htmlFor="nickname">닉네임</label>
				<div className="input-with-button">
					<input
						placeholder="NAME"
						value={nickname}
						onChange={(e) => handleNicknameChange(e.target.value)}
						name="nickname"
					/>
					<button
						type="button"
						className="check-nickname-btn"
						onClick={checkNicknameDuplicate}
					>
						닉네임 중복 확인
					</button>
				</div>
				{nicknameError && (
					<span className="sign-up-error-message">{nicknameError}</span>
				)}
				{!nicknameError && isNicknameConfirmed && (
					<span className="sign-up-success-message">
						사용가능한 닉네임입니다!
					</span>
				)}
			</div>

			<div className="form-group">
				<label htmlFor="password">비밀번호</label>
				<input
					type="password"
					value={password}
					onChange={(e) => handlePasswordChange(e.target.value)}
					name="password"
					placeholder="********"
				/>

				<label htmlFor="passwordCheck">비밀번호 재입력</label>
				<input
					type="password"
					value={passwordCheck}
					onChange={(e) => handleConfirmPasswordChange(e.target.value)}
					name="passwordCheck"
					placeholder="********"
				/>

				{passwordError && (
					<span className="sign-up-error-message">{passwordError}</span>
				)}
			</div>

			<div className="form-group">
				<label htmlFor="email">이메일</label>
				<div className="input-with-button">
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => handleEmailChange(e.target.value)}
						name="email"
						readOnly={isEmailCodeRequested}
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

				<label htmlFor="emailCode">이메일 인증번호</label>
				<div className="input-with-button">
					<input
						type="text"
						placeholder={
							!isEmailCodeRequested || isEmailVerified
								? "인증번호"
								: "인증번호를 입력해주세요."
						}
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
					<span className="sign-up-error-message">{emailError}</span>
				)}

				{!emailError && isEmailVerified && (
					<span className="sign-up-success-message">
						이메일이 인증되었습니다.
					</span>
				)}

				{!emailError && isEmailCodeRequested && !isEmailVerified && (
					<span className="sign-up-success-message">
						인증번호가 전송되었습니다.
					</span>
				)}

				{isEmailCodeRequested && !isEmailVerified && remainingTime > 0 && (
					<span className="code-timer">{formattedTime}</span>
				)}
			</div>

			<button type="submit" className="sign-up-btn">
				회원가입
			</button>
		</Form>
	);
};

export default SignUpForm;
