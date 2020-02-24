import React from 'react'
import Users from './Users2';
import * as axios from 'axios'
import { setUsers, unfollowAC, followAC, setCurrentPageAC, setTotalUsersCountAC } from '../../redux/users-reducer';
import { connect } from 'react-redux';



class UsersAPIContainer extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.onSetUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.onSetUsers(response.data.items)
            })
    }

    render() {
        return <Users 
              onPageChanged={this.onPageChanged}
              users={this.props.users}
              onUnFollow={this.props.onUnFollow}
              onFollow={this.props.onFollow}
              totalUsersCount={this.props.totalUsersCount}
              currentPage={this.props.currentPage}
              pageSize={this.props.pageSize}
        />

    }
}
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
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


export default connect(mapStateToProps, mapDispatchToProps)(UsersAPIContainer)

