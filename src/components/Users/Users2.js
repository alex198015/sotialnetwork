import React from 'react'
import { Button } from 'react-bootstrap'
import s from './Users.module.css'
import * as axios from 'axios';
import userPhoto from './../../assets/images/user.jpg'



class Users extends React.Component {
    constructor(props) {
        super(props)   
    }

    componentDidMount(){
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                this.props.onSetUsers(response.data.items)
            })
    }


    render() {
        return (
            <div>
                {/* <Button variant="primary" onClick={this.getUsers}>Get Users</Button> */}
                {
                    this.props.users.map((user) => <div key={user.id}>
                        <span>
                            <div className={s.photo}>
                                <img src={user.photos.small != null ? user.photos.small : userPhoto} alt="" />
                            </div>
                            <div>
                                {user.followed ?
                                    <Button variant="danger" onClick={() => this.props.onUnFollow(user.id)}>UNFOLLOW</Button> :
                                    <Button variant="success" onClick={() => this.props.onFollow(user.id)}>FOLLOW</Button>
                                }
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{user.name}</div>
                                <div>{user.status}</div>
                            </span>
                            <span>
                                {/* <div>{user.location.country}</div>
                            <div>{user.location.city}</div> */}
                            </span>
                        </span>
                    </div>
                    )
                }
            </div>
        )
    }
}

export default Users;