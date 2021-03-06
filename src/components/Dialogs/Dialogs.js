import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogsItem/DialogItem'
import Message from './Message/Message'
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from './../common/FormsControls/FormControls';
import { maxLengthCreator, minLengthCreator, required } from '../../utils/validators/validators';


const maxLength100 = maxLengthCreator(100)
const minLength3 = minLengthCreator(3)

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let addNewMassage = (values) => {
        props.sendMessage(values.newMassegeBody)
    }

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    let messageElements = state.messages.map(m => <Message message={m.message} key={m.id} />);

    if (!props.isAuth) return <Redirect to={'/login'} />

    return (

        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messageElements}</div>

            </div>
            <AddMassageFormRedux onSubmit={addNewMassage} />
        </div>
    )
}

const AddMassageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} spellCheck="true" 
                validate={[required, maxLength100, minLength3]}
                name="newMassegeBody" placeholder="Enter your message" />
            </div>
            <div><button >Add message</button></div>
        </form>
    )
}

const AddMassageFormRedux = reduxForm({form: 'dialogAddMassageForm'})(AddMassageForm)

export default Dialogs;
