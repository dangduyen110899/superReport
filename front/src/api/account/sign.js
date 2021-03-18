import http from '../httpReques';
const dbName='auth'

const signUp = (name, username, email, password, confirmPassword, roles) => {
  return http.post(`${dbName}/signup`, { name: name, username: username, email: email, password: password, confirmPassword: confirmPassword, roles: roles})
}

const signIn = (data) => {
  console.log("data", data)
  return http.post(`${dbName}/signin`, { username: data.email, password: data.password})
}

// eslint-disable-next-line
export default {signUp, signIn};