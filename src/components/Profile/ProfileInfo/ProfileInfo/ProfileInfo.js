import React  from 'react';
import s from './ProfileInfo.module.css'
import Preloader from '../../../common/Preloader/Preloader';


const ProfileInfo= (props) => {
    if(!props.profile){
        return <Preloader/>
    }
    
    return(
        <div className={s.item}>
            <div >
            {/* <img src="https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg" alt="12"></img> */}
            </div>
            <div>
                <img src={props.profile.photos.large}/>
                <div>{props.profile.fullName}</div>
                <div>{props.profile.aboutMe}</div>
                <div>Ищу работу: {props.profile.lookingForAJobDescription}</div>
                <div >Instagram: {props.profile.contacts.instagram}</div>
            </div>
            

        </div>
    )
}
export default ProfileInfo;