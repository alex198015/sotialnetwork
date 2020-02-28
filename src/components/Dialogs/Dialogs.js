import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogsItem/DialogItem'
import Message from './Message/Message'
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';



const Dialogs = (props) => {
    
    let state = props.dialogsPage;
    
    let onSendMessageClick = () => props.sendMessage()



    let newMassegeBody = state.newMessageOld;

    let onNewMessageChange = (e) => {
        let text = e.target.value;
        props.updateNewMessageBody(text)
        
    }

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    let messageElements = state.messages.map(m => <Message message={m.message} key={m.id} />);

    if(!props.isAuth) return <Redirect to={'/login'}/>

    return (
        
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messageElements}</div>
                <div>
                    <div><textarea spellCheck="true" placeholder="Enter your message" onChange={onNewMessageChange}  value={newMassegeBody} /></div>
                    {/* <div><button onClick={onSendMessageClick}>Add message</button></div> */}
                    <Button variant="success" onClick={onSendMessageClick}>Add message</Button>
                </div>
            </div>
            
        </div>
    )
}

export default Dialogs;
