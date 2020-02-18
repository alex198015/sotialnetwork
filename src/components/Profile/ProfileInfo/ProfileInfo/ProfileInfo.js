import React  from 'react';
import s from './ProfileInfo.module.css'

const ProfileInfo= (props) => {
    return(
        <div className={s.item}>
            <div className={s.picture}>
            <img src="https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg" alt="12"></img>
            </div>
            <div>
                ava + discription
            </div>
            

        </div>
    )
}
export default ProfileInfo;