import React from 'react'
import Users from './Users2';
import * as axios from 'axios'
import { onSetUsers, onUnFollow, onFollow, setCurrentPage, setTotalUsersCount, toggleIsFetching } from '../../redux/users-reducer';
import { connect } from 'react-redux';
import Preloader from './../common/Preloader/Preloader';
import { usersAPI } from './../../api/api';


class UsersAPIContainer extends React.Component {

    componentDidMount() {
        this.props.toggleIsFetching(true)

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.onSetUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount)
        })

    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.onSetUsers(data.items)
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


