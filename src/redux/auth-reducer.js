import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};


const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                // isAuth: true
            }

        default:
            return state;
    }

}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })

export const getAuthUserData = () => {
    return (dispatch) => {
        authAPI.me().then(response => {
            if (response.data.resultCode === 0) {
                let { id, email, login } = response.data.data;
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
    }
}
export const getlogIn = (email, password, rememberMe) => {
    return (dispatch) => {
        authAPI.logIn(email, password, rememberMe).then(response => {           
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
        })
    }
}

export const getlogOut = () => {
    return (dispatch) => {
        authAPI.logOut().then(response => {           
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
    }
}

export default authReducer;