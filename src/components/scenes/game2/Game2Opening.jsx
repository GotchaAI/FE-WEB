import art_table from "assets/components/scenes/game2/art-table.png";
import midae_rabbit from "assets/components/scenes/game2/midae-rabbit0.png";
import "styles/components/scenes/game2/Game2Opening.scss";

const Game2Opening = () => {
  return (
    <div className="game2-opening-container">
      <img src={art_table} alt="Art Table" className="art-table-img" />
      <img src={midae_rabbit} alt="Art Table" className="rabbit-img" />
    </div>
  );
};

export default Game2Opening;
