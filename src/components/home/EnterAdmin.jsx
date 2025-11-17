import { AdminButton } from "commons/svgs/AdminButton";
import React from "react";
import { useNavigate } from "react-router-dom";
import "styles/components/home/EnterAdmin.scss";

export default function EnterAdmin() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      className="admin-button"
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label="관리자 페이지로 이동"
      title="관리자 페이지로 이동"
    >
      <AdminButton />
    </button>
  );
}
