import http from '../httpReques';
import authHeader from '../../utils/auth-header';
const dbName='admin'

const thesis=(year, semester, page, size)=>{
  if (year&&semester) {
    return http.get(`${dbName}/thesis?year=${year}&&semester=${semester}&&page=${page}&&size=${size}`, { headers: authHeader() })
  }
  else {
    return http.get(`${dbName}/thesis?year=&&semester=&&page=${page}&&size=${size}`, { headers: authHeader() })
  }
}

const detailThesis=(year, semester, lecturerId, type, page, size)=>{
  return http.get(`${dbName}/detailThesis?year=${year}&&semester=${semester}&&page=${page}&&size=${size}&&lecturerId=${lecturerId}&&type=${type}`, { headers: authHeader() })
}


const addThesis=(data)=>{
  return http.post(`${dbName}/thesis/create`, data, { headers: authHeader() })
}

const addThesiss=(data)=>{
  return http.post(`${dbName}/thesis/creates`, data, { headers: authHeader() })
}

const editThesis=(data)=>{
  return http.put(`${dbName}/thesis/update`, data, { headers: authHeader() })
}

const checkYear=(data)=>{
  return http.post(`${dbName}/thesis/checkYear`, data, { headers: authHeader() })
}

// eslint-disable-next-line
export default {checkYear, thesis, addThesiss, addThesis, editThesis, detailThesis};