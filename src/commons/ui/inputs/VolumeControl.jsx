import "styles/commons/ui/inputs/VolumeControl.scss";
const VolumeControl = ({ value = 50, setValue }) => {
  const MAX_VOLUME = 100;
  const MIN_VOLUME = 0;

  const volumeUpHandler = () => {
    setValue((prev) => {
      return Math.min(MAX_VOLUME, prev + 1);
    });
  };

  const volumeDownHandler = () => {
    setValue((prev) => {
      return Math.max(MIN_VOLUME, prev - 1);
    });
  };

  return (
    <div className="volume-control-container">
      <button
        className="minus-btn"
        disabled={value === MIN_VOLUME}
        onClick={volumeDownHandler}
      >
        <svg
          width="18"
          height="2"
          viewBox="0 0 18 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 1C18 1.19891 17.921 1.38968 17.7803 1.53033C17.6397 1.67098 17.4489 1.75 17.25 1.75H0.75C0.551088 1.75 0.360322 1.67098 0.21967 1.53033C0.0790178 1.38968 0 1.19891 0 1C0 0.801088 0.0790178 0.610322 0.21967 0.46967C0.360322 0.329018 0.551088 0.25 0.75 0.25H17.25C17.4489 0.25 17.6397 0.329018 17.7803 0.46967C17.921 0.610322 18 0.801088 18 1Z"
            fill="black"
          />
        </svg>
      </button>

      <input
        className="volume-progress"
        type="range"
        value={value}
        min={MIN_VOLUME}
        max={MAX_VOLUME}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <span className="volume-value">{value}</span>

      <button
        className="plus-btn"
        onClick={volumeUpHandler}
        disabled={value === MAX_VOLUME}
      >
        <svg
          width="40"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 9C18 9.19891 17.921 9.38968 17.7803 9.53033C17.6397 9.67098 17.4489 9.75 17.25 9.75H9.75V17.25C9.75 17.4489 9.67098 17.6397 9.53033 17.7803C9.38968 17.921 9.19891 18 9 18C8.80109 18 8.61032 17.921 8.46967 17.7803C8.32902 17.6397 8.25 17.4489 8.25 17.25V9.75H0.75C0.551088 9.75 0.360322 9.67098 0.21967 9.53033C0.0790178 9.38968 0 9.19891 0 9C0 8.80109 0.0790178 8.61032 0.21967 8.46967C0.360322 8.32902 0.551088 8.25 0.75 8.25H8.25V0.75C8.25 0.551088 8.32902 0.360322 8.46967 0.21967C8.61032 0.0790178 8.80109 0 9 0C9.19891 0 9.38968 0.0790178 9.53033 0.21967C9.67098 0.360322 9.75 0.551088 9.75 0.75V8.25H17.25C17.4489 8.25 17.6397 8.32902 17.7803 8.46967C17.921 8.61032 18 8.80109 18 9Z"
            fill="black"
          />
        </svg>
      </button>
    </div>
  );
};

export default VolumeControl;
