import art_table from "assets/components/scenes/game2/art-table.png";
import midae_rabbit from "assets/components/scenes/game2/midae-rabbit5.png";
import "styles/components/scenes/game2/DrawingDescription.scss";

const DrawingDescription = ({ gameData, onOk }) => {
  const description = gameData?.description || `설명을 불러오는 중입니다...`;

  const onCancel = () => {
    console.log("이딴걸 그리라고?");
  };

  return (
    <div className="drawing-description-container">
      {/* 설명 박스 */}
      <div className="description-box">{description}</div>

      {/* 버튼 박스 */}
      <div className="button-box">
        <button className="ok-btn" onClick={onOk}>
          오케이
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          네?
        </button>
      </div>

      <img src={art_table} alt="Art Table" className="art-table-img" />
      <img src={midae_rabbit} alt="Art Table" className="rabbit-img" />
    </div>
  );
};

export default DrawingDescription;
