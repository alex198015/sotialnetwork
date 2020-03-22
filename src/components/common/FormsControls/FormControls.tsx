import React from 'react'
import s from './FormControls.module.css'
import { Field, WrappedFieldProps,WrappedFieldMetaProps } from 'redux-form';
import { FieldValidatorType } from '../../../utils/validators/validators';

type FormControlPropsType = {
    meta:WrappedFieldMetaProps
    // children:React.ReactNode
}

// type FormControlType = (params:FormControlPropsType) => React.ReactNode

const FormControl:React.FC<FormControlPropsType> = ({ meta:{touched,error }, children }) => {

    const hasError = touched && error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

 
export const Textarea:React.FC<WrappedFieldProps> = (props) => {

    const { input, meta, ...restProps } = props
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}


export const Input:React.FC<WrappedFieldProps> = (props) => {

    const { input, meta, ...restProps } = props
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}



export function createField<FormKeysType extends string>(placeholder:string | undefined, name:FormKeysType, validators: Array<FieldValidatorType>, 
           component:React.FC<WrappedFieldProps>, props = {}, text = ""){
    return (
        <div>
            <Field placeholder={placeholder}
                validate={validators}
                name={name} component={component} {...props} />{text}
        </div>
    )
}