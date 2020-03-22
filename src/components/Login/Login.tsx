import React from 'react'
import s from './../common/FormsControls/FormControls.module.css'
import {  reduxForm, InjectedFormProps } from 'redux-form'
import { Input, createField } from '../common/FormsControls/FormControls'
import { required } from '../../utils/validators/validators'
import { connect } from 'react-redux';
import { getlogIn } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store'

type LoginFormIsOwnProps = {
    captchaUrl:string | null
}


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType> & LoginFormIsOwnProps> = ({handleSubmit,error, captchaUrl}) => {
    

    return (
        <form onSubmit={handleSubmit}>
          
            {createField<LoginFormValuesTypeKeys>("Email","email" ,[required], Input )}
            {createField<LoginFormValuesTypeKeys>("Password", "password",[required], Input, {type:"password"} )}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe",[], Input, {type:"checkbox"},  "rememberMe")}
            {captchaUrl && <img src={captchaUrl} alt=""/>}
            {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha",[required], Input)}
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

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormIsOwnProps>({ form: 'login' })(LoginForm)

type MyStatePropsType = {
    isAuth:boolean,
    captchaUrl:string | null
}

type MapDispatchPropsType = {
    getlogIn:(email:string, password :string, rememberMe: boolean,captcha: string) => void
}

export type LoginFormValuesType = {
    email:string, 
    password :string, 
    rememberMe: boolean,
    captcha: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>



const Login: React.FC<MyStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData:LoginFormValuesType) => {

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
const mapStateToProps = (state:AppStateType):MyStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl:state.auth.captchaUrl
})

export default connect<MyStatePropsType, MapDispatchPropsType, LoginFormIsOwnProps,AppStateType>(mapStateToProps, { getlogIn })(Login);