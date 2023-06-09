import axios from '../axios';





const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}// Method post, phia server để nhận được tham số req : dùng req.body.email, req.body.password 

const getAllUsersService = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}// Method get, phia server để nhận được tham số req : dùng req.query.id

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } });
}

const editUserService = (user) => {
    return axios.put('/api/edit-user', user);
}

const getAllCodeService = (typeInput) => {
    return axios.get(`/api/get-allcode?type=${typeInput}`);
}// Method get, phia server để nhận được tham số req : dùng req.query.id

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}// Method get, phia server để nhận được tham số req : dùng req.query.id

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`);
}// Method get, phia server để nhận được tham số req : dùng req.query.id

const saveInforDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctor`, data);
}

const getDetailInforDoctor = (doctorId) => {
    return axios.get(`/api/get-infor-doctor-by-id?id=${doctorId}`);
}// Method get, phia server để nhận được tham số req : dùng req.query.id

const saveBulkDrScheduleService = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
}

const getScheduleDrByDateService = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?docterId=${doctorId}&date=${date}`);
}// Method get, phia server để nhận được tham số req : dùng req.query.id





export {
    handleLoginApi, getAllUsersService, createNewUserService, deleteUserService,
    editUserService, getAllCodeService, getTopDoctorHomeService, getAllDoctorsService,
    saveInforDoctorService, getDetailInforDoctor, saveBulkDrScheduleService,
    getScheduleDrByDateService,
};