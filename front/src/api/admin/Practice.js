import http from '../httpReques';
import authHeader from '../../utils/auth-header';
const dbName='admin'

const practice=(year, semester, page, size)=>{
  if (year&&semester) {
    return http.get(`${dbName}/practice?year=${year}&&semester=${semester}&&page=${page}&&size=${size}`, { headers: authHeader() })
  }
  else {
    return http.get(`${dbName}/practice?year=&&semester=&&page=${page}&&size=${size}`, { headers: authHeader() })
  }
}

const detailPractice=(year, semester, lecturerId, type, page, size)=>{
  return http.get(`detailPractice?year=${year}&&semester=${semester}&&page=${page}&&size=${size}&&lecturerId=${lecturerId}&&type=${type}`, { headers: authHeader() })
}

const addPractices=(data)=>{
  return http.post(`${dbName}/practice/creates`, data, { headers: authHeader() })
}


const checkYear=(data)=>{
  return http.post(`${dbName}/practice/checkYear`, data, { headers: authHeader() })
}

// eslint-disable-next-line
export default {checkYear, practice, addPractices, detailPractice};