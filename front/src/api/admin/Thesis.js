import http from '../httpReques';
const dbName='admin'

const thesis=(year, semester)=>{
  if (year&&semester) {
    return http.get(`${dbName}/thesis?year=${year}&&semester=${semester}`)
  }
  else {
    return http.get(`${dbName}/thesis?year=&&semester=`)
  }
}

const addThesis=(data)=>{
  return http.post(`${dbName}/thesis/create`, data)
}

const addThesiss=(data)=>{
  return http.post(`${dbName}/thesis/creates`, data)
}

const editThesis=(data)=>{
  return http.put(`${dbName}/thesis/update`, data)
}

const checkYear=(data)=>{
  return http.post(`${dbName}/thesis/checkYear`, data)
}

// eslint-disable-next-line
export default {checkYear, thesis, addThesiss, addThesis, editThesis};