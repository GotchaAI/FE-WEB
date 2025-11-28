import RootLayout, { loader as rootLoader } from "pages/RootLayout";
import { createBrowserRouter } from "react-router-dom";
import auth from "routes/auth";
import home from "routes/home";
import lobby from "routes/lobby";
import admin from "routes/admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: rootLoader,
    children: [...auth, ...home, ...lobby, ...admin],
  },
]);

export default router;
