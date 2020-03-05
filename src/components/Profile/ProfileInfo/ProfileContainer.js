import React from 'react'
import s from './Profile.module.css'
import Profile from './Profile'
import { setUserProfile, getUserStatus, updateStatus } from './../../../redux/profile-reducer';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { withAuthRedirect } from './../../../hoc/withAuthRedirect';
import { compose } from 'redux';




class ProfileContainer extends React.Component {
    
    componentDidMount(){   
        
        let userId = this.props.match.params.userId
        if(!userId){
            userId = this.props.loggedUserId;
            if(!userId) {

                this.props.history.push("/login");
            }           
        }
        this.props.setUserProfile(userId);
        this.props.getUserStatus(userId);
        
       
            
    }

    render() {
        
        return (
            <div className={s.content}>
                <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>                
            </div>
        )
    }
}


let mapStateToProps = (state) => ({
    profile:state.profilePage.profile,
    status: state.profilePage.status,
    loggedUserId: state.auth.userId,
    // iaAuth: state.profilePage.iaAuth
})


export default compose(
    connect(mapStateToProps,{setUserProfile, getUserStatus, updateStatus}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer)