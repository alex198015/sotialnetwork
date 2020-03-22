
import { usersAPI } from './../api/api';
import { updateObjectInArray } from './../utils/object-helpers';
import { UserType } from '../Types/types';
import { AppStateType } from './redux-store';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOTAL_COUNT = 'TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

// type UserType = {
//     id: number,
//     name: string,
//     status: string,
//     photos: PhotosType
// }

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id",{followed: true})
                // users: state.users.map((user) => {
                //     if (user.id === action.userId) {
                //         return { ...user, followed: true }
                //     }
                //     return user;
                // })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id",{followed: false})
                // users: state.users.map((user) => {
                //     if (user.id === action.userId) {
                //         return { ...user, followed: false }
                //     }
                //     return user;
                // })
            }
        case SET_USERS:
            return { ...state, users: [...action.users] }

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }

        case TOTAL_COUNT:
            return { ...state, totalUsersCount: action.totalCount }

        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id) => id !== action.userId)
            }
        default:
            return state;
    }

}

type ActionsTypes = OnFollowSuccessActionType | OnUnFollowSuccessActionType | OnSetUsersActionType|
 SetCurrentPageActionType | SetTotalUsersCountActionType | ToggleIsFetchingActionType | ToggleFollowingProgressActionType;

type OnFollowSuccessActionType = {
    type:typeof FOLLOW,
    userId:number
}

type OnUnFollowSuccessActionType = {
    type: typeof UNFOLLOW,
    userId:number
}

type OnSetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}

type SetCurrentPageActionType = {
    type:typeof SET_CURRENT_PAGE,
    currentPage: number
}

type SetTotalUsersCountActionType = {
    type:typeof TOTAL_COUNT,
    totalCount:number
}

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}

type ToggleFollowingProgressActionType = {
    type:typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    followingInProgress: boolean,
    userId: number
}

export const onFollowSuccess = (userId: number):OnFollowSuccessActionType => ({ type: FOLLOW, userId })
export const onUnFollowSuccess = (userId: number):OnUnFollowSuccessActionType => ({ type: UNFOLLOW, userId })
export const onSetUsers = (users:Array<UserType>):OnSetUsersActionType => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage:number):SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalCount:number):SetTotalUsersCountActionType => ({ type: TOTAL_COUNT, totalCount })
export const toggleIsFetching = (isFetching: boolean):ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (followingInProgress: boolean, userId: number):ToggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId })

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUsers = (page: number, pageSize:number):ThunkType => {

    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))

        let data = await usersAPI.getUsers(page, pageSize)
            dispatch(toggleIsFetching(false))
            dispatch(onSetUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount))
        
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number,apiMethod:any,
    actionCreator: (userId:number) => OnFollowSuccessActionType | OnUnFollowSuccessActionType) => {
    dispatch(toggleFollowingProgress(true,userId))
        let data = await apiMethod(userId)
            if (data.resultCode === 0) {
                dispatch(actionCreator(userId))
            }
            dispatch(toggleFollowingProgress(false,userId))
}

export const onFollow = (userId:number):ThunkType => {

    return async (dispatch) => {
      
        _followUnfollowFlow(dispatch, userId,usersAPI.getFollow.bind(usersAPI),onFollowSuccess)
        
        
    }
}


export const onUnFollow = (userId:number):ThunkType => {

    return async (dispatch) => {
        
        _followUnfollowFlow(dispatch, userId,usersAPI.getUnFollow.bind(usersAPI),onUnFollowSuccess)
        
    }
}


export default usersReducer;