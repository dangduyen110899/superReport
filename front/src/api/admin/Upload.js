import http from '../httpReques';
const dbName='admin'

const upload=(data, name)=>{
  const nametemp = name.slice(4,name.length).toLowerCase();
  return http.post(`${dbName}/upload/${nametemp}`, data)
}

const data=()=>{
  return http.get(`${dbName}/data?year=${''}&&semester=${''}`)
}

const setYear=(data)=>{
  return http.post(`${dbName}/setYear`, data);
}

// eslint-disable-next-line
export default {upload, data, setYear};