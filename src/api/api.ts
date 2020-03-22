import axios from 'axios'
import { PhotosType, ProfileType } from '../Types/types'
import { any, number } from 'prop-types'

// let baseURL = 'https://social-network.samuraijs.com/api/1.0/'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '03747c73-73c7-4c3d-ac0e-45ed1bff5da9'
    }
})


export const usersAPI = {
    getUsers(currentPage:number = 1, pageSize:number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    getUnFollow(userId:number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },
    getFollow(userId:number) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
    getProfile(userId:number){
        console.warn('obsolete method. Please use profilesAPI object')
        return profileAPI.getProfile(userId)
    },
    
}

export const profileAPI = {
   
    getProfile(userId:number){
        
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId:number){
        
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status:string){
        
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile:string){
        const formData = new FormData();
        formData.append('image',photoFile)
        return instance.put(`profile/photo`,formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
    })},
    setProfile(profileFile:ProfileType){
       
        return instance.put(`profile`, profileFile )}
           
   
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeWithCaptcha {
    CaptchaIsRequired = 10
}

type DataTypes = {
    id:number,
    email:string,
    login:string
}

type MeResponseType = {
    data: DataTypes,
    resultCode:ResultCodesEnum,
    messages:Array<string>
}

type LoginResponseType = {
    data: {userId:number},
    resultCode:ResultCodesEnum | ResultCodeWithCaptcha,
    messages:Array<string>
}

type LogOutType = {
    resultCode:ResultCodesEnum
}



export const authAPI = {
    me(){
        return instance.get<MeResponseType>('auth/me').then(res => res.data)
    },
    logIn(email:string, password:string, rememberMe = false,captcha: null | string = null){
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe,captcha}).then(res => res.data)
    },
    logOut(){
        return instance.delete<LogOutType>('auth/login').then(res => res.data)
        
    },

}

export const securityAPI = {
    getCaptchaURL(){
        return instance.get<{url:string}>('security/get-captcha-url').then(res => res.data)
   
  }
}

// export const unFollowAPI = {
//     getUnFollow(user) {
//         return instance.delete(`follow/${user.id}`)
//             .then(response => response.data)
//     }
// }

// export const followAPI = {
//     getFollow(user) {
//         return instance.post(`follow/${user.id}`)
//             .then(response => response.data)
//     }
// }