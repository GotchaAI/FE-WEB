import { AdminButton } from "commons/svgs/AdminButton";
import { ADMIN_URL } from "constants/url";
import React from "react";
import { useNavigate } from "react-router-dom";
import "styles/components/home/EnterAdmin.scss";

export const EnterAdmin = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ADMIN_URL);
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
    >
      <AdminButton />
    </button>
  );
};
