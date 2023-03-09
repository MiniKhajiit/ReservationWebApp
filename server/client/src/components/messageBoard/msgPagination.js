import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

export const MsgPagination = ({ nPages, currentPage, setCurrentPage}) => {
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)
    //let pages = [];

    const nextPage = () => {
        if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    

    return (
        <Pagination className="pagination-container">
            <Pagination.Prev onClick={prevPage} />
            {pageNumbers.map(pgNumber => (
                <Pagination.Item 
                    key={pgNumber}
                    className={`page-item ${currentPage === pgNumber ? 'active' : ''} `}
                    onClick={() => setCurrentPage(pgNumber)}
                >{pgNumber}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={nextPage} />
        </Pagination>
    )
}