import React from 'react'
import { Button } from 'react-bootstrap'
import s from './Users.module.css'

const Users = (props) => {
    // props.onSetUsers()
    return (
        <div>
            {
                props.users.map((user) => <div key={user.id}>
                    <span>
                        <div className={s.photo}>
                            <img src={user.fotoURL} />
                        </div>
                        <div>
                            {user.followed ?
                                <Button variant="danger" onClick={() => { props.onUnFollow(user.id) }}>UNFOLLOW</Button> :
                                <Button variant="success" onClick={() => { props.onFollow(user.id) }}>FOLLOW</Button>
                            }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.fullName}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{user.location.country}</div>
                            <div>{user.location.city}</div>
                        </span>
                    </span>
                </div>
                )
            }
        </div>
    )
}


export default Users;