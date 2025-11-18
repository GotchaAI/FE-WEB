import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAnnounceAPI } from "services/admin/admin";
import "styles/pages/admin/CreateAnnouncePage.scss";

export const CreateAnnouncePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!title || !content) {
      return;
    }
    const notification = { title, content };
    try {
      await postAnnounceAPI(notification);
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="announce-create-container">
      <input
        className="announce-create-title"
        type="text"
        placeholder="공지사항 제목 입력"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="announce-create-content"
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="announce-submit" onClick={handleSubmit}>
        등록
      </button>
    </div>
  );
};
