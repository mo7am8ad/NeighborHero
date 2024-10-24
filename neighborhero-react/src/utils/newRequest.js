import axios from 'axios';//for send data to DB

const newRequest = axios.create({
    baseURL:"http://localhost:8800/api/",
    withCredentials:true,
});
export default newRequest;