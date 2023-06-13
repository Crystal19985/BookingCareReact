import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsersService,
    deleteUserService, editUserService, getTopDoctorHomeService,
    getAllDoctorsService, saveInforDoctorService
}
    from '../../services/userService';
import { toast } from 'react-toastify';



// GENDER
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await getAllCodeService("gender");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }
            else {
                dispatch(fetchGenderFail());
            }
        } catch (error) {
            dispatch(fetchGenderFail());
            console.log('fetchGenderStart error', error);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL,
})


// ROLE
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("role");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            }
            else {
                dispatch(fetchRoleFail());
            }
        } catch (error) {
            dispatch(fetchRoleFail());
            console.log('fetchRoleStart error', error);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL,
})


// POSITION
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("position");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            }
            else {
                dispatch(saveUserFail());
            }
        } catch (error) {
            dispatch(saveUserFail());
            console.log('fetchPositionStart error', error);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL,
})


// CREATE NEW USER REDUX
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                dispatch(saveUserFail());
            }
        } catch (error) {
            dispatch(saveUserFail());
            console.log('saveUserFail error', error);
        }
    }
}


export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL,
})


// EDIT USER REDUX
export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Edit a user succeed");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.error("Edit a user error");
                dispatch(editUserFail());
            }
        } catch (error) {
            toast.error("Edit a user error");
            dispatch(editUserFail());
            console.log('editUserFail error', error);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL,
})


// DELETE USER REDUX
export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete user succeed");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.error("Delete user error !!!");
                dispatch(deleteUserFail());
            }
        } catch (error) {
            toast.error("Delete user error !!!");
            dispatch(deleteUserFail());
            console.log('deleteUserFail error', error);
        }
    }
}

export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    users: data
})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL,
})


// Fetch All user
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsersService("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            }
            else {
                toast.error("Fetch all users error !!!");
                dispatch(fetchAllUsersFail());
            }
        } catch (error) {
            toast.error("Fetch all users error !!!");
            dispatch(fetchAllUsersFail());
            console.log('fetchAllUsersFail error', error);
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFail = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAIL,
})


// FETCH DOCTOR
export const fetchTopDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService(10);
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data));

                // Cach viet truc tiep 
                /*
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
                */
            }
            else {
                dispatch(fetchTopDoctorFail());
            }
        } catch (error) {
            dispatch(fetchTopDoctorFail());
            console.log('fetchTopDoctorFail error', error);
        }
    }
}

export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    dataDoctors: data
})

export const fetchTopDoctorFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
})


// FETCH ALL DOCTOR
export const fetchAllDoctorsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsService();
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(res.data));

                // Cach viet truc tiep 
                /*
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
                */
            }
            else {
                dispatch(fetchAllDoctorsFail());
            }
        } catch (error) {
            dispatch(fetchAllDoctorsFail());
            console.log('fetchAllDoctorsFail error', error);
        }
    }
}

export const fetchAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    dataDoctors: data
})

export const fetchAllDoctorsFail = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
})


// CREATE INFOR DOCTOR
export const saveInforDoctorStart = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log('check data send', data);
            let res = await saveInforDoctorService(data);
            if (res && res.errCode === 0) {

                dispatch(saveInforDoctorSuccess());
                toast.success("saveInforDoctor succeed");
                // Cach viet truc tiep 
                /*
                dispatch({
                    type: actionTypes.CREATE_INFOR_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
                */
            }
            else {
                dispatch(saveInforDoctorFail());
                toast.error("saveInforDoctorFail 1");
            }
        } catch (error) {
            dispatch(saveInforDoctorFail());
            toast.error("saveInforDoctorFail 2");
            console.log('saveInforDoctorFail error', error);
        }
    }
}

export const saveInforDoctorSuccess = () => ({
    type: actionTypes.SAVE_INFOR_DOCTOR_SUCCESS,
})

export const saveInforDoctorFail = () => ({
    type: actionTypes.SAVE_INFOR_DOCTOR_FAIL,
})



// FETCH ALL DOCTOR
export const fetchAllScheduleTimes = (allcodeType) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                // Cach viet truc tiep 
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    timeData: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL,
                })
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL,
            })
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAIL error', error);
        }
    }
}




// export const adminLoginSuccess = (adminInfo) => ({
//     type: actionTypes.ADMIN_LOGIN_SUCCESS,
//     adminInfo: adminInfo
// })

// export const adminLoginFail = () => ({
//     type: actionTypes.ADMIN_LOGIN_FAIL
// })

// export const processLogout = () => ({
//     type: actionTypes.PROCESS_LOGOUT
// })
