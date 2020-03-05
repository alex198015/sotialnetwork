import React from 'react'
import Users from './Users2';
import { onUnFollow, onFollow,getUsers } from '../../redux/users-reducer';    
import { connect } from 'react-redux';
import Preloader from './../common/Preloader/Preloader';
// import { withAuthRedirect } from './../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getPageSize, getCurrentPage, getFollowingInProgress, getTotalUsersCount, getIsFetching, getUsersSuperSelector } from './../../redux/users-selectors';




class UsersAPIContainer extends React.Component {

    componentDidMount() {

        this.props.getUsers(this.props.currentPage, this.props.pageSize)

    }

    onPageChanged = (pageNumber) => {
        // this.props.setCurrentPage(pageNumber)
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
        users: getUsersSuperSelector(state),
        
        // users: getUsersAll(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress:getFollowingInProgress(state)
    }
}


export default compose(
    connect(mapStateToProps, {onFollow, onUnFollow, getUsers}),
    // withAuthRedirect
)(UsersAPIContainer)

