import React from 'react'
// import { Button } from 'react-bootstrap'
import s from './Users.module.css'
// import userPhoto from './../../assets/images/user.jpg'
// import Pagination from "react-js-pagination";
// import { NavLink } from 'react-router-dom';
import Paginator from '../common/Paginator/Paginator';
import User from './User'



const Users = ({ currentPage, pageSize, totalUsersCount, onPageChanged, users, ...props }) => {

    return (
        <div >

            <Paginator currentPage={currentPage} pageSize={pageSize}
                totalUsersCount={totalUsersCount} onPageChanged={onPageChanged} />
            {/* <div className={s.page}>
               
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


            </div> */}
            <div className={s.users}>
                {users.map((user) => <User user={user}
                    key={user.id}
                    followingInProgress={props.followingInProgress}
                    onUnFollow={props.onUnFollow}
                    onFollow={props.onFollow}
                />

                )
                }
            </div>
        </div>
    )

}

export default Users;