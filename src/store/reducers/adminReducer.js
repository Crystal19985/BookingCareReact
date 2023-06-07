import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false

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
        default:
            return state;
    }
}

export default adminReducer;