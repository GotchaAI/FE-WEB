import { useEffect, useState } from "react";
import "styles/components/home/InformationContainer.scss";

export const InformationContainer = () => {
  const [data, setData] = useState([]);
  const [navType, setNavType] = useState("notice"); // 상태로 관리
  useEffect(() => {
    if (navType === "notice") {
      // 공지사항 더미 데이터
      setData([
        { title: "상대방에게 욕설, 비난이 담긴 채팅 신고", date: "2025.06.21" },
        { title: "2025. 07. 21 업데이트 안내", date: "2025.06.21" },
        { title: "AI 업그레이드 안내", date: "2025.06.21" },
        { title: "2026. 08. 21 점검 안내", date: "2025.06.21" },
        { title: "상대방에게 욕설, 비난이 담긴 채팅 신고", date: "2025.06.21" },
      ]);
    } else if (navType === "help") {
      // 고객센터 더미 데이터
      setData([
        {
          title: "게임이 실행되지 않아요0",
          date: "2025.06.21",
          answered: true,
        },
        {
          title: "게임이 실행되지 않아요1",
          date: "2025.06.21",
          answered: false,
        },
        {
          title: "게임이 실행되지 않아요2",
          date: "2025.06.21",
          answered: true,
        },
        {
          title: "게임이 실행되지 않아요3",
          date: "2025.06.21",
          answered: false,
        },
        {
          title: "게임이 실행되지 않아요4",
          date: "2025.06.21",
          answered: true,
        },
      ]);
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
              <span className="title">{item.title}</span>
              <span className="date">{item.date}</span>
            </li>
          ))
        ) : (
          <h2>공지사항이 존재하지 않습니다.</h2>
        )}
      </ul>
    </div>
  );
};
