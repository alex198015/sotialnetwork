const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, How are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 }],
    newPostText: "it-kamasutra.com"

};


const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_POST:
            let newPostText = state.newPostText;
            return {
                ...state,
                posts: [...state.posts, { id: 5, message: newPostText, likesCount: 0 }],
                newPostText: ''
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newPost
            };
        default:
            return state;
    }

}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newPost: text
})

export default profileReducer;