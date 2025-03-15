import { RouterProvider } from "react-router-dom";
import router from "routes/root";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
