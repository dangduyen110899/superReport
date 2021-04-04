import http from '../httpReques';
import authHeader from '../../utils/auth-header'
const dbName='admin'

const lecturer=(page, size, mode)=>{
  return http.get(`${dbName}/lecturer?page=${page}&&size=${size}&&mode=${mode}`, { headers: authHeader() })
}

const addLecturer=(data)=>{
  return http.post(`${dbName}/lecturer/create`, data, { headers: authHeader() })
}

const addLecturers=(data)=>{
  return http.post(`${dbName}/lecturer/creates`, data, { headers: authHeader() })
}

const editLecturer=(data)=>{
  return http.put(`${dbName}/lecturer/update`, data, { headers: authHeader() })
}

// eslint-disable-next-line
export default {lecturer, addLecturers, addLecturer, editLecturer};