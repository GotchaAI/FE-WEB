import SuspenseWrapper from "components/common/SuspenseWrapper";
import { lazy } from "react";

const Game1Page = lazy(() => import("pages/game/game1/Game1Page"));

export default SuspenseWrapper(Game1Page);
