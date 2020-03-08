import { usersAPI, profileAPI } from './../api/api';
const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';


let initialState = {
    posts: [
        { id: 1, message: 'Hi, How are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 }],
    profile: null,
    status: ''

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
        default:
            return state;
    }

}

export const addPostActionCreator = (newPostTextext) => ({ type: ADD_POST , newPostTextext})
export const setUserProfileSuccess = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })




export const setUserProfile = (userId) => {
    return (dispatch) => {
        usersAPI.getProfile(userId).then(response => {

            dispatch(setUserProfileSuccess(response.data));
        })
    }
}

export const getUserStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(response => {

            dispatch(setStatus(response.data));
        })
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status).then(response => {
            
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        })
    }
}

export default profileReducer;