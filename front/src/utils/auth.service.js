// import axios from "axios";
// import { API_LOGIN, API_FORGOT } from "../api/api";
// import Cookies from "js-cookie";
// import { useHistory } from "react-router-dom";

// export const login = (email, password, remember) => {
//   return axios
//     .post(API_LOGIN, {
//       email,
//       password,
//     })
//     .then((response) => {
//       console.log(response);
//       if (response.data.token) {
//         remember? Cookies.set("user", JSON.stringify(response.data), { expires: 365}) : Cookies.set("user", JSON.stringify(response.data), { expires: 1 });
//         console.log(response.data);
//         remember? Cookies.set("remember", remember, { expires: 365}) : Cookies.set("remember", remember, { expires: 1 });
//       }
//       return response.data;
//     });

// };

// export const logout = () => {
//   // const history = useHistory()
//   Cookies.remove("user");
//   // Cookies.set("remember", false);
//   // window.location.reload();
//   // history.push('/login')
// };

// const getCurrentUser = () => {
//   return JSON.parse(Cookies.get("user"));
// };

// export const forgot = (email) => {
//   return axios
//     .post(API_FORGOT, {
//       email,
//     })
//     .then((msg) => {
//       // toast(msg?.data?.message);
//       return msg.data;
//     });
// };


// export const verify = (code) => {
//   return axios
//     .post(API_FORGOT, {
//       code,
//     })
//     .then((msg) => {
//       // toast(msg?.data?.message);
//       return msg.data;
//     });
// };

// export default getCurrentUser;