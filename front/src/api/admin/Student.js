import http from '../httpReques';
const dbName='admin'

const student=()=>{
  return http.get(`${dbName}/student`)
}

const addStudent=(data)=>{
  return http.post(`${dbName}/student/create`, data)
}

const addStudents=(data)=>{
  return http.post(`${dbName}/student/creates`, data)
}

const editStudent=(data)=>{
  return http.put(`${dbName}/student/update`, data)
}

// eslint-disable-next-line
export default {student, addStudents, addStudent, editStudent};