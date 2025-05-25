import ModalContainer from "commons/modal/ModalContainer";
import { RouterProvider } from "react-router-dom";
import router from "routes/root";
import "./styles/fonts.scss";

const App = () => {
  return (<>
    <RouterProvider router={router} />
    <ModalContainer />
  </>);
};

export default App;
