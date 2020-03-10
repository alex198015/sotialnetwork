import React from 'react'
import s from './Paginator.module.css'
import Pagination from "react-js-pagination";





const Paginator = ({currentPage,pageSize,totalUsersCount,onPageChanged}) => {

    return (
        
            <div className={s.page}>
               
                <Pagination
                    prevPageText='prev'
                    nextPageText='next'
                    firstPageText='first'
                    lastPageText='last'
                    activePage={currentPage}
                    itemsCountPerPage={pageSize}
                    totalItemsCount={totalUsersCount}
                    onChange={onPageChanged}
                    itemClass="page-item"
                    linkClass="page-link"
                />


           
            
            </div>
        
    )

}

export default Paginator;