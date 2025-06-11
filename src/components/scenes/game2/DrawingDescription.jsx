import art_table from "assets/components/scenes/game2/art-table.png";
import midae_rabbit from "assets/components/scenes/game2/midae-rabbit5.png";
import "styles/components/scenes/game2/DrawingDescription.scss";

/**
 * DrawingDescription 컴포넌트
 *
 * Game2에서 AI가 생성한 설명(description)을 사용자에게 보여주는 화면입니다.
 * - `description`이 있을 경우 설명과 함께 '오케이', '네?' 버튼을 표시합니다.
 * - '오케이' 버튼 클릭 시 다음 씬으로 넘어갑니다.
 * - '네?' 버튼 클릭 시 콘솔에 거절 메시지를 출력합니다. (뭐 추가하지)
 *
 * Props:
 * - description (string): AI가 생성한 설명 텍스트
 * - onOk (function): 오케이 버튼 클릭 시 호출되는 콜백 (다음 씬으로 이동)
 */

const DrawingDescription = ({ description, onOk }) => {
  const onCancel = () => {
    console.log("이딴걸 그리라고?"); // 사용자의 의문 반응 시 출력 (비기능성)
  };

  return (
    <div className="drawing-description-container">
      {/* 설명 박스 - 설명이 있으면 출력, 없으면 로딩 메시지 */}
      <div className="description-box-wrapper">
        <div className="description-box">
          <div className="text-content">
            {description ? description : "토선생이 생각중입니다..."}
          </div>
        </div>
      </div>

      {/* 버튼 박스 - 설명이 있을 때만 표시 */}
      {description && (
        <div className="button-box">
          <button className="ok-btn" onClick={onOk}>
            오케이
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            네?
          </button>
        </div>
      )}

      {/* 배경 이미지: 아트 테이블 및 토끼 */}
      <img src={art_table} alt="Art Table" className="art-table-img" />
      <img src={midae_rabbit} alt="Midae Rabbit" className="rabbit-img" />
    </div>
  );
};

export default DrawingDescription;
