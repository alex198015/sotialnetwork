const ADD_MESSAGE = 'ADD_MESSAGE';

type DialogsType ={
    id: number,
    name: string
}

type MessageType = {
    id: number,
    message: string
}

let initialState = {
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your it-kamasutra?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' },] as Array<MessageType>,


    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrew' },
        { id: 3, name: 'Sweta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Viktor' },
        { id: 6, name: 'Valera' },] as Array<DialogsType>

};

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any):InitialStateType => {
    
    switch (action.type) {
        case ADD_MESSAGE:
            let body = action.newMassegeBody;
                 return {
                ...state,
                messages:[...state.messages,{id: 6,message: body}],
            }  
        default:
            return state;
    }


}

type SendMessageActionTypa = {
    type: typeof ADD_MESSAGE,
    newMassegeBody: string
}

export const sendMessage = (newMassegeBody: string): SendMessageActionTypa => ({type: ADD_MESSAGE, newMassegeBody})


export default dialogsReducer;