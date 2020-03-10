import React from 'react'
import { Button } from 'react-bootstrap'
import s from './Users.module.css'
import userPhoto from './../../assets/images/user.jpg'
import { NavLink } from 'react-router-dom';




const User = ({user, followingInProgress, onUnFollow, onFollow}) => {

    return (
        <div >

                    <span>
                        <div className={s.photo}>
                            <NavLink to={'/profile/' + user.id}><img src={user.photos.small != null ? user.photos.small : userPhoto} alt="" /></NavLink>
                        </div>
                        <div>
                            {user.followed ?
                                <Button disabled={followingInProgress.some(id => id === user.id)} variant="danger" onClick={() => {
                                    onUnFollow(user.id)

                                   
                                }}>UNFOLLOW</Button> :
                                <Button disabled={followingInProgress.some(id => id === user.id)} variant="success" onClick={() => {
                                    onFollow(user.id)

                                   
                                }}>FOLLOW</Button>
                            }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                           
                        </span>
                    </span>
                </div>
                )
                }
            
    



export default User;