import art_table from "assets/components/scenes/game2/art-table.png";
import midae_rabbit from "assets/components/scenes/game2/midae-rabbit5.png";
import "styles/components/scenes/game2/DrawingDescription.scss";

const DrawingDescription = () => {
  const description = `어둠이 숨을 죽이고 있을 때,
하늘에 누군가의 기분이 터지는 걸 보았어..
반짝임이 너무 빨라서 눈이 따라가지 못했지만,
그 짧은 순간만큼은 모두가 같은 쪽을 보고 있었지.
그 장면, 나한테 다시 보여줄 수 있을까..?`;

  return (
    <div className="drawing-description-container">
      {/* 설명 박스 */}
      <div className="description-box">{description}</div>

      {/* 버튼 박스 */}
      <div className="button-box">
        <button className="ok-btn">오케이</button>
        <button className="cancel-btn">네?</button>
      </div>

      <img src={art_table} alt="Art Table" className="art-table-img" />
      <img src={midae_rabbit} alt="Art Table" className="rabbit-img" />
    </div>
  );
};

export default DrawingDescription;
