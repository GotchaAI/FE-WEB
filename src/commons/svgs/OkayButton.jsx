import okay_btn from "assets/commons/okay-btn.png";
import "styles/commons/svgs/OkayButton.scss";

const OkayButton = ({ onClick }) => {
  const handleClick = (e) => {
    onClick?.(e); // 기존 클릭 핸들러 호출
  };

  return (
    <button className="okay-svg-btn" onClick={handleClick}>
      <svg
        width="345"
        height="64"
        viewBox="0 0 345 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="svg-main-fill"
          d="M344.5 0.5V31.5625C344.5 49.2011 330.201 63.4999 312.562 63.5H0.5V0.5H344.5Z"
          fill="#FFC466"
          stroke="black"
        />
        <path
          className="svg-sub-fill"
          d="M344.493 34.5C344.229 50.3954 331.395 63.229 315.5 63.4932V34.5H344.493Z"
          fill="#F28110"
          stroke="black"
        />
      </svg>

      <span className="label">
        <img src={okay_btn} alt="확인 버튼" className="start-btn-img" />
      </span>
    </button>
  );
};

export default OkayButton;
