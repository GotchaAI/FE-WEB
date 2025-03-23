import { Client } from '@stomp/stompjs';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';

/**
 * useGameSocket 커스텀 훅
 *
 * 게임 웹소켓 서버에 연결
 * nickname과 roomId를 기반으로 초기 연결을 수행
 * 서버에 접속 정보를 publish
 * 연결 실패 시 5000ms 간격으로 재연결 시도
 */

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useGameSocket = ({ nickname, roomId }) => {
	const stompClientRef = useRef(null);

	useEffect(() => {
		const client = new Client({
			webSocketFactory: () => new SockJS(`${BASE_URL}/ws-connect`),
			reconnectDelay: 5000,
			debug: (str) => console.log('STOMP 핸드쉐이킹', str),
		});

		client.onConnect = () => {
			console.log('Connected!');

			// 초기 연결 알림 전송
			client.publish({
				destination: '/pub/connect',
				body: JSON.stringify({ nickname: nickname }),
			});

		}

		// stomp 에러 디버깅
		client.onStompError = (frame) => {
			console.log('STOMP 오류', frame);
		}

		// 웹소켓 연결
		client.activate();
		stompClientRef.current = client;

		return () => {
			// 웹소켓 해제
			client.deactivate();
		}
	}, [nickname, roomId]);

	return {};
};

export default useGameSocket;