import Err from "pages/403";
import SignIn from "pages/account/SignIn";
import TableThesic from "pages/admin/DataKltn/TableThesis";
import TableLecturer from "pages/admin/DataLecturer/TableLecturer";
import TableStudent from "pages/admin/DataStudent/TableStudent";
import TableTkb from "pages/admin/DataTkb/TableTkb";
import TableReport from "pages/admin/Report/TableReport";

export const routesAdmin = [
  // {
  //   path: "/",
  //   exact: false,
  //   components: LayoutAdmin,
  // },
  {
    path: "/403",
    exact: true,
    components: match => <Err match={match}/>,
  },
  {
    path: "/",
    exact: true,
    components: SignIn,
  },
  {
    path: "/admin/lecturer",
    exact: true,
    components: match => <TableLecturer match={match}/>,
    role: 'adminorpm'
  },
  {
    path: "/admin/student",
    exact: true,
    components: match => <TableStudent match={match}/>,
    role: 'adminorpm'
  },
  {
    path: "/admin/tkb",
    exact: true,
    components: match => <TableTkb match={match}/>,
    role: 'adminorpm'
  },
  {
    path: "/admin/kltn",
    exact: true,
    components: match => <TableThesic match={match}/>,
    role: 'adminorpm'
  },
  {
    path: "/admin/report",
    exact: true,
    components: match => <TableReport match={match}/>,
    role: 'adminorpm'
  }
];