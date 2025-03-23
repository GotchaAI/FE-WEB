import { Client } from '@stomp/stompjs';
import { useEffect } from 'react';
import SockJS from 'sockjs-client';

const useSocket = ({ nickname, roomId }) => {
	const stompClientRef = useRef(null);

	useEffect(() => {
		const client = new Client({
			webSocketFactory: () => new SockJS('***REMOVED***/ws-connect'),
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
	}, [username, roomId]);

	return {};
};

export default useSocket;