import profileReducer, { addPostActionCreator, deletePost } from './profile-reducer'
import React from 'react';
import ReactDOM from 'react-dom';

let state = {
    posts: [
        { id: 1, message: 'Hi, How are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 }]
    

};

it('length of post should be incremented', () => {
    let action = addPostActionCreator("it-kamasutra.com");
    
    let newPost = profileReducer(state,action);
    expect(newPost.posts.length).toBe(5);
    
});

it('message of new post should be correct', () => {
    let action = addPostActionCreator("it-kamasutra.com");
    
    let newPost = profileReducer(state,action);
    
    expect(newPost.posts[4].message).toBe("it-kamasutra.com");
});

it('after deleting length of messages should be decrement', () => {
    let action = deletePost(1);
    
    let newPost = profileReducer(state,action);
    
    expect(newPost.posts.length).toBe(3);
});

it('after deleting length  should not be decrement if id is incorrect', () => {
    let action = deletePost(1000);
    
    let newPost = profileReducer(state,action);
    
    expect(newPost.posts.length).toBe(4);
});

