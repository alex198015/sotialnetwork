import React from 'react'
import { Button } from 'react-bootstrap'
import s from './Users.module.css'
import userPhoto from './../../assets/images/user.jpg'
import Pagination from "react-js-pagination";
import { NavLink } from 'react-router-dom';




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
                                <Button disabled={props.followingInProgress.some(id => id === user.id)} variant="danger" onClick={() => {
                                    props.onUnFollow(user.id)

                                    // props.toggleFollowingProgress(true, user.id)
                                    // usersAPI.getUnFollow(user.id).then(data => {
                                    //     if (data.resultCode === 0) {
                                    //         props.onUnFollow(user.id)
                                    //     }
                                    //     props.toggleFollowingProgress(false, user.id)
                                    // })
                                }}>UNFOLLOW</Button> :
                                <Button disabled={props.followingInProgress.some(id => id === user.id)} variant="success" onClick={() => {
                                    props.onFollow(user.id)

                                    // props.toggleFollowingProgress(true, user.id)
                                    // usersAPI.getFollow(user.id).then(data => {
                                    //     if (data.resultCode === 0) {
                                    //         props.onFollow(user.id)
                                    //     }
                                    //     props.toggleFollowingProgress(false, user.id)
                                    // })
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