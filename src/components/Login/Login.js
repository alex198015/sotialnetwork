import React from 'react'
import s from './../common/FormsControls/FormControls.module.css'
import { Field, reduxForm } from 'redux-form'
import { Input, createField } from '../common/FormsControls/FormControls'
import { required } from '../../utils/validators/validators'
import { connect } from 'react-redux';
import { getlogIn } from './../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';




const LoginForm = ({handleSubmit,error}) => {
    

    return (
        <form onSubmit={handleSubmit}>
          
            {createField("Email", "email",[required], Input )}
            {createField("Password", "password",[required], Input, {type:"password"} )}
            {createField(null, "rememberMe",[], Input, {type:"checkbox"},  "rememberMe")}
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

        const { email, password, rememberMe } = formData
        props.getlogIn(email, password, rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />

        </div>
    )
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { getlogIn })(Login);