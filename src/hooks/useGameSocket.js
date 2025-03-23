import { Client } from '@stomp/stompjs';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';

/**
 * useGameSocket 커스텀 훅
 *
 * 게임 웹소켓 서버에 연결
 * nickName과 roomId를 기반으로 초기 연결을 수행
 * 서버에 접속 정보를 publish
 * 연결 실패 시 5000ms 간격으로 재연결 시도
 */

const SOCKET_BASE_URL = process.env.REACT_APP_SOCKET_BASE_URL;

const useGameSocket = ({ nickName, roomId }) => {
	const stompClientRef = useRef(null);

	useEffect(() => {
		const client = new Client({
			webSocketFactory: () => new SockJS(`${SOCKET_BASE_URL}${process.env.REACT_APP_WS_ENDPOINT}`),
			reconnectDelay: 5000,
			debug: (str) => console.log('STOMP 핸드쉐이킹', str),
		});

		client.onConnect = () => {
			console.log('Connected!');

			// 초기 연결 알림 전송
			client.publish({
				destination: '/pub/connect',
				body: JSON.stringify({ nickName: nickName }),
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
	}, [nickName, roomId]);

	return {};
};

export default useGameSocket;