import Users from './Users2';
import { setUsers, unfollowAC, followAC, setCurrentPageAC, setTotalUsersCountAC } from './../../redux/users-reducer';
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
    return{
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount:state.usersPage.totalUsersCount,
        currentPage:state.usersPage.currentPage
    }
}
let mapDispatchToProps = (dispatch) => {
    return{
        onFollow: (userId) => {
            dispatch(followAC(userId))
        },
        onUnFollow: (userId) => {
            dispatch(unfollowAC(userId))
        },
        onSetUsers: (users) => {
            dispatch(setUsers(users))
        },    
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount))
        }
    }
}


const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer;