import { Outlet } from "react-router-dom";
import "styles/pages/RootLayout.scss";
const RootLayout = () => {
  return (
    <div className="root-layout-container">
      <Outlet />
    </div>
  );
};

export default RootLayout;

export const loader = async () => {
  return;
};
