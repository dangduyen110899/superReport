import http from '../httpReques';
import authHeader from '../../utils/auth-header';
import Cookies from "js-cookie";
const dbName='admin'

const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;


const report = (year, semester, page, size,type, sortField='', sort='',fieldfilter='', valuefilter='') => {
  if (year&&semester) {
    if(user?.roles==='ADMIN' || user?.roles==='LEADER') {
      return http.get(`${dbName}/report?year=${year}&&semester=${semester}&&page=${page}&&size=${size}&&type=${type}&&sortField=${sortField}&&sort=${sort}&&fieldfilter=${fieldfilter}&&valuefilter=${valuefilter}`, { headers: authHeader() })
    }
    else {
      return http.get(`lecturer/report?year=${year}&&semester=${semester}&&page=${page}&&size=${size}&&type=${type}&&sortField=${sortField}&&sort=${sort}&&fieldfilter=${fieldfilter}`, { headers: authHeader() })
    }
  }
  else {
    if(user?.roles==='ADMIN' || user?.roles==='LEADER') {
    return http.get(`${dbName}/report?year=&&semester=&&page=${page}&&size=${size}type=${type}&&sortField=${sortField}&&sort=${sort}`, { headers: authHeader() })
    } else {
      return http.get(`lecturer/report?year=&&semester=&&page=${page}&&size=${size}type=${type}&&sortField=${sortField}&&sort=${sort}`, { headers: authHeader() })
    }
  }
}

const tkb=(year, semester)=>{
  return http.get(`${dbName}/tkb?year=&&semester=`, { headers: authHeader() })
}

const download=(data)=>{
  return http.post(`${dbName}/report/export`, data, { headers: authHeader(), responseType: "blob" })
}


// eslint-disable-next-line
export default {report, tkb, download};