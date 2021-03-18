import http from '../httpReques';
import authHeader from '../../utils/auth-header';
const dbName='admin'

const thesis=(year, semester)=>{
  if (year&&semester) {
    return http.get(`${dbName}/thesis?year=${year}&&semester=${semester}`, { headers: authHeader() })
  }
  else {
    return http.get(`${dbName}/thesis?year=&&semester=`, { headers: authHeader() })
  }
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
export default {checkYear, thesis, addThesiss, addThesis, editThesis};