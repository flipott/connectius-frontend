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
                    <button onClick={() => paginate(currentPage-1, currentPage, postsPerPage, feedPosts)}>Prev</button>
                    :
                    <button onClick={() => paginate(currentPage-1, currentPage, postsPerPage, feedPosts)} disabled={true} >Prev</button>
                }
                {pageNumbers.map(num => (
                    <li key={num} className="page-item">
                        <button onClick={() => paginate(num, currentPage, postsPerPage, feedPosts )} 
                        className={num === currentPage ? "page-link selected" : "page-link"}>
                            {num}
                        </button>
                    </li>
                ))}
                {
                    currentPage + 1 > pageNumbers.length ?
                    <button onClick={() => paginate(currentPage + 1, currentPage, postsPerPage, feedPosts)} disabled={true}>Next</button>
                    :
                    <button onClick={() => paginate(currentPage + 1, currentPage, postsPerPage, feedPosts)}>Next</button>
                }            </ul>
        </>
    );
}