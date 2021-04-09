import http from '../httpReques';
import authHeader from '../../utils/auth-header';
const dbName='admin'

const student=(page, size)=>{
  return http.get(`${dbName}/student?page=${page}&&size=${size}`, { headers: authHeader() })
}

const addStudent=(data)=>{
  return http.post(`${dbName}/student/create`, data, { headers: authHeader() })
}

const addStudents=(data)=>{
  return http.post(`${dbName}/student/creates`, data, { headers: authHeader() })
}

const editStudent=(data)=>{
  return http.put(`${dbName}/student/update`, data, { headers: authHeader() })
}

// eslint-disable-next-line
export default {student, addStudents, addStudent, editStudent};