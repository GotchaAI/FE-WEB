import { useCallback, useEffect, useState } from "react";
import {
  acceptFriendRequestAPI,
  addFriendAPI,
  deleteFriendAPI,
  getFriendsListAPI,
  getFriendsRequsetListAPI,
  rejectFriendRequestAPI,
} from "services/friend/friend";
import { useGameSocketStore } from "store/socket";

// TODO: 에러핸들링 보완

const useFriendSocket = ({ userUuid }) => {
  const { stompClient, isConnected } = useGameSocketStore();

  const [friendActionType, setFriendActionType] = useState("list"); // list:친구 목록, request:친구 신청
  const [friendList, setFriendList] = useState([]); // 친구 목록
  const [friendRequestList, setFriendRequestList] = useState([]); // 친구 신청 목록

  // 친구 목록 요청
  const fetchFriendList = useCallback(async () => {
    try {
      const list = await getFriendsListAPI();
      setFriendList(list);
    } catch (error) {
      console.error("친구 목록 불러오기 실패:", error);
    }
  }, []);

  // 친구 신청 목록 요청
  const fetchFriendRequestList = useCallback(async () => {
    try {
      const list = await getFriendsRequsetListAPI();
      setFriendRequestList(list);
    } catch (error) {
      console.error("친구 신청 목록 불러오기 실패:", error);
    }
  }, []);

  // 친구 신청
  const addFriend = async (nickname) => {
    try {
      await addFriendAPI(nickname);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  // 친구 수락
  const acceptFriendRequest = async (id) => {
    try {
      await acceptFriendRequestAPI(id);
      await fetchFriendRequestList(); // 수락하고 친구 신청 목록 패치
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  // 친구 거절
  const rejectFriendRequest = async (id) => {
    try {
      await rejectFriendRequestAPI(id);
      await fetchFriendRequestList(); // 거절하고 친구 신청 목록 패치
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  // 친구 삭제
  const deleteFriendRequest = async (uuid) => {
    try {
      await deleteFriendAPI(uuid);
      await fetchFriendList(); // 삭제하고 친구 목록 패치
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  // 친구 목록/ 친구 신청 TOGGLE 시 데이터 요청
  useEffect(() => {
    if (friendActionType === "list") fetchFriendList();
    else if (friendActionType === "request") fetchFriendRequestList();
  }, [friendActionType, fetchFriendList, fetchFriendRequestList]);

  useEffect(() => {
    if (!isConnected || !userUuid) return;

    const friendEventSub = stompClient.subscribe(
      `/sub/friend/${userUuid}`,
      (message) => {
        const { type, data } = JSON.parse(message.body);

        setFriendList((prev) => {
          switch (type) {
            case "ONLINE":
              return prev.map((f) =>
                f.uuid === data ? { ...f, online: true } : f
              );
            case "REQUEST":
              fetchFriendRequestList(); // 친구 신청 목록 패치
              return prev;
            case "REJECT":
              // TODO: 이땐 뭐 어카지
              return prev;
            case "ACCEPT":
              fetchFriendList(); // 친구 목록 패치
              return prev;
            case "DELETE":
              fetchFriendList(); // 친구 목록 패치
              return prev;
            default:
              return prev;
          }
        });
      }
    );

    return () => {
      friendEventSub.unsubscribe();
    };
  }, [userUuid, fetchFriendList, isConnected, stompClient]);

  return {
    friendList,
    friendRequestList,
    friendActionType,
    setFriendActionType,
    addFriend,
    acceptFriendRequest,
    deleteFriendRequest,
    rejectFriendRequest,
  };
};

export default useFriendSocket;
