import React from 'react'
import s from './Profile.module.css'
import Profile from './Profile'
import { setUserProfile, getUserStatus, updateStatus, savePhoto, saveProfile } from './../../../redux/profile-reducer';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { withAuthRedirect } from './../../../hoc/withAuthRedirect';
import { compose } from 'redux';




class ProfileContainer extends React.Component {

    refreshprofile(){
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
    
    componentDidMount(){   
        
        this.refreshprofile()
        
       
            
    }
    
    componentDidUpdate(prevProps,prevState){
        if(this.props.match.params.userId !== prevProps.match.params.userId){
            this.refreshprofile()
        }
        
    }
    render() {
        
        return (
            <div className={s.content}>
                <Profile {...this.props} 
                            isOwner={!this.props.match.params.userId}
                            profile={this.props.profile} 
                            status={this.props.status} 
                            updateStatus={this.props.updateStatus}
                            savePhoto={this.props.savePhoto} 
                            saveProfile={this.props.saveProfile}  
                            />
                                         
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
    connect(mapStateToProps,{setUserProfile, getUserStatus, updateStatus,savePhoto,saveProfile}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer)