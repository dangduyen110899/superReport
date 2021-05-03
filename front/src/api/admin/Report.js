import http from '../httpReques';
import authHeader from '../../utils/auth-header';
import Cookies from "js-cookie";
const dbName='admin'

const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;


const report = (year, semester, page, size,type, sortField='', sort='',valuefilter1='', valuefilter2='', keyword='') => {
  if (year&&semester) {
    if(user?.roles==='ADMIN' || user?.roles==='LEADER') {
      return http.get(`report?year=${year}&&semester=${semester}&&page=${page}&&size=${size}&&type=${type}&&sortField=${sortField}&&sort=${sort}&&valuefilter1=${valuefilter1}&&valuefilter2=${valuefilter2}&&keyword=${keyword}`, { headers: authHeader() })
    }
    else {
      return http.get(`lecturer/report?year=${year}&&semester=${semester}&&page=${page}&&size=${size}&&type=${type}&&sortField=${sortField}&&sort=${sort}&&valuefilter1=${valuefilter1}&&valuefilter2=${valuefilter2}&&keyword=${keyword}`, { headers: authHeader() })
    }
  }
  else {
    if(user?.roles==='ADMIN' || user?.roles==='ADMIN1' || user?.roles==='LDDK') {
    return http.get(`report?year=&&semester=&&page=${page}&&size=${size}&&type=${type}&&sortField=${sortField}&&sort=${sort}`, { headers: authHeader() })
    } else {
      return http.get(`lecturer/report?year=&&semester=&&page=${page}&&size=${size}&&type=${type}&&sortField=${sortField}&&sort=${sort}`, { headers: authHeader() })
    }
  }
}

const tkb=(year, semester)=>{
  return http.get(`tkb?year=&&semester=`, { headers: authHeader() })
}

const download=(data)=>{
  return http.post(`report/export`, data, { headers: authHeader(), responseType: "blob" })
}


// eslint-disable-next-line
export default {report, tkb, download};