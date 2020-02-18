const UPDATE_NEW_MESSAGE = 'UPDATE_NEW_MESSAGE';
const ADD_MESSAGE = 'ADD_MESSAGE';

let initialState = {
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your it-kamasutra?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' },],
        newMessageOld: '',

    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrew' },
        { id: 3, name: 'Sweta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Viktor' },
        { id: 6, name: 'Valera' },]

};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMassege = {
                id: 6,
                message: state.newMessageOld,
            }
            let stateCopy = {...state}
            stateCopy.messages = [...state.messages]
            stateCopy.messages.push(newMassege);
            stateCopy.newMessageOld = '';
            return stateCopy;
        case UPDATE_NEW_MESSAGE:{
            let stateCopy = {...state}
            stateCopy.newMessageOld = state.newMessageOld 
            stateCopy.newMessageOld = action.newMassege;
            return stateCopy;
        }
        default:
            return state;
    }


}

export const addNewMessageActionCreator = () => ({type: ADD_MESSAGE})
export const updateNewMessageActionCreator = (text) => ({
    type: UPDATE_NEW_MESSAGE,
    newMassege: text
})

export default dialogsReducer;