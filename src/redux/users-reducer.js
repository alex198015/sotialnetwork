const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOTAL_COUNT = 'TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount:0,
    currentPage:1,
    isFetching: false,
    followingInProgress:[]
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
            return {...state,totalUsersCount: action.totalCount }

        case TOGGLE_IS_FETCHING:
            return{...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return{...state, 
                followingInProgress: action.followingInProgress
                ? [...state.followingInProgress,action.userId]
                : state.followingInProgress.filter((id) => id !== action.userId)
            }
        default:
            return state;
    }

}

export const onFollow = (userId) => ({ type: FOLLOW, userId })
export const onUnFollow = (userId) => ({ type: UNFOLLOW, userId })
export const onSetUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({type:SET_CURRENT_PAGE,currentPage})
export const setTotalUsersCount = (totalCount) => ({type:TOTAL_COUNT,totalCount })
export const toggleIsFetching = (isFetching) => ({type:TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (followingInProgress, userId) => ({type:TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId})

export default usersReducer;