import http from '../httpReques';
import authHeader from '../../utils/auth-header';
const dbName='admin'

const project=(year, semester, page, size)=>{
  if (year&&semester) {
    return http.get(`${dbName}/project?year=${year}&&semester=${semester}&&page=${page}&&size=${size}`, { headers: authHeader() })
  }
  else {
    return http.get(`${dbName}/project?year=&&semester=&&page=${page}&&size=${size}`, { headers: authHeader() })
  }
}

const detailproject=(year, semester, lecturerId, type, page, size)=>{
  return http.get(`detailproject?year=${year}&&semester=${semester}&&page=${page}&&size=${size}&&lecturerId=${lecturerId}&&type=${type}`, { headers: authHeader() })
}


const addproject=(data)=>{
  return http.post(`${dbName}/project/create`, data, { headers: authHeader() })
}

const addprojects=(data)=>{
  return http.post(`${dbName}/project/creates`, data, { headers: authHeader() })
}

const editproject=(data)=>{
  return http.put(`${dbName}/project/update`, data, { headers: authHeader() })
}

const checkYear=(data)=>{
  return http.post(`${dbName}/project/checkYear`, data, { headers: authHeader() })
}

// eslint-disable-next-line
export default {checkYear, project, addprojects, addproject, editproject, detailproject};