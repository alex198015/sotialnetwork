import * as axios from 'axios'

// let baseURL = 'https://social-network.samuraijs.com/api/1.0/'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '03747c73-73c7-4c3d-ac0e-45ed1bff5da9'
    }
})


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    getUnFollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },
    getFollow(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
    getProfile(userId){
        console.warn('obsolete method. Please use profilesAPI object')
        return profileAPI.getProfile(userId)
    },
    
}

export const profileAPI = {
   
    getProfile(userId){
        
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId){
        
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status){
        
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile){
        const formData = new FormData();
        formData.append('image',photoFile)
        return instance.put(`profile/photo`,formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
    })},
    setProfile(profileFile){
       
        return instance.put(`profile`, profileFile )}
           
   
}


export const authAPI = {
    me(){
        return instance.get('auth/me')
    },
    logIn(email, password, rememberMe = false){
        return instance.post('auth/login', {email, password, rememberMe})
    },
    logOut(){
        return instance.delete('auth/login')
    },

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