import http from '../httpReques';
const dbName='admin'

const tkb=(year, semester)=>{
  if (year&&semester) {
    return http.get(`${dbName}/tkb?year=${year}&&semester=${semester}`)
  }
  else {
    return http.get(`${dbName}/tkb?year=&&semester=`)
  }
}

const addTkb=(data)=>{
  return http.post(`${dbName}/tkb/create`, data)
}

const addTkbs=(data)=>{
  return http.post(`${dbName}/tkb/creates`, data)
}

const editTkb=(data)=>{
  return http.put(`${dbName}/tkb/update`, data)
}

const checkYear=(data)=>{
  return http.post(`${dbName}/tkb/checkYear`, data)
}

// eslint-disable-next-line
export default {checkYear, tkb, addTkbs, addTkb, editTkb};