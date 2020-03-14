import React  from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator, minLengthCreator } from './../../../utils/validators/validators';
import { Textarea } from './../../common/FormsControls/FormControls';

const maxLength10 = maxLengthCreator(10)
const minLength3 = minLengthCreator(3)


// window.props = [];

// class MyPosts extends PureComponent {
//     // componentDidMount(){
//     //     setTimeout(() => {
//     //         this.setState({a:12});
//     //     }, 3000)
//     // }

//     // shouldComponentUpdate(nextProps, nextState, nextContext){
//     //     return nextProps !== this.props || nextState !== this.state
//     // }

// render(){
//     console.log("render yo");
//     // window.props.push(this.props);
//     // console.log(this.props);
    
    
//     let PostsElements = this.props.posts.map(p => <Post message={p.message} key={p.id} likesCount={p.likesCount} />);

//     let changePost = (values) => {
        
//         this.props.addPost(values.newPostText);
//     };

//     return (
//         <div className={s.postsBlock}>
//             <h3>My posts</h3>
//             <AddNewPostReduxForm onSubmit={changePost} />
           
//             <div className={s.posts}>
//                 {PostsElements}
//             </div>
//         </div>
//     )

//     }
// }

const MyPosts = React.memo((props) => {
    // componentDidMount(){
    //     setTimeout(() => {
    //         this.setState({a:12});
    //     }, 3000)
    // }

    // shouldComponentUpdate(nextProps, nextState, nextContext){
    //     return nextProps !== this.props || nextState !== this.state
    // }


    // console.log("render yo");
    // window.props.push(this.props);
    // console.log(this.props);
    
    
    // let PostsElements = props.posts.map(p => <Post message={p.message} key={p.id} likesCount={p.likesCount} />);
    let PostsElements = [...props.posts].reverse().map(p => <Post key={p.id} message={p.message}  likesCount={p.likesCount} />);

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

    
})

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