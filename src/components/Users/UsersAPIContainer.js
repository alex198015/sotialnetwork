import React from 'react'
import Users from './Users2';
import * as axios from 'axios'
import { onSetUsers, onUnFollow, onFollow, setCurrentPage, setTotalUsersCount, toggleIsFetching } from '../../redux/users-reducer';
import { connect } from 'react-redux';
import Preloader from './../common/Preloader/Preloader';


class UsersAPIContainer extends React.Component {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.onSetUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.onSetUsers(response.data.items)
            })
    }

    render() {
        return <>
        {this.props.isFetching ? <Preloader /> : <Users 
              onPageChanged={this.onPageChanged}
              users={this.props.users}
              onUnFollow={this.props.onUnFollow}
              onFollow={this.props.onFollow}
              totalUsersCount={this.props.totalUsersCount}
              currentPage={this.props.currentPage}
              pageSize={this.props.pageSize}
              
        />}
       
        </>
    }
}
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}
// let mapDispatchToProps = (dispatch) => {
//     return {
//         onFollow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         onUnFollow: (userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         onSetUsers: (users) => {
//             dispatch(setUsers(users))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }


export default connect(mapStateToProps, {
    onFollow,
    onUnFollow,
    onSetUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching
    })(UsersAPIContainer)


