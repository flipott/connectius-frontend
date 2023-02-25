export default function Pagination({postsPerPage, totalPosts, paginate, currentPage, feedPosts}) {
    const pageNumbers = [];

    for (let i=1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <ul className="pagination">
                {
                    currentPage - 1 > 0 ?
                    <button onClick={() => paginate(currentPage-1, currentPage, postsPerPage, feedPosts)}>&lt;</button>
                    :
                    <button onClick={() => paginate(currentPage-1, currentPage, postsPerPage, feedPosts)} disabled={true} >&lt;</button>
                }
                {pageNumbers.length > 9 ? (
                <>
                    {currentPage > 5 && (
                    <li className="page-item">
                        <button
                        onClick={() => paginate(1, currentPage, postsPerPage, feedPosts)}
                        className="page-link"
                        >
                        1
                        </button>
                    </li>
                    )}
                    {currentPage > 6 && (
                    <li className="page-item">
                        <span className="page-link">...</span>
                    </li>
                    )}
                    {pageNumbers
                    .filter(num => num >= currentPage - 2 && num <= currentPage + 2)
                    .map(num => (
                        <li key={num} className="page-item">
                        <button
                            onClick={() => paginate(num, currentPage, postsPerPage, feedPosts)}
                            className={num === currentPage ? "page-link selected" : "page-link"}
                        >
                            {num}
                        </button>
                        </li>
                    ))}
                    {currentPage < pageNumbers.length - 5 && (
                    <li className="page-item">
                        <span className="page-link">...</span>
                    </li>
                    )}
                    {currentPage < pageNumbers.length - 4 && (
                    <li className="page-item">
                        <button
                        onClick={() =>
                            paginate(pageNumbers.length, currentPage, postsPerPage, feedPosts)
                        }
                        className="page-link"
                        >
                        {pageNumbers.length}
                        </button>
                    </li>
                    )}
                </>
                ) : (
                pageNumbers.map(num => (
                    <li key={num} className="page-item">
                    <button
                        onClick={() => paginate(num, currentPage, postsPerPage, feedPosts)}
                        className={num === currentPage ? "page-link selected" : "page-link"}
                    >
                        {num}
                    </button>
                    </li>
                ))
)}
                {
                    currentPage + 1 > pageNumbers.length ?
                    <button onClick={() => paginate(currentPage + 1, currentPage, postsPerPage, feedPosts)} disabled={true}>&gt;</button>
                    :
                    <button onClick={() => paginate(currentPage + 1, currentPage, postsPerPage, feedPosts)}>&gt;</button>
                }            </ul>
        </>
    );
}