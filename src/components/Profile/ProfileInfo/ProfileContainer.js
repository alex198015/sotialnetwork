import React from 'react'
import s from './Profile.module.css'
import Profile from './Profile'
import { setUserProfile, getUserStatus, updateStatus } from './../../../redux/profile-reducer';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from './../../../hoc/withAuthRedirect';
import { compose } from 'redux';




class ProfileContainer extends React.Component {
    
    componentDidMount(){   
        
        let userId = this.props.match.params.userId
        if(!userId){
            userId = 6116;            
        }
        this.props.setUserProfile(userId);
        this.props.getUserStatus(userId);
        
        // usersAPI.getProfile(userId).then(response => {                 
        //         this.props.setUserProfile(response.data);               
        //     })

        // let userId = this.props.match.params.userId
        // if(!userId){
        //     userId = 6116;            
        // }
        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            
    }

    render() {
        
        return (
            <div className={s.content}>
                <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>                
            </div>
        )
    }
}
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)


let mapStateToProps = (state) => ({
    profile:state.profilePage.profile,
    status: state.profilePage.status
})

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

// export default connect(mapStateToProps,{setUserProfile})(WithUrlDataContainerComponent);

export default compose(
    connect(mapStateToProps,{setUserProfile, getUserStatus, updateStatus}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer)