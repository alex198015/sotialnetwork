import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator, minLengthCreator } from './../../../utils/validators/validators';
import { Textarea } from './../../common/FormsControls/FormControls';

const maxLength10 = maxLengthCreator(10)
const minLength3 = minLengthCreator(3)



const MyPosts = (props) => {



    let PostsElements = props.posts.map(p => <Post message={p.message} key={p.id} likesCount={p.likesCount} />);

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
                <Field component={Textarea} placeholder={"Post message"} validate={[required, maxLength10, minLength3]} name="newPostText"/>
               
            </div>
            <div>
               
                <button  >Add post</button>
            </div>
        </form>
    )
}

let AddNewPostReduxForm = reduxForm({form: "mypost"})(AddNewPost)

export default MyPosts;