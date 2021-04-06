import http from '../httpReques';
import authHeader from '../../utils/auth-header';
import Cookies from "js-cookie";
const dbName='admin'

const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;


const report = (year, semester, page, size,type) => {
  if (year&&semester) {
    if(user.roles==='ADMIN' || user.roles==='LEADER') {
      return http.get(`${dbName}/report?year=${year}&&semester=${semester}&&page=${page}&&size=${size}&&type=${type}`, { headers: authHeader() })
    }
    else {
      return http.get(`lecturer/report?year=${year}&&semester=${semester}&&page=${page}&&size=${size}&&type=${type}`, { headers: authHeader() })
    }
  }
  else {
    if(user.roles==='ADMIN' || user.roles==='LEADER') {
    return http.get(`${dbName}/report?year=&&semester=&&page=${page}&&size=${size}type=${type}`, { headers: authHeader() })
    } else {
      return http.get(`lecturer/report?year=&&semester=&&page=${page}&&size=${size}type=${type}`, { headers: authHeader() })
    }
  }
}

const tkb=(year, semester)=>{
  return http.get(`${dbName}/tkb?year=&&semester=`, { headers: authHeader() })
}


// eslint-disable-next-line
export default {report, tkb};