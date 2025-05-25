import "styles/components/home/InformationContainer.scss";

export const InformationContainer = ({ data, navType }) => {
  return (
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
  );
};
