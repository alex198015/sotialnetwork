// import React from 'react'
import { addPostActionCreator} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
// import StoreContext from '../../../StoreContext';



// const MyPostsContainer = () => {

//     // let state = props.store.getState();

//     // let addPost = () => {
//     //     props.store.dispatch(addPostActionCreator())
//     // };

//     // let onPostChange = (text) => {
//     //     let action = updateNewPostTextActionCreator(text)
//     //     props.store.dispatch(action);
//     // }

//     return (
//         <StoreContext.Consumer>
//            { store => {
//                 let state = store.getState();
//                 let addPost = () => {
//                     store.dispatch(addPostActionCreator())
//                 };
            
//                 let onPostChange = (text) => {
//                     let action = updateNewPostTextActionCreator(text)
//                         store.dispatch(action);
//                 }
           
//                return (<MyPosts updateNewPostText={onPostChange}
//                     addPost={addPost}
//                     posts={state.profilePage.posts}
//                     newPostText={state.profilePage.newPostText}
//                 />) }
//         }
//         </StoreContext.Consumer>
//     )
// }

let mapStateToProps = (state) => {
    return{
        // newPostText:state.profilePage.newPostText,
        posts:state.profilePage.posts
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
       addPost: (newPostTextext) => {
            dispatch(addPostActionCreator(newPostTextext))
        },
        // updateNewPostText:(text) => {
        //     let action = updateNewPostTextActionCreator(text)
        //     dispatch(action);
        // }
     
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostsContainer;