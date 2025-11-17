import AdminPage, { loader as adminLoader } from "pages/admin/AdminPage";
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
        element: <AdminPage />,
      },
      {
        path: "announce",
        element: <AnnouncePage />,
        children: [
          {
            index: true,
            element: <AnnouncePage />,
          },
          {
            path: "edit/:id",
            element: <AnnounceDetailPage />,
          },
        ],
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
