import "styles/commons/svgs/PageArrowButton.scss";

const PageArrowButton = ({
  direction = "right",
  disabled = false,
  onClick,
}) => {
  const style = direction === "right" ? { transform: "scaleX(-1)" } : {};

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous Page" : "Next Page"}
      className={`arrow-button ${disabled ? "disabled" : ""}`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
      >
        <path
          d="M3.58972 12.4072C2.51578 11.8154 2.48208 10.3016 3.48914 9.65234L3.58972 9.59277L13.6171 4.06641C14.6881 3.47617 15.9999 4.25077 15.9999 5.47363L15.9999 16.5264C15.9999 17.7109 14.7692 18.4751 13.7186 17.9854L13.6171 17.9336L3.58972 12.4072Z"
          fill={disabled ? "#F2F3F6" : "#D3F16F"}
          stroke={disabled ? "#999999" : "black"}
        />
      </svg>
    </button>
  );
};

export default PageArrowButton;
