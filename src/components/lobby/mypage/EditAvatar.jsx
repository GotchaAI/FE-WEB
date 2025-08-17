import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "commons/svgs/XIcon";
import "styles/components/lobby/mypage/EditAvatar.scss";
import { CarrotAvatar } from "commons/svgs/characters/CarrotAvatar";
import { avatarBackgroundColorList } from "constants/avatarBackgroundColor";

const COLOR_PALETTE = avatarBackgroundColorList;

export const EditAvatar = ({ onSelect }) => {
  const [selected, setSelected] = useState(COLOR_PALETTE[0]);
  const navigate = useNavigate();

  const handleChoose = (color) => {
    setSelected(color);
    if (onSelect) onSelect(color);
  };

  const handleClose = () => {
    navigate("/lobby/myinfo");
  };

  return (
    <div className="edit-avatar-container">
      <button className="close-btn" onClick={handleClose}>
        <CloseIcon />
      </button>

      <div className="swatch-grid">
        {COLOR_PALETTE.map((color) => (
          <div
            key={color}
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
