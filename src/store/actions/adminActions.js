import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsersService, deleteUserService }
    from '../../services/userService';
import { toast } from 'react-toastify';

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

// Role
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

// Position
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

// Create new user
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

// Delete user
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
