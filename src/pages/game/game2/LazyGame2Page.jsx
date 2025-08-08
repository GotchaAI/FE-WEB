import SuspenseWrapper from "components/common/SuspenseWrapper";
import { lazy } from "react";

const Game2Page = lazy(() => import("pages/game/game2/Game2Page"));

export default SuspenseWrapper(Game2Page);
