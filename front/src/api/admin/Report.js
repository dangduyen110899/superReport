import http from '../httpReques';
import authHeader from '../../utils/auth-header';
import Cookies from "js-cookie";
const dbName='admin'

const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;


const report = (year, semester, page, size,type, sortField='', sort='',valuefilter1='', valuefilter2='', keyword='') => {
  if (year&&semester) {
    return http.get(`report?year=${year}&&semester=${semester}&&page=${page}&&size=${size}&&type=${type}&&sortField=${sortField}&&sort=${sort}&&valuefilter1=${valuefilter1}&&valuefilter2=${valuefilter2}&&keyword=${keyword}`, { headers: authHeader() })
    // if(user?.roles==='ADMIN' || user?.roles==='LEADER') {
    //   return http.get(`report?year=${year}&&semester=${semester}&&page=${page}&&size=${size}&&type=${type}&&sortField=${sortField}&&sort=${sort}&&valuefilter1=${valuefilter1}&&valuefilter2=${valuefilter2}&&keyword=${keyword}`, { headers: authHeader() })
    // }
    // else {
    //   return http.get(`/report?year=${year}&&semester=${semester}&&page=${page}&&size=${size}&&type=${type}&&sortField=${sortField}&&sort=${sort}&&valuefilter1=${valuefilter1}&&valuefilter2=${valuefilter2}&&keyword=${keyword}`, { headers: authHeader() })
    // }
  }
  else {
    return http.get(`report?year=&&semester=&&page=${page}&&size=${size}&&type=${type}&&sortField=${sortField}&&sort=${sort}`, { headers: authHeader() })

    // if(user?.roles==='ADMIN' || user?.roles==='ADMIN1' || user?.roles==='LDDK') {
    // return http.get(`report?year=&&semester=&&page=${page}&&size=${size}&&type=${type}&&sortField=${sortField}&&sort=${sort}`, { headers: authHeader() })
    // } else {
    //   return http.get(`/report?year=&&semester=&&page=${page}&&size=${size}&&type=${type}&&sortField=${sortField}&&sort=${sort}`, { headers: authHeader() })
    // }
  }
}

const tkb=(year, semester)=>{
  return http.get(`tkb?year=&&semester=`, { headers: authHeader() })
}

const download=({year, semester, page, size,type, sortField='', sort='',valuefilter1='', valuefilter2='', keyword=''})=>{
  return http.get(`report?year=${year}&&semester=${semester}&&page=${page}&&size=${size}&&type=${type}&&sortField=${sortField}&&sort=${sort}&&valuefilter1=${valuefilter1}&&valuefilter2=${valuefilter2}&&keyword=${keyword}&&check=${'export'}`,  { headers: authHeader(), responseType: "blob" })
}

const detail=(year, semester, lecturerId, type)=>{
  return http.get(`report/detail?year=${year}&&semester=${semester}&&lecturerId=${lecturerId}&&type=${type}`,  { headers: authHeader() })
}

// eslint-disable-next-line
export default {report, tkb, download, detail};