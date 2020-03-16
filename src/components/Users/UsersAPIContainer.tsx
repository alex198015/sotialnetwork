import React from 'react'
import Users from './Users2';
import { onUnFollow, onFollow,getUsers } from '../../redux/users-reducer';    
import { connect } from 'react-redux';
import Preloader from './../common/Preloader/Preloader';
// import { withAuthRedirect } from './../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getPageSize, getCurrentPage, getFollowingInProgress, getTotalUsersCount, getIsFetching, getUsersSuperSelector } from './../../redux/users-selectors';
import { UserType } from '../../Types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    totalUsersCount:number,
    pageSize: number,
    currentPage: number,
    isFetching:boolean,
    users:Array<UserType>,
    followingInProgress:Array<number>,
}

type MapDispatchPropsType = {
    
    onUnFollow:(userId:number) => void,
    onFollow:(userId:number) => void,
    getUsers:(currentPage:number,pageSize:number) => void
}

type OwnPropsType = {
    pageTitle:string,
}

type PropsType = OwnPropsType & MapDispatchPropsType & MapStatePropsType

class UsersAPIContainer extends React.Component<PropsType> {

    componentDidMount() {
        let{currentPage,pageSize} = this.props
        this.props.getUsers(currentPage,pageSize)

    }

    onPageChanged = (pageNumber:number) => {
        let{pageSize} = this.props
        // this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, pageSize)

    }

    render() {
        return <>
        <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching && <Preloader /> }<Users
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                onUnFollow={this.props.onUnFollow}
                onFollow={this.props.onFollow}
                totalUsersCount={this.props.totalUsersCount}
                currentPage={this.props.currentPage}
                pageSize={this.props.pageSize}
                followingInProgress={this.props.followingInProgress}
                
            />

        </>
    }
}



let mapStateToProps = (state:AppStateType):MapStatePropsType => {
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
    // <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState></TStateProps>
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType,AppStateType >(mapStateToProps, {onFollow, onUnFollow, getUsers}),
    // withAuthRedirect
)(UsersAPIContainer)

