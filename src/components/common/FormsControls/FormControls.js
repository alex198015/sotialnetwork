import React from 'react'
import s from './FormControls.module.css'
import { Field } from 'redux-form';


const FormControl = ({ input, meta:{touched,error }, ...props }) => {

    const hasError = touched && error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {

    const { input, meta, ...restProps } = props
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}


export const Input = (props) => {

    const { input, meta, ...restProps } = props
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export const createField = (placeholder, name, validators, component, props = {}, text = "") => {
    return (
        <div>
            <Field placeholder={placeholder}
                validate={validators}
                name={name} component={component} {...props} />{text}
        </div>
    )
}