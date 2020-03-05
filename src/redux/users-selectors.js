import { createSelector } from "reselect";

const getUsersAll = (state) => {
    return state.usersPage.users;
}

// export const getUsersSelector = (state) => {
//     return getUsersAll(state).filter(u => true);
// }

export const getUsersSuperSelector = createSelector(getUsersAll,  (users) => {
    return users.filter(u => true)
    
}) 


export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}