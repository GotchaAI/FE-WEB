import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "styles/components/lobby/mypage/EditAvatar.scss";
import { CarrotAvatar } from "commons/svgs/characters/CarrotAvatar";
import { avatarBackgroundColorList } from "constants/avatarBackgroundColor";
import { MY_PAGE_URL } from "constants/url";
import CloseIcon from "commons/svgs/CloseIcon";

const COLOR_PALETTE = avatarBackgroundColorList;

export const EditAvatar = ({ onSelect }) => {
  const [selected, setSelected] = useState(COLOR_PALETTE[0]);
  const navigate = useNavigate();

  const handleChoose = (color) => {
    setSelected(color);
    if (onSelect) onSelect(color);
  };

  const handleClose = () => {
    navigate(MY_PAGE_URL);
  };

  return (
    <div className="edit-avatar-container">
      <button className="close-btn" onClick={handleClose}>
        <CloseIcon />
      </button>

      <div className="swatch-grid">
        {COLOR_PALETTE.map((color) => (
          <div
            key={`avatar-${color}`}
            className={`avatar-swatch ${
              selected === color ? "is-selected" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => handleChoose(color)}
          >
            <div className="swatch-icon">
              <CarrotAvatar />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
