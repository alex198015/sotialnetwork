import React, { useState,FC } from 'react';
import s from './ProfileInfo.module.css'
import Preloader from '../../../common/Preloader/Preloader';
// import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from './../../../../assets/images/user.jpg'
import ProfileDataFormReduxForm from './ProfileDataForm';
import {ProfileType, PhotosType} from './../../../../Types/types'
import { AxiosResponse } from 'axios';

type PropsType = {
    profile:ProfileType,
    status: string, 
    updateStatus:(status: string) => void, 
    savePhoto:(file:PhotosType) => void,
    isOwner: boolean, 
    saveProfile:(profile:ProfileType) => void,
    goToEditMode:() => void
    contactTitle:string,
    contactValue:string
}


const ProfileInfo: FC<PropsType> = ({ profile, status, updateStatus, savePhoto,isOwner, saveProfile }) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }

    }

    
    const onSubmit = (formData:ProfileType) => {

        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );   
        
    }

    return (
        <div className={s.item}>
            <div >
                {/* <img src="https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg" alt="12"></img> */}
            </div>
            <div>
                <img src={profile.photos.large || userPhoto} className={s.mainphoto} alt="" />
                {isOwner ? <input type={"file"} onChange={onMainPhotoSelected} /> : null}
                {editMode ? <ProfileDataFormReduxForm onSubmit={onSubmit} initialValues={profile} profile={profile}/> 
                :<ProfileData goToEditMode={() => {setEditMode(true)}} profile={profile} isOwner={isOwner}/> }
                
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />

            </div>
        </div>

    )
}



const ProfileData:FC<PropsType> = ({profile,isOwner, goToEditMode}) => {
    return(
        <div className={s.profile}>
            {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
                    <div>
                        <b>Full name</b> : {profile.fullName}
                    </div>
                    <div>
                       <b> looking for a job </b> : {profile.lookingForAJob ? "Yes" : "No"}
                    </div>
                    {profile.lookingForAJob &&
                    <div>
                       <b> My proffesional skills </b> : {profile.lookingForAJobDescription}
                    </div>
                    }
                    <div>
                    <b>About me </b> : {profile.aboutMe}
                    </div>
                    <div>
                    <b>Contacts</b> : {Object.keys(profile.contacts).map((key) => {
                        return <Contact key={key} contactTitle={key}
                        contactValue={profile.contacts[key]}
                        />
                    })}
                    </div>
                </div>
    )
}




const Contact:FC<PropsType> = ({contactTitle,contactValue}) => {
    return(
        <div>
            <b className={s.mycontacts}>{contactTitle}</b> : {contactValue}
        </div>
    )
}

export default ProfileInfo;