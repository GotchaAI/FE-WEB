import { useCallback, useEffect, useState } from "react";
import {
  getFriendsListAPI,
  getFriendsRequsetListAPI,
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
  };
};

export default useFriendSocket;
