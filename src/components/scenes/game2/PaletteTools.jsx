import { useState } from "react";
import "styles/components/scenes/game2/PaletteTools.scss";

const PALETTE_COLORS = [
  "#FFC371",
  "#FFA63D",
  "#FF7A00",
  "#7B4B18",
  "#FAFBEA",
  "#EBF788",
  "#AEE4FA",
  "#86C37F",
  "#FFFFFF",
  "#000000",
];

const PaletteTools = ({ onSelectColor }) => {
  const [activeColor, setActiveColor] = useState(PALETTE_COLORS[0]);

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
