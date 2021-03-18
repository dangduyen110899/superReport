import http from '../httpReques';
import authHeader from '../../utils/auth-header';
const dbName='admin'


const upload=(data, name)=>{
  const nametemp = name.slice(4,name.length).toLowerCase();
  return http.post(`${dbName}/upload/${nametemp}`, data, { headers: authHeader() })
}

const data=()=>{
  return http.get(`${dbName}/data?year=${''}&&semester=${''}`, { headers: authHeader() })
}

const setYear=(data)=>{
  return http.post(`${dbName}/setYear`, data, { headers: authHeader() });
}

// eslint-disable-next-line
export default {upload, data, setYear};