import Users from './Users';
import { setUsers, unfollowAC, followAC } from './../../redux/users-reducer';
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
    return{
        users: state.usersPage.users
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
        }
    }
}


const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer;