import { useState } from "react";
import "styles/components/scenes/game2/PaletteTools.scss";

const PALETTE_COLORS = [
  "#FFC466",
  "#F6AA31",
  "#F2810F",
  "#7E5614",
  "#FBFFEC",
  "#E9FF9F",
  "#AAE8FF",
  "#89C881",
  "#FFFFFF",
  "#000000",
];

const PaletteTools = ({ onSelectColor }) => {
  const [activeColor, setActiveColor] = useState(PALETTE_COLORS[9]);

  const handleColorClick = (color) => {
    setActiveColor(color);
    if (onSelectColor) {
      onSelectColor(color);
    }
  };

  return (
    <div className="palette-tools-container">
      {PALETTE_COLORS.map((color, index) => (
        <button
          key={index}
          type="button"
          className={`palette-color ${activeColor === color ? "active" : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorClick(color)}
        />
      ))}
    </div>
  );
};

export default PaletteTools;
