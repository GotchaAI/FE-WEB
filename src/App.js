import ModalContainer from "commons/modal/ModalContainer";
import { RouterProvider } from "react-router-dom";
import router from "routes/root";
import "./styles/fonts.scss";
import ToastContainer from "commons/toast/ToastContainer";

const App = () => {
  return (<>
    <RouterProvider router={router} />
    <ModalContainer />
    <ToastContainer />
  </>);
};

export default App;
