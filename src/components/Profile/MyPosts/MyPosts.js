import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post';
import { Button } from 'react-bootstrap';






const MyPosts = (props) => {
    
    

    let PostsElements = props.posts.map(p => <Post message={p.message} key={p.id} likesCount={p.likesCount} />);

    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();
    };
        

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    };

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <textarea onChange={onPostChange} ref={newPostElement} 
                value={props.newPostText}/>
            </div>
            <div>
                {/* <button onClick={onAddPost}>Add post</button> */}
                <Button  bsPrefix={s.btn} onClick={onAddPost}>Add post</Button>
            </div>
            <div className={s.posts}>
                {PostsElements}
            </div>
        </div>
    )


}
export default MyPosts;