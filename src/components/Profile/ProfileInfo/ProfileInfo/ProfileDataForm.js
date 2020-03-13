import React from 'react'
import s from './ProfileInfo.module.css'
import { createField, Input, Textarea } from './../../../common/FormsControls/FormControls';
import { reduxForm } from 'redux-form';
import style from './../../../common/FormsControls/FormControls.module.css'

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return(
        <form className={s.profile} onSubmit={handleSubmit}>
            <div><button onClick={() => {}}>save</button></div>
            {error && <div className={style.formSummaryError}>
                {error}
                </div>
                }
                <div>
                    <b>Full name</b> : {createField("Full name", "fullName", [], Input)}
                </div>
                <div>
                   <b> looking for a job </b> : 
                   {createField("", "lookingForAJob", [], Input,{type: "checkbox"})}
                </div>
                
                <div>
                   <b> My proffesional skills </b> : 
                   {createField("Your proffesional skills", "lookingForAJobDescription", [], Textarea)}
                </div>
                
                <div>
                <b>About me </b> : 
                {createField("About Me", "aboutMe", [], Textarea)}
                </div>
                <div>
                <b>Contacts</b> : {Object.keys(profile.contacts).map((key) => {
                    return (
                        
                        <div key={key}>
                          <b>{key} : {createField(key, "contacts." + key, [], Input)} </b>
                        </div> 
                                                          
                    )

                })}
                </div>
                
            </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({form:"edit-profile"})(ProfileDataForm)

export default ProfileDataFormReduxForm;