import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}// Method post, phia server để nhận được tham số req : dùng req.body.email, req.body.password 

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}// Method get, phia server để nhận được tham số req : dùng req.query.id

export { handleLoginApi, getAllUsers };