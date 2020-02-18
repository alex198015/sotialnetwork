// import React from 'react';
import { updateNewMessageActionCreator } from '../../redux/dialogs-reducer';
import { addNewMessageActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
// import StoreContext from '../../StoreContext';
import { connect } from 'react-redux';

// const DialogsContainer = () => {

//     // let state = props.store.getState().dialogsPage;

//     // let onSendMessageClick = () => props.store.dispatch(addNewMessageActionCreator())


//     // let onNewMessageChange = (text) => {

//     //     props.store.dispatch(updateNewMessageActionCreator(text))
//     // }



//     return (
//         <StoreContext.Consumer>
//             {store => {
//                 let state = store.getState().dialogsPage;
//                 let onSendMessageClick = () => store.dispatch(addNewMessageActionCreator())

//                 let onNewMessageChange = (text) => {
//                     store.dispatch(updateNewMessageActionCreator(text))
//                 }

//                 return (<Dialogs updateNewMessageBody={onNewMessageChange}
//                     sendMessage={onSendMessageClick}
//                     dialogsPage={state}
//                 />)
//             }
//         }
//         </StoreContext.Consumer>
//     )
// }
let mapStateToProps = (state) => {
    return{
        dialogsPage:state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch) => {
    return{
        updateNewMessageBody: (text) => {
            dispatch(updateNewMessageActionCreator(text))
        },
        sendMessage: () =>  {
            dispatch(addNewMessageActionCreator())
        }  
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
