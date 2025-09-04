import CloseIcon from "commons/svgs/CloseIcon";
import "styles/commons/ui/button/CloseButton.scss";

const CloseButton = ({ onClick }) => {
  return (
    <button onClick={onClick} type="button" className="close-btn">
      <CloseIcon />
    </button>
  );
};

export default CloseButton;
