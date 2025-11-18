import { AdminHome } from "pages/admin/AdminHome";
import AdminPage, { loader as adminLoader } from "pages/admin/AdminPage";
import AnnounceEditPage from "pages/admin/AnnounceEditPage";
import { CreateAnnouncePage } from "pages/admin/CreateAnnouncePage";
import AnnounceDetailPage from "pages/home/AnnounceDetailPage";
import AnnouncePage from "pages/home/AnnouncePage";

const admin = [
  {
    path: "/admin",
    element: <AdminPage />,
    loader: adminLoader,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "announce",
        element: <AnnouncePage />,
      },
      {
        path: "announce/:id",
        element: <AnnounceDetailPage />,
      },
      {
        path: "announce/:id/edit",
        element: <AnnounceEditPage />,
      },
      {
        path: "announce/create",
        element: <CreateAnnouncePage />,
      },
      {
        path: "user-manage",
        element: <>유저 관리</>,
      },
      {
        path: "report-manage",
        element: <>신고 관리</>,
      },
      {
        path: "service-center",
        element: <>1ㄷ1 문의 관리</>,
      },
    ],
  },
];

export default admin;
