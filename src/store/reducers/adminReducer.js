import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    users: [],
    topDoctors: [],
    allDoctors: [],
    allDoctorScheduleTimes: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //Gender
        case actionTypes.FETCH_GENDER_START:
            console.log('Fired fetch gender Start :', action);
            return {
                ...state,
                isLoadingGender: true
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            // console.log(('Fired fetch gender Success :', action.data))
            return {
                ...state,
                isLoadingGender: false
            }
        case actionTypes.FETCH_GENDER_FAIL:
            console.log('Fired fetch gender Fail :', action);
            return {
                ...state,
                isLoadingGender: false
            }

        //Role
        case actionTypes.FETCH_ROLE_START:
            console.log('Fired fetch gender Start :', action);
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            // console.log(('Fired fetch gender Success :', action.data))
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAIL:
            console.log('Fired fetch gender Fail :', action);
            return {
                ...state,
            }

        //Position
        case actionTypes.FETCH_POSITION_START:
            console.log('Fired fetch gender Start :', action);
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            // console.log(('Fired fetch gender Success :', action.data))
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAIL:
            console.log('Fired fetch gender Fail :', action);
            return {
                ...state,
            }

        //Fetch all users
        // case actionTypes.FETCH_POSITION_START:
        //     console.log('Fired fetch gender Start :', action);
        //     return {
        //         ...state,
        //     }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAIL:
            console.log('Fired fetch gender Fail :', action);
            state.users = [];
            return {
                ...state,
            }


        // TOP DOCTOR
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            console.log('FETCH_TOP_DOCTOR_FAIL :', action);
            state.topDoctors = [];
            return {
                ...state,
            }


        // ALL DOCTOR
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.dataDoctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            console.log('FETCH_ALL_DOCTOR_FAIL :', action);
            state.allDoctors = [];
            return {
                ...state,
            }


        // ALL DOCTOR SCHEDULE TIME
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allDoctorScheduleTimes = action.timeData;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL:
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAIL :', action);
            state.allDoctorScheduleTimes = [];
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;