import { authAPI, securityAPI } from "../api/api";
import {stopSubmit} from 'redux-form'
const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl:null
};


const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
                
            }

        default:
            return state;
    }

}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })
export const setCapthaSuccess = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS,payload: {captchaUrl} })

export const getAuthUserData = () => {
    return async (dispatch) => {
       let response = await authAPI.me();
            if (response.data.resultCode === 0) {
                let { id, email, login } = response.data.data;
                dispatch(setAuthUserData(id, email, login, true))
            }
        
    }
    
}
export const getlogIn = (email, password, rememberMe,captcha) => {
    return async (dispatch) => {
        let response = await authAPI.logIn(email, password, rememberMe,captcha);          
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            }else{
                if(response.data.resultCode === 10){
                    dispatch(getCaptcha());
                }
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                dispatch(stopSubmit('login', {_error:message}))               
            }
        
    }
}

export const getCaptcha = () => {
    return async (dispatch) => {
        const response = await securityAPI.getCaptchaURL();          
        const captchaUrl = response.data.url  
                dispatch(setCapthaSuccess(captchaUrl))               
            
        
    }
}

export const getlogOut = () => {
    return async (dispatch) => {
        let response = await authAPI.logOut()          
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        
    }
}

export default authReducer;