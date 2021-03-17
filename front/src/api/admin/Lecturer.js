import http from '../httpReques';
import authHeader from '../../utils/auth-header'
const dbName='admin'

const lecturer=()=>{
  return http.get(`${dbName}/lecturer`, { headers: authHeader() })
}

const addLecturer=(data)=>{
  return http.post(`${dbName}/lecturer/create`, data)
}

const addLecturers=(data)=>{
  return http.post(`${dbName}/lecturer/creates`, data)
}

const editLecturer=(data)=>{
  return http.put(`${dbName}/lecturer/update`, data)
}

// eslint-disable-next-line
export default {lecturer, addLecturers, addLecturer, editLecturer};