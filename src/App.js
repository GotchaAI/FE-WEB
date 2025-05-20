import { RouterProvider } from "react-router-dom";
import router from "routes/root";
import "./styles/fonts.scss";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
