import { ANNOUNCE_URL, SERVICE_CENTER_URL } from "constants/url";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAnnounceListAPI } from "services/home/announce";
import { getQnAListAPI } from "services/home/serviceCenter";
import "styles/components/home/InformationContainer.scss";
import { formatDate } from "utils/time";

export const InformationContainer = () => {
  const [data, setData] = useState([]);
  const [navType, setNavType] = useState("notice"); // 상태로 관리

  const fetchNotices = async (page = 1, sort = "DATE_DESC", type = "") => {
    try {
      const res = await getAnnounceListAPI({
        keyword: "",
        page: page - 1, // 서버는 0부터 시작
        sort,
        type: type,
      });

      if (res?.content && res.content.length > 0) {
        setData(res.content.slice(0, 5));
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("공지사항 조회 에러");
    }
  };

  const fetchQnAList = async (keyword = "", page = 1, sort = "DATE_DESC") => {
    try {
      let res;

      res = await getQnAListAPI({
        keyword,
        page: page - 1,
        sort,
      });

      if (res?.content && res.content.length > 0) {
        setData(res.content.slice(0, 5));
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("문의목록 조회 에러");
    }
  };

  useEffect(() => {
    if (navType === "notice") {
      fetchNotices();
    } else if (navType === "help") {
      fetchQnAList();
    }
  }, [navType]);
  return (
    <div className="information-container">
      <div className="information-type-container">
        <button
          className={`information-type-button ${
            navType === "notice" ? "active" : ""
          }`}
          onClick={() => setNavType("notice")}
        >
          공지사항
        </button>
        <button
          className={`information-type-button ${
            navType === "help" ? "active" : ""
          }`}
          onClick={() => setNavType("help")}
        >
          고객센터
        </button>
      </div>
      <ul className="information-content-layout">
        {data && data.length > 0 ? (
          data.map((item, idx) => (
            <li key={`${item.title}-${idx}`} className="info-item">
              {navType === "help" &&
                (item.answered ? (
                  <span className="answer-done">답변완료</span>
                ) : (
                  <span className="answer-wait">답변대기</span>
                ))}
              {navType === "help" ? (
                <Link
                  className="title"
                  to={`${SERVICE_CENTER_URL}/${item.inquiryId}`}
                >
                  {item.title}
                </Link>
              ) : (
                <Link
                  className="title"
                  to={`${ANNOUNCE_URL}/${item.notificationId}`}
                >
                  {item.title}
                </Link>
              )}
              <span className="date">{formatDate(item.createdAt)}</span>
            </li>
          ))
        ) : (
          <h2>게시글이 존재하지 않습니다.</h2>
        )}
      </ul>
    </div>
  );
};
