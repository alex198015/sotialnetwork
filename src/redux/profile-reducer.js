import { usersAPI, profileAPI } from './../api/api';
import { stopSubmit } from 'redux-form';
const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO = 'samurai-network/profile/SAVE_PHOTO';


let initialState = {
    posts: [
        { id: 1, message: 'Hi, How are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 }],
    profile: null,
    status: '',
    
};


const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_POST:
            let newPostText = action.newPostTextext;
            return {
                ...state,
                posts: [...state.posts, { id: 5, message: newPostText, likesCount: 0 }],
               
            }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_STATUS: {
            return { ...state, status: action.status }
        }
        case DELETE_POST: {
            return { ...state, 
                posts:state.posts.filter((p) => p.id !== action.postId) }
        }
        case SAVE_PHOTO: {
            return { ...state, profile:{...state.profile,photos:action.photos} }
                
        }
       
        default:
            return state;
    }

}

export const addPostActionCreator = (newPostTextext) => ({ type: ADD_POST , newPostTextext})
export const setUserProfileSuccess = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO, photos })





export const setUserProfile = (userId) => {
    return async (dispatch) => {
        let response = await usersAPI.getProfile(userId)

            dispatch(setUserProfileSuccess(response.data));
        
    }
}

export const getUserStatus = (userId) => {
    return async (dispatch) => {
       let response = await profileAPI.getStatus(userId)

            dispatch(setStatus(response.data));
        
    }
}

export const updateStatus = (status) => {
    return async (dispatch) => {
        try{
        let response = await profileAPI.updateStatus(status)
            
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        }catch(error){
            alert(error);
            
        }
    }
}

export const savePhoto = (file) => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(file)
            
            if (response.data.resultCode === 0) {
                dispatch(savePhotoSuccess(response.data.data.photos));
            }
        
    }
}
export const saveProfile = (profile)=> {
    
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        let response = await profileAPI.setProfile(profile)
            
            if (response.data.resultCode === 0) {
                dispatch(setUserProfile(userId));
            }else{
                // let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                // dispatch(stopSubmit('contacts', {"contacts":{"facebook":response.data.messages[0]}})) 
                dispatch(stopSubmit("edit-profile", {_error:response.data.messages[0]}));
                return Promise.reject(response.data.messages[0]);
            }
        
    }
}



export default profileReducer;