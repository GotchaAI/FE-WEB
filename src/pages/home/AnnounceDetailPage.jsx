import CloseButton from "commons/ui/button/CloseButton";
import { useNavigate } from "react-router-dom";
import "styles/pages/home/AnnounceDetailPage.scss";

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
          <span className="meta-date">2025.07.21</span>
          <CloseButton onClick={closeDetailpage} />
        </header>
        <div className="announce-detail-content">
          <div className="content-title">서버 점검 및 업데이트</div>
          <div className="content-description">
            어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌 asdfasfasfd a sdfa asdfa
            asdf assdfasdvasdvas 어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌
            asdfasfasfd a sdfa asdfa asdf assdfasdvasdvas
            어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌 asdfasfasfd a sdfa asdfa
            asdf assdfasdvasdvas 어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌
            asdfasfasfd a sdfa asdfa asdf assdfasdvasdvas
            어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌 asdfasfasfd a sdfa asdfa
            asdf assdfasdvasdvas 어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌
            asdfasfasfd a sdfa asdfa asdf assdfasdvasdvas
          </div>
        </div>
      </article>
    </div>
  );
};

export default AnnounceDetailPage;
