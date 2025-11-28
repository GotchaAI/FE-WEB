import {
  ADMIN_ANNOUNCE_URL,
  ADMIN_MANAGE_CUSTOMER_URL,
  ADMIN_MANAGE_REPORT_URL,
  ADMIN_MANAGE_USER_URL,
  ROOT_URL,
} from "constants/url";
import { Link } from "react-router-dom";
import logo from "assets/commons/home-logo.png";
import "styles/components/admin/AdminHeader.scss";
import Profile from "components/home/Profile";

export const AdminHeader = () => {
  return (
    <header className="admin-page-header">
      <Link to={ROOT_URL}>
        <img src={logo} alt="logo" className="home-logo-img" />
      </Link>
      <nav className="admin-page-nav-container">
        <Link to={ADMIN_ANNOUNCE_URL}>공지 관리</Link>
        <Link to={ADMIN_MANAGE_USER_URL}>유저 관리</Link>
        <Link to={ADMIN_MANAGE_REPORT_URL}>신고 관리</Link>
        <Link to={ADMIN_MANAGE_CUSTOMER_URL}>고객센터</Link>
      </nav>
      <Profile />
    </header>
  );
};
