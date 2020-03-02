import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post';
// import { Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';






const MyPosts = (props) => {



    let PostsElements = props.posts.map(p => <Post message={p.message} key={p.id} likesCount={p.likesCount} />);

    // let newPostElement = React.createRef();

    // let onAddPost = () => {
    //     props.addPost();
    // };


    let changePost = (values) => {
        
        props.addPost(values.newPostText);
    };

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostReduxForm onSubmit={changePost} />
           
            <div className={s.posts}>
                {PostsElements}
            </div>
        </div>
    )


}



let AddNewPost = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component="textarea" name="newPostText"/>
               
            </div>
            <div>
               
                <button bsPrefix={s.btn} >Add post</button>
            </div>
        </form>
    )
}

let AddNewPostReduxForm = reduxForm({form: "mypost"})(AddNewPost)

export default MyPosts;