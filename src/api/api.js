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
    }
}


export const unFollowAPI = {
    getUnFollow(user) {
        return instance.delete(`follow/${user.id}`)
            .then(response => response.data)
    }
}

export const followAPI = {
    getFollow(user) {
        return instance.post(`follow/${user.id}`)
            .then(response => response.data)
    }
}