
import { updateNewMessageBody,sendMessage } from '../../redux/dialogs-reducer';
// import { addNewMessageActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
// import StoreContext from '../../StoreContext';
import { connect } from 'react-redux';
import { withAuthRedirect } from './../../hoc/withAuthRedirect';
import { compose } from 'redux';

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
// compose(
//     connect(mapStateToProps, {updateNewMessageBody,sendMessage}),
//     withAuthRedirect
//     )(Dialogs)


// let AuthRedirectComponent = withAuthRedirect(Dialogs);


let mapStateToProps = (state) => ({
    dialogsPage:state.dialogsPage,
})


// let mapDispatchToProps = (dispatch) => {
//     return{
//         updateNewMessageBody: (text) => {
//             dispatch(updateNewMessageActionCreator(text))
//         },
//         sendMessage: () =>  {
//             dispatch(addNewMessageActionCreator())
//         }  
//     }
// }

// const DialogsContainer = connect(mapStateToProps, {updateNewMessageBody,sendMessage})(AuthRedirectComponent);

// export default DialogsContainer;

export default compose(
    connect(mapStateToProps, {updateNewMessageBody,sendMessage}),
    withAuthRedirect
    )(Dialogs);

