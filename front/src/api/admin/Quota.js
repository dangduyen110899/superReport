import http from '../httpReques';
import authHeader from '../../utils/auth-header';
const dbName='admin'

const quota=(page, size)=>{
  return http.get(`${dbName}/quota?page=${page}&&size=${size}`, { headers: authHeader() })
}

const addQuota=(data)=>{
  return http.post(`${dbName}/quota/create`, data, { headers: authHeader() })
}

const addQuotas=(data)=>{
  return http.post(`${dbName}/quota/creates`, data, { headers: authHeader() })
}

const editQuota=(data)=>{
  return http.put(`${dbName}/quota/update`, data, { headers: authHeader() })
}

// eslint-disable-next-line
export default {quota, addQuota, addQuotas, editQuota};