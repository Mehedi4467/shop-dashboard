
import './Pagination.css';
const Pagination = ({ pageCount, setPage, currentPage, setCurrentPage }) => {

    // const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / 3) * 3;
        return new Array(3).fill().map((_, idx) => start + idx + 1);
    };
    return (
        <div className='Page navigation'>

            <div className="pagination inline-flex space-x-2 p-2">
                {/* previous button */}


                <button
                    onClick={goToPreviousPage}
                    className={`flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100 prev ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg></button>

                {/* show page numbers */}
                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`w-10 h-10  transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100 ${currentPage === item ? 'bg-indigo-600 border border-r-0 border-indigo-600 text-white' : 'text-indigo-600'}`}>{item}</button>
                ))}




                {/* next button */}



                <button
                    onClick={goToNextPage}
                    className={`flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-indigo-100 next ${currentPage >= pageCount ? 'disabled' : ''}`}>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg></button>
            </div>
        </div >
    );
};

export default Pagination;