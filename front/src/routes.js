import Err from "pages/403";
import SignIn from "pages/account/SignIn";
import TableThesic from "pages/admin/DataKltn/TableThesis";
import TableLecturer from "pages/admin/DataLecturer/TableLecturer";
import TableQuota from "pages/admin/DataQuota/TableQuota";
import TableStudent from "pages/admin/DataStudent/TableStudent";
import TableTkb from "pages/admin/DataTkb/TableTkb";
import ReportDetailThesis from "pages/admin/detail/ReportDetailThesis";
import ReportDetailTkb from "pages/admin/detail/ReportDetailTkb";
import TableReport from "pages/admin/Report/TableReport";

export const routes = [
  // {
  //   path: "/",
  //   exact: false,
  //   components: LayoutAdmin,
  // },
  {
    path: "/403",
    exact: true,
    components: match => <Err match={match}/>,
    role: ''
  },
  {
    path: "/",
    exact: true,
    components: SignIn,
    role: ''
  },
  {
    path: "/admin/lecturer",
    exact: true,
    components: match => <TableLecturer match={match}/>,
    role: ['ADMIN', 'ADMIN1']
  },
  {
    path: "/admin/student",
    exact: true,
    components: match => <TableStudent match={match}/>,
    role: ['ADMIN']
  },
  {
    path: "/admin/tkb",
    exact: true,
    components: match => <TableTkb match={match}/>,
    role: ['ADMIN', 'ADMIN1']
  },
  {
    path: "/admin/kltn",
    exact: true,
    components: match => <TableThesic match={match}/>,
    role: ['ADMIN', 'ADMIN1']
  },
  {
    path: "/report",
    exact: true,
    components: match => <TableReport match={match}/>,
    role: ['ADMIN', 'ADMIN1','LĐK','LĐBM', 'LĐCC','USER']
  },
  {
    path: "/admin/quota",
    exact: true,
    components: match => <TableQuota match={match}/>,
    role: ['ADMIN']
  },
  {
    path: "/report/schedules/:lecturerId",
    exact: true,
    components: match => <ReportDetailTkb match={match}/>,
    role: ['ADMIN', 'ADMIN1','LĐK','LĐBM', 'LĐCC','USER']
  },
  {
    path: "/report/thesis/:lecturerId",
    exact: true,
    components: match => <ReportDetailThesis match={match}/>,
    role: ['ADMIN', 'ADMIN1','LĐK','LĐBM', 'LĐCC','USER']
  }
];