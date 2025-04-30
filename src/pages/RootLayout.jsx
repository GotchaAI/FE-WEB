import { Outlet } from "react-router-dom";
import { csrfTokenGetAPI } from "services/auth/auth";
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
  try {
    await csrfTokenGetAPI();
  } catch (e) {
    console.error(e);
  }

  return;
};
