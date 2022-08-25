import axios from "axios";
import Cookies from "js-cookie";


const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`
  }
});
export default axiosInstance;
