import http from '../httpReques';
import authHeader from '../../utils/auth-header';
const dbName='admin'

const phdThesis=(year, semester, page, size)=>{
  if (year&&semester) {
    return http.get(`${dbName}/phdThesis?year=${year}&&semester=${semester}&&page=${page}&&size=${size}`, { headers: authHeader() })
  }
  else {
    return http.get(`${dbName}/phdThesis?year=&&semester=&&page=${page}&&size=${size}`, { headers: authHeader() })
  }
}

const detailPhdThesis=(year, semester, lecturerId, type, page, size)=>{
  return http.get(`detailPhdThesis?year=${year}&&semester=${semester}&&page=${page}&&size=${size}&&lecturerId=${lecturerId}&&type=${type}`, { headers: authHeader() })
}


const addPhdThesis=(data)=>{
  return http.post(`${dbName}/phdThesis/create`, data, { headers: authHeader() })
}

const addPhdThesiss=(data)=>{
  return http.post(`${dbName}/phdThesis/creates`, data, { headers: authHeader() })
}

const editPhdThesis=(data)=>{
  return http.put(`${dbName}/phdThesis/update`, data, { headers: authHeader() })
}

const checkYear=(data)=>{
  return http.post(`${dbName}/phdThesis/checkYear`, data, { headers: authHeader() })
}

// eslint-disable-next-line
export default {checkYear, phdThesis, addPhdThesiss, addPhdThesis, editPhdThesis, detailPhdThesis};