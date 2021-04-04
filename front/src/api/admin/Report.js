import http from '../httpReques';
import authHeader from '../../utils/auth-header';
const dbName='admin'


const report = (year, semester, page, size,type) => {
  if (year&&semester) {
    return http.get(`${dbName}/report?year=${year}&&semester=${semester}&&page=${page}&&size=${size}&&type=${type}`, { headers: authHeader() })
  }
  else {
    return http.get(`${dbName}/report?year=&&semester=&&page=${page}&&size=${size}type=${type}`, { headers: authHeader() })
  }
}

const tkb=(year, semester)=>{
  return http.get(`${dbName}/tkb?year=&&semester=`, { headers: authHeader() })
}


// eslint-disable-next-line
export default {report, tkb};