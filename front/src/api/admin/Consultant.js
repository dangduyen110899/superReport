import http from '../httpReques';
import authHeader from '../../utils/auth-header';
const dbName='admin'

const consultant=(year, semester, page, size)=>{
  if (year&&semester) {
    return http.get(`${dbName}/consultant?year=${year}&&semester=${semester}&&page=${page}&&size=${size}`, { headers: authHeader() })
  }
  else {
    return http.get(`${dbName}/consultant?year=&&semester=&&page=${page}&&size=${size}`, { headers: authHeader() })
  }
}

const detailConsultant=(year, semester, lecturerId, type, page, size)=>{
  return http.get(`detailConsultant?year=${year}&&semester=${semester}&&page=${page}&&size=${size}&&lecturerId=${lecturerId}&&type=${type}`, { headers: authHeader() })
}

const addConsultants=(data)=>{
  return http.post(`${dbName}/consultant/creates`, data, { headers: authHeader() })
}


const checkYear=(data)=>{
  return http.post(`${dbName}/consultant/checkYear`, data, { headers: authHeader() })
}

// eslint-disable-next-line
export default {checkYear, consultant, addConsultants, detailConsultant};