import { ADMIN_ANNOUNCE_URL } from "constants/url";
import { Link, useNavigate } from "react-router-dom";
import { eraseNotification } from "services/admin/admin";
import "styles/components/admin/AnnounceManageBar.scss";

export const AnnounceManageBar = ({ notificationId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await eraseNotification(notificationId);
      navigate(ADMIN_ANNOUNCE_URL);
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  return (
    <div className="announce-manage-button-bar">
      <Link
        to={`${ADMIN_ANNOUNCE_URL}/${notificationId}/edit`}
        className="button--edit"
      >
        수정
      </Link>
      <button className="button--delete" onClick={handleDelete}>
        삭제
      </button>
    </div>
  );
};
