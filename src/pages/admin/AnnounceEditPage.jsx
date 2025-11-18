import CloseButton from "commons/ui/button/CloseButton";
import { useNavigate, useParams } from "react-router-dom";
import "styles/pages/admin/AnnounceEditPage.scss";
import { useEffect, useState } from "react";
import { getAnnounceDetailAPI } from "services/home/announce";
import useUserInformationStore from "store/userInformation";
import { updateAnnounceAPI } from "services/admin/admin";
import { ADMIN_ANNOUNCE_URL } from "constants/url";

const AnnounceEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const profile = useUserInformationStore((state) => state.profile);
  const isAdminMode =
    profile?.role === "ADMIN" && window.location.pathname.includes("admin");

  const closeEditPage = () => navigate(-1);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getAnnounceDetailAPI(id);
        setTitle(res.title);
        setContent(res.content);
      } catch (err) {
        alert("공지사항 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const notificationInfo = { id, title, content };
      await updateAnnounceAPI(notificationInfo);
      navigate(`${ADMIN_ANNOUNCE_URL}/${id}`);
    } catch (err) {
      console.log(err);
      alert("공지 수정에 실패했습니다.");
    }
  };

  if (!isAdminMode) return <div>권한이 없습니다.</div>;
  if (loading) return <div className="announce-edit-loading">로딩 중...</div>;

  return (
    <div className="announce-edit-page-container">
      <article className="announce-edit-container">
        <header className="announce-edit-header">
          <CloseButton onClick={closeEditPage} />
        </header>

        <div className="announce-edit-content">
          <div className="content-title">
            <input
              type="text"
              className="edit-title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="공지 제목을 입력하세요"
            />
          </div>

          <textarea
            className="edit-content-input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="공지 내용을 입력하세요"
          />

          <button className="save-button" onClick={handleSubmit}>
            수정 완료
          </button>
        </div>
      </article>
    </div>
  );
};

export default AnnounceEditPage;
