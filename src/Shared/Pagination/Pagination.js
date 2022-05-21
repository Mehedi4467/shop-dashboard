import Carousel from 'nuka-carousel';
import React, { useState } from 'react';

const Pagination = ({ page, setPage, pageCount, refetch }) => {

    // const [firstNumber, setFirstNumber] = useState(0);
    // const [secondNumber, setsecondNumber] = useState(3);
    // console.log("f , S", firstNumber, secondNumber)

    // const getPrevious = () => {
    //     if (page >= 0) {
    //         setPage(page - 1);

    //     }

    //     if (firstNumber > 0 && secondNumber < 2) {
    //         setFirstNumber(page - 1);
    //         setsecondNumber(page + 2 - 1);

    //     }

    // }
    // const getNext = () => {
    //     if (pageCount > page) {
    //         setPage(page + 1)

    //     }


    //     setFirstNumber(firstNumber + 1);
    //     setsecondNumber(secondNumber + 1);
    //     console.log("f , S", firstNumber, secondNumber)


    // }


    return (
        <div>
            <nav aria-label="Page navigation">
                <ul className="inline-flex space-x-2 p-2">


                    <Carousel
                        wrapAround={true}
                        slidesToShow={6}
                        autoplay={false}
                        className="w-10 px-10"
                        width='10px'

                        renderCenterLeftControls={({ previousSlide }) => (


                            <li><button onClick={previousSlide} className="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100" disabled={page <= 0}>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg></button>
                            </li>

                        )}
                        renderCenterRightControls={({ nextSlide }) => (

                            <li><button onClick={nextSlide} className="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-indigo-100" disabled={pageCount === page}>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg></button>
                            </li>
                        )}
                        renderBottomCenterControls={({ nextSlide }) => (
                            <div></div>

                        )}
                    >
                        {
                            [...Array(pageCount).keys()].map((number, index) =>
                                <li onClick={() => {

                                    setPage(number);

                                }} key={index}><button className={`w-10 h-10  transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100 ${page === number ? 'bg-indigo-600 border border-r-0 border-indigo-600 text-white' : 'text-indigo-600'}`}>{number + 1}</button></li>

                            )
                        }
                    </Carousel>


                </ul>
            </nav>
        </div>
    );
};

export default Pagination;