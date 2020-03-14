import React from 'react'
import s from './../common/FormsControls/FormControls.module.css'
import {  reduxForm } from 'redux-form'
import { Input, createField } from '../common/FormsControls/FormControls'
import { required } from '../../utils/validators/validators'
import { connect } from 'react-redux';
import { getlogIn } from './../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';




const LoginForm = ({handleSubmit,error, captchaUrl}) => {
    

    return (
        <form onSubmit={handleSubmit}>
          
            {createField("Email", "email",[required], Input )}
            {createField("Password", "password",[required], Input, {type:"password"} )}
            {createField(null, "rememberMe",[], Input, {type:"checkbox"},  "rememberMe")}
            {captchaUrl && <img src={captchaUrl} alt=""/>}
            {captchaUrl && createField("Symbols from image", "captcha",[required], Input)}
            {/* <div>
                <Field placeholder={"Email"}
                    validate={[required]}
                    name={"email"} component={Input} />
            </div>
            <div>
                <Field placeholder={"Password"} type={"password"}
                    validate={[required]}
                    name={"password"} component={Input} />
            </div>
            <div>
                <Field type={"checkbox"}

                    name={"rememberMe"} component={Input} /> remember me
                </div> */}

                {error && <div className={s.formSummaryError}>
                {error}
                </div>
                }
            <div>
                <button >Log in</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)




const Login = (props) => {
    const onSubmit = (formData) => {

        const { email, password, rememberMe,captcha } = formData
        props.getlogIn(email, password, rememberMe,captcha)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>

        </div>
    )
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl:state.auth.captchaUrl
})

export default connect(mapStateToProps, { getlogIn })(Login);