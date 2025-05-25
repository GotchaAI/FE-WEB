import { RouterProvider } from "react-router-dom";
import router from "routes/root";
import "./styles/fonts.scss";
import ToastContainer from "commons/toast/ToastContainer";

const App = () => {
  return (<><RouterProvider router={router} />
    <ToastContainer /></>);
};

export default App;
