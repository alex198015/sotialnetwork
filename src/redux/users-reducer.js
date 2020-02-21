const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOTAL_COUNT = 'TOTAL_COUNT'

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount:0,
    currentPage:1
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
            return{...state, users:[...action.users]} 

        case SET_CURRENT_PAGE:
            return{...state,currentPage: action.currentPage} 

        case  TOTAL_COUNT: 
            return {... state,totalUsersCount: action.totalCount }
        default:
            return state;
    }

}

export const followAC = (userId) => ({ type: FOLLOW, userId })
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPageAC = (currentPage) => ({type:SET_CURRENT_PAGE,currentPage})
export const setTotalUsersCountAC = (totalCount) => ({type:TOTAL_COUNT,totalCount })

export default usersReducer;