import React from 'react'
import Users from './Users2';
import { onUnFollow, onFollow, setCurrentPage,getUsers } from '../../redux/users-reducer';    
import { connect } from 'react-redux';
import Preloader from './../common/Preloader/Preloader';
import { withAuthRedirect } from './../../hoc/withAuthRedirect';
import { compose } from 'redux';




class UsersAPIContainer extends React.Component {

    componentDidMount() {

        this.props.getUsers(this.props.currentPage, this.props.pageSize)

    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, this.props.pageSize)

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
                followingInProgress={this.props.followingInProgress}
                
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
        isFetching: state.usersPage.isFetching,
        followingInProgress:state.usersPage.followingInProgress
    }
}


export default compose(
    connect(mapStateToProps, {onFollow, onUnFollow, setCurrentPage, getUsers}),
    withAuthRedirect
)(UsersAPIContainer)

