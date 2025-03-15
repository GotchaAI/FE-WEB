import { createBrowserRouter } from "react-router-dom";
import home from "routes/home";
import lobby from "routes/lobby";

const router = createBrowserRouter([
  {
    path: "/",
    children: [...home, ...lobby],
  },
]);

export default router;
