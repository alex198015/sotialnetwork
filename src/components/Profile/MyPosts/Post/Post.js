import React from 'react';
import s from './Post.module.css'


const Post = (props) => {
    
    return(
        <div className={s.item}>
            
            <img className={s.picture} src="https://www.meme-arsenal.com/memes/cd2652ae9d5c44e3c695d72fd37f647e.jpg" alt="3"/>
            
            {props.message}
            <div>
        <span>like</span>{props.likesCount}
        
            </div>
        </div>

    )
}

export default Post;