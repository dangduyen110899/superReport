import http from '../httpReques';
import authHeader from '../../utils/auth-header';
const dbName='admin'

const dissertation=(year, semester, page, size)=>{
  if (year&&semester) {
    return http.get(`${dbName}/dissertation?year=${year}&&semester=${semester}&&page=${page}&&size=${size}`, { headers: authHeader() })
  }
  else {
    return http.get(`${dbName}/dissertation?year=&&semester=&&page=${page}&&size=${size}`, { headers: authHeader() })
  }
}

const detailDissertation=(year, semester, lecturerId, type, page, size)=>{
  return http.get(`detailDissertation?year=${year}&&semester=${semester}&&page=${page}&&size=${size}&&lecturerId=${lecturerId}&&type=${type}`, { headers: authHeader() })
}

const addDissertations=(data)=>{
  return http.post(`${dbName}/dissertation/creates`, data, { headers: authHeader() })
}


const checkYear=(data)=>{
  return http.post(`${dbName}/dissertation/checkYear`, data, { headers: authHeader() })
}

// eslint-disable-next-line
export default {checkYear, dissertation, addDissertations, detailDissertation};