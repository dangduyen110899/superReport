import http from '../httpReques';
import authHeader from '../../utils/auth-header';
const dbName='admin'


const report = (year, semester) => {
  if (year&&semester) {
    return http.get(`${dbName}/report?year=${year}&&semester=${semester}`, { headers: authHeader() })
  }
  else {
    return http.get(`${dbName}/report?year=&&semester=`, { headers: authHeader() })
  }
}

const tkb=(year, semester)=>{
  return http.get(`${dbName}/tkb?year=&&semester=`, { headers: authHeader() })
}


// eslint-disable-next-line
export default {report, tkb};