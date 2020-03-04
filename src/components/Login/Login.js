import React from 'react'
import s from './Login.module.css'
import { Field, reduxForm } from 'redux-form'
import { Input } from '../common/FormsControls/FormControls'
import { required } from '../../utils/validators/validators'
import { connect } from 'react-redux';
import { getlogIn } from './../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';




const LoginForm = (props) => {
    
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
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

                name={"rememberMe"} component={Input}/> remember me
                </div>
            <div>
                <button >Log in</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)
    
    
  

const Login = (props) => {
    const onSubmit = (formData) => {
        
        const {email, password, rememberMe} = formData
        props.getlogIn(email, password, rememberMe)
    }
    if (props.isAuth){
        return <Redirect to = {'/profile'}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>

        </div>
    )
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
 
export default connect(mapStateToProps ,{getlogIn})(Login);