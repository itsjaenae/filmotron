import React from 'react';
import '../styles/Pagination.scss';

const MyPagination = ({ currentPage, movieCount, limit, setPage }) => {
    const lastPage = Math.ceil(movieCount / limit);
    return (
        <ul className="pagination mt-4">
            {[...Array(lastPage)].map((element, i) => {
                const page = i + 1;
                return (
                    <li
                        key={i}
                        onClick={() => setPage(page)}
                        className={`${page === currentPage ? 'active' : ''}`}
                    >
                        {i + 1}
                    </li>
                );
            })}
        </ul>
    );
};

export default MyPagination;
