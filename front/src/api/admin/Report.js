import http from '../httpReques';
const dbName='admin'

const report=(year, semester)=>{
  if (year&&semester) {
    return http.get(`${dbName}/report?year=${year}&&semester=${semester}`)
  }
  else {
    return http.get(`${dbName}/report?year=&&semester=`)
  }
}

const tkb=(year, semester)=>{
  return http.get(`${dbName}/tkb?year=&&semester=`)
}


// eslint-disable-next-line
export default {report, tkb};