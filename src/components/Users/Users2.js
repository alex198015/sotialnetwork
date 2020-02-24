import React from 'react'
import { Button } from 'react-bootstrap'
import s from './Users.module.css'
import * as axios from 'axios';
import userPhoto from './../../assets/images/user.jpg'
import Pagination from "react-js-pagination";



class Users extends React.Component {
   
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.onSetUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.onSetUsers(response.data.items)
            })
    }


    render() {

        // let pageCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        // let pages = [];
        // for (let i = 1; i <= pageCount; i++) {
        //     pages.push(i)
        // }
        
        return (
            <div >
                <div className={s.page}>
                    {/* {pages.map(p => { */}
                    
                    <Pagination
                        prevPageText='prev'
                        nextPageText='next'
                        firstPageText='first'
                        lastPageText='last'
                        activePage={this.props.currentPage}
                        itemsCountPerPage={this.props.pageSize}
                        totalItemsCount={this.props.totalUsersCount}
                        onChange={this.onPageChanged}
                        itemClass="page-item"
                        linkClass="page-link"
                    />


                    {/* // return (<span className={this.props.currentPage === p && s.selectedPage} onClick={(e) => {this.onPageChanged(p)}}>{ p }</span> */}
                    {/* })} */}

                </div>
                <div className={s.users}>
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
            </div>
        )
    }
}

export default Users;