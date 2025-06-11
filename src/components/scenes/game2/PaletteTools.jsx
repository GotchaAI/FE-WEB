import { useState } from "react";
import "styles/components/scenes/game2/PaletteTools.scss";

/**
 * PaletteTools 컴포넌트
 *
 * 게임2의 드로잉 화면에서 사용할 수 있는 색상 팔레트 UI를 제공합니다.
 * 사용자는 버튼을 클릭하여 원하는 색상을 선택할 수 있으며, 선택된 색상은
 * 현재 활성화된 색상으로 표시되고 외부로 전달됩니다.
 *
 * Props:
 * - onSelectColor: (color: string) => void
 *   사용자가 색상을 선택했을 때 상위 컴포넌트로 해당 색상(hex 코드)을 전달하는 콜백
 */

const PaletteTools = ({ onSelectColor }) => {
  // 현재 선택된 색상 상태 (기본값: 검정)
  const [activeColor, setActiveColor] = useState(PALETTE_COLORS[9]);

  // 색상 버튼 클릭 핸들러
  const handleColorClick = (color) => {
    setActiveColor(color); // 활성 색상 업데이트
    if (onSelectColor) {
      onSelectColor(color); // 상위로 선택 색상 전달
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
