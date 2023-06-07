import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('Fired fetch gender Start :', action);
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state };
            copyState.genders = action.data;
            // console.log(('Fired fetch gender Success :', action.data))
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAIL:
            console.log('Fired fetch gender Fail :', action);
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;