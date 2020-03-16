import { usersAPI, profileAPI } from './../api/api';
import { stopSubmit } from 'redux-form';
import { ProfileType, PhotosType, PostType } from '../Types/types';
const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO = 'samurai-network/profile/SAVE_PHOTO';


// type PostType = {
//     id: number,
//     message: string, 
//     likesCount: number
// }

// type ContactsType = {
//     facebook: string,
//     github: string,
//     instagram: string,
//     mainLink: null,
//     twitter: string,
//     vk: string,
//     website: null,
//     youtube: string
// }

// type PhotosType = {
//     small: string | null,
//     large: string | null
// }

// type ProfileType = {
//     userId: number,
//     lookingForAJob: boolean,
//     lookingForAJobDescription: string,
//     fullName: string,
//     contacts: ContactsType,
//     photos: PhotosType
// }

export type InitialStateType = typeof initialState

let initialState = {
    posts: [
        { id: 1, message: 'Hi, How are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 }] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    
};


const profileReducer = (state = initialState, action:any):InitialStateType => {

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
            return { ...state, profile:{...state.profile,photos:action.photos}as ProfileType }
                
        }
       
        default:
            return state;
    }

}

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST,
    newPostTextext: string
}

type SetUserProfileSuccessActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status:string
}

type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}

type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO,
    photos:PhotosType
}

export const addPostActionCreator = (newPostTextext: string):AddPostActionCreatorActionType => ({ type: ADD_POST , newPostTextext})
export const setUserProfileSuccess = (profile:ProfileType):SetUserProfileSuccessActionType => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status:string):SetStatusActionType => ({ type: SET_STATUS, status })
export const deletePost = (postId:number):DeletePostActionType => ({ type: DELETE_POST, postId })
export const savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessType=> ({ type: SAVE_PHOTO, photos })





export const setUserProfile = (userId: number) => {
    return async (dispatch: any) => {
        let response = await usersAPI.getProfile(userId)

            dispatch(setUserProfileSuccess(response.data));
        
    }
}

export const getUserStatus = (userId: number) => {
    return async (dispatch: any) => {
       let response = await profileAPI.getStatus(userId)

            dispatch(setStatus(response.data));
        
    }
}

export const updateStatus = (status: string) => {
    return async (dispatch: any) => {
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

export const savePhoto = (file:PhotosType) => {
    return async (dispatch: any) => {
        let response = await profileAPI.savePhoto(file)
            
            if (response.data.resultCode === 0) {
                dispatch(savePhotoSuccess(response.data.data.photos));
            }
        
    }
}
export const saveProfile = (profile:ProfileType)=> {
    
    return async (dispatch: any, getState: any) => {
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