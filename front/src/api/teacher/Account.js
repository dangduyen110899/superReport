import authHeader from '../../utils/auth-header'
import http from '../httpReques';
const dbName='users'
const teacher  = {}
teacher.uploadTeachers=(data)=>{
  return http.post(`${dbName}`, data, { headers: authHeader() })
}

// eslint-disable-next-line
export default teacher;