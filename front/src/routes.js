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
  // {
  //   path: "/admin/tkb",
  //   exact: true,
  //   components: match => <TableDataExcel match={match}/>,
  // },
  {
    path: "/admin/lecturer",
    exact: false,
    components: match => <TableLecturer match={match}/>,
  },
  {
    path: "/admin/student",
    exact: false,
    components: match => <TableStudent match={match}/>,
  },
  {
    path: "/admin/tkb",
    exact: false,
    components: match => <TableTkb match={match}/>,
  },
  {
    path: "/admin/kltn",
    exact: false,
    components: match => <TableThesic match={match}/>,
  },
  {
    path: "/admin/report",
    exact: false,
    components: match => <TableReport match={match}/>,
  }
];