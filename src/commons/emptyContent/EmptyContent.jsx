import { Bongvong } from "commons/svgs/characters/Bongvong";
import "styles/commons/emptyContent/EmptyContent.scss";
export const EmptyContent = () => {
  return (
    <div className="empty-friend">
      <Bongvong />
      <span>텅 비었어요!</span>
    </div>
  );
};
