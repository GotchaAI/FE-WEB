import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postQnAAPI } from "services/home/serviceCenter";
import "styles/pages/home/ServicePostPage.scss";

const ServicePostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const onSubmit = async () => {
    if (title.trim() === "") {
      titleRef.current.focus();
      return;
    }

    if (content.trim() === "") {
      contentRef.current.focus();
      return;
    }

    try {
      await postQnAAPI(title, content);
      navigate("/service-center");
    } catch (err) {
      alert("등록 실패");
    }
  };

  const closeDetailPage = () => navigate(-1);

  return (
    <div className="qna-post-container">
      <div className="qna-post-top">
        <h1 className="qna-post-title">나도 문의하기</h1>
      </div>

      <article className="qna-post-create-container">
        <div className="title-box">
          <input
            ref={titleRef}
            className="title-input"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="content-box">
          <textarea
            ref={contentRef}
            className="content-textarea"
            placeholder="문의 내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="qna-post-create-footer">
          <button className="btn-exit" onClick={closeDetailPage}>
            나가기
          </button>

          <button className="btn-submit" onClick={onSubmit}>
            문의 등록
          </button>
        </div>
      </article>
    </div>
  );
};

export default ServicePostPage;
