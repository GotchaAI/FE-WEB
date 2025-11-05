import AnnounceBear from "commons/svgs/AnnounceBear";
import CloseButton from "commons/ui/button/CloseButton";
import { useNavigate } from "react-router-dom";
import "styles/pages/home/AnnounceDetailPage.scss";
import { formatDate } from "utils/time";

const mockAnnounce = {
  id: 1,
  title: "서버 점검 및 업데이트",
  createdAt: "2025-03-27T16:13:32",
  content: `
    어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌
    asdfasfasfd a sdfa asdfa asdf assdfasdvasdvas
    어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌
    asdfasfasfd a sdfa asdfa asdf assdfasdvasdvas
    어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌
    asdfasfasfd a sdfa asdfa asdf assdfasdvasdvas
  `,
  modifiedAt: "2025-11-16T16:13:32",
  writer: "묘묘",
};

const AnnounceDetailPage = () => {
  const naviate = useNavigate();

  const closeDetailpage = () => {
    naviate(-1);
  };

  return (
    <div className="announce-detail-page-container">
      <h1 className="announce-detail-title">공지사항</h1>
      <article className="announce-detail-container">
        <header className="announce-detail-header">
          <span className="meta-date">
            {formatDate(mockAnnounce.createdAt)}
          </span>
          <CloseButton onClick={closeDetailpage} />
        </header>
        <div className="announce-detail-content">
          <div className="content-title">
            <AnnounceBear />
            {mockAnnounce.title}
          </div>
          <div className="content-description">{mockAnnounce.content}</div>
        </div>
      </article>
    </div>
  );
};

export default AnnounceDetailPage;
