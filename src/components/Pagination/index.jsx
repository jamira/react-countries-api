import { useCallback } from "react";

const Pagination = ({ currentPage, setCurrentPage }) => {

    const onNextPage = useCallback(() => {
        setCurrentPage(currentPage + 1)
    }, [currentPage])

    return (
        <div id='pagination'>
            <div className='paginate'>
                <button className={`btn paginate__btn${currentPage === 1 ? ' paginate__btn--disabled' : ''}`} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev Page</button>
                <button className='btn paginate__btn' onClick={onNextPage} >Next Page</button>
            </div>
        </div>
    );
}

export default Pagination;