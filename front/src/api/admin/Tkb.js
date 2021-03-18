import http from '../httpReques';
import authHeader from '../../utils/auth-header';
const dbName='admin'


const tkb=(year, semester)=>{
  if (year&&semester) {
    return http.get(`${dbName}/tkb?year=${year}&&semester=${semester}`, { headers: authHeader() })
  }
  else {
    return http.get(`${dbName}/tkb?year=&&semester=`, { headers: authHeader() })
  }
}

const addTkb=(data)=>{
  return http.post(`${dbName}/tkb/create`, data, { headers: authHeader() })
}

const addTkbs=(data)=>{
  return http.post(`${dbName}/tkb/creates`, data, { headers: authHeader() })
}

const editTkb=(data)=>{
  return http.put(`${dbName}/tkb/update`, data, { headers: authHeader() })
}

const checkYear=(data)=>{
  return http.post(`${dbName}/tkb/checkYear`, data, { headers: authHeader() })
}

// eslint-disable-next-line
export default {checkYear, tkb, addTkbs, addTkb, editTkb};