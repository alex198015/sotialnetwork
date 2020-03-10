import React  from 'react';
import s from './ProfileInfo.module.css'
import Preloader from '../../../common/Preloader/Preloader';
// import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';


const ProfileInfo= ({profile,status, updateStatus}) => {
    if(!profile){
        return <Preloader/>
    }
    
    return(
        <div className={s.item}>
            <div >
            <img src="https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg" alt="12"></img>
            </div>
            <div>
                <img src={profile.photos.large} alt=""/>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                
            </div>
            

        </div>
        
    )
}
export default ProfileInfo;