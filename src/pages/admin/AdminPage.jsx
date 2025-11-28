import { AdminHeader } from "components/admin/AdminHeader";
import ScrollToTop from "components/common/ScrollToTop";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { tokenReissueAPI } from "services/auth/auth";
import "styles/pages/admin/AdminPage.scss";
import { getAuthToken } from "utils/token";

const AdminPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="admin-page-container">
      <ScrollToTop />
      <AdminHeader />
      <Outlet />
    </div>
  );
};

export default AdminPage;

export const loader = async () => {
  const { accessToken, setAccessToken } = getAuthToken();

  if (!accessToken) {
    // 토큰 재발급
    try {
      const res = await tokenReissueAPI();
      const newAccessToken = res.accessToken;
      const expireTime = res.expiredAt;
      setAccessToken(newAccessToken, expireTime);
    } catch (e) {
      console.error(e);
      return { isSignIn: false };
    }
  }
  return { isSignIn: true };
};
