const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS'

let initialState = {
    users: [
         { id: 1, fotoURL:'https://uznayvse.ru/images/content/2017/4/uzn_14915721450.jpg', followed: false, fullName: 'Dmitriy', status: 'I am a boss', location: { city: 'Minsk', country: 'Belarus' } },
         { id: 2, fotoURL:'https://uznayvse.ru/images/content/2017/4/uzn_14915721450.jpg', followed: true, fullName: 'Alex', status: 'I am a student', location: { city: 'England', country: 'London' } },
         { id: 3, fotoURL:'https://uznayvse.ru/images/content/2017/4/uzn_14915721450.jpg', followed: false, fullName: 'Peter', status: 'I am looking for you', location: { city: 'Berlin', country: 'Germany' } },
         { id: 4, fotoURL:'https://uznayvse.ru/images/content/2017/4/uzn_14915721450.jpg', followed: true, fullName: 'Olga', status: 'I am single', location: { city: 'Kiev', country: 'Ukraine' } }
    ],

};


const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return { ...user, followed: true }
                    }
                    return user;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return { ...user, followed: false }
                    }
                    return user;
                })
            }
        case SET_USERS:
            return{...state, users:[...state.users, ...action.users]}         
        default:
            return state;
    }

}

export const followAC = (userId) => ({ type: FOLLOW, userId })
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })


export default usersReducer;