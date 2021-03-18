import Cookies from "js-cookie";

export default function authHeader() {
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
}
