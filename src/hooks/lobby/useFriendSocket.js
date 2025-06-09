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

const useFriendSocket = ({ userUuid }) => {
  const { stompClient, isConnected } = useGameSocketStore();
  const [friendActionType, setFriendActionType] = useState("list");
  const [friendList, setFriendList] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);

  const fetchFriendList = useCallback(async () => {
    try {
      const list = await getFriendsListAPI();
      setFriendList(list);
    } catch (error) {
      console.error("친구 목록 불러오기 실패:", error);
    }
  }, []);

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
      await fetchFriendRequestList();
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
      await fetchFriendRequestList();
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
      await fetchFriendList();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  useEffect(() => {
    if (friendActionType === "list") fetchFriendList();
    else if (friendActionType === "request") fetchFriendRequestList();
  }, [friendActionType, fetchFriendList, fetchFriendRequestList]);

  useEffect(() => {
    if (!isConnected || !userUuid) return;

    const friendEventSub = stompClient.subscribe(
      `/sub/friend/${userUuid}`,
      (message) => {
        const { eventType, data } = JSON.parse(message.body);
        console.log(eventType);
        console.log(data);
        setFriendList((prev) => {
          switch (eventType) {
            case "ONLINE":
              return prev.map((f) =>
                f.uuid === data ? { ...f, online: true } : f
              );
            case "REQUEST":
            case "REJECT":
            case "ACCEPT":
              fetchFriendList();
              break;
            case "DELETE":
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
