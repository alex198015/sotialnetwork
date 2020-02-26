import React from 'react'
import { Button } from 'react-bootstrap'
import s from './Users.module.css'
import userPhoto from './../../assets/images/user.jpg'
import Pagination from "react-js-pagination";
import { NavLink } from 'react-router-dom';
import * as axios from 'axios'


const Users = (props) => {

    return (
        <div >
            <div className={s.page}>
                {/* {pages.map(p => { */}

                <Pagination
                    prevPageText='prev'
                    nextPageText='next'
                    firstPageText='first'
                    lastPageText='last'
                    activePage={props.currentPage}
                    itemsCountPerPage={props.pageSize}
                    totalItemsCount={props.totalUsersCount}
                    onChange={props.onPageChanged}
                    itemClass="page-item"
                    linkClass="page-link"
                />


                {/* // return (<span className={this.props.currentPage === p && s.selectedPage} onClick={(e) => {this.onPageChanged(p)}}>{ p }</span> */}
                {/* })} */}

            </div>
            <div className={s.users}>
                {props.users.map((user) => <div key={user.id}>
                    <span>
                        <div className={s.photo}>
                            <NavLink to={'/profile/' + user.id}><img src={user.photos.small != null ? user.photos.small : userPhoto} alt="" /></NavLink>
                        </div>
                        <div>
                            {user.followed ?
                                <Button variant="danger" onClick={() => {
                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {withCredentials: true,
                                    headers: {
                                        'API-KEY': '03747c73-73c7-4c3d-ac0e-45ed1bff5da9'
                                    }
                                
                                
                                })
                                    .then(response => {
                                        if(response.data.resultCode === 0){
                                            props.onUnFollow(user.id)
                                   } })
                                    props.onUnFollow(user.id)

                                }}>UNFOLLOW</Button> :
                                <Button variant="success" onClick={() => {
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {}, {withCredentials: true,
                                    headers: {
                                        'API-KEY': '03747c73-73c7-4c3d-ac0e-45ed1bff5da9'
                                    }
                                
                                })
                                        .then(response => {
                                            if(response.data.resultCode === 0){
                                             props.onFollow(user.id)
                                       } })

                                   

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
                            {/* <div>{user.location.country}</div>
                            <div>{user.location.city}</div> */}
                        </span>
                    </span>
                </div>
                )
                }
            </div>
        </div>
    )

}

export default Users;