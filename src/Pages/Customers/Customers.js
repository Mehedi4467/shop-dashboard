import React, { useEffect, useState } from 'react';
import Pagination from '../../Shared/Pagination/Pagination';
import Spinner from '../../Shared/Spinner/Spinner';
import CustomerDeleteModal from './CustomerDeleteModal';
import CustomerViewModal from './CustomerViewModal';

const Customers = () => {

    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [totalItem, setTotalItem] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [customerLoading, setCustomerLoading] = useState(true);
    const [customerModal, setCustomerModal] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/customer/admin?name=${search.toLocaleLowerCase()}&page=${currentPage - 1}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }

        })
            .then(res => res.json())
            .then(data => {
                setCustomers(data)
                const count = data.length;
                const pages = Math.ceil(parseInt(count) / 10);
                setPageCount(pages);
                setTotalItem(count);
                setCustomerLoading(false);
            })
    }, [search, currentPage, customerModal])


    if (customerLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div className='container mx-auto'>
            <h1 className='text-center md:text-left mb-4 text-xl font-bold'>Customers</h1>



            <div className='mt-5 '>
                <div className='relative bg-white p-4 w-full order-2 md:order-1 rounded-full'>
                    <input onChange={(e) => setSearch(e.target.value)} className='outline-0 p-2 h-12 rounded-full pl-10 text-orange-500 text-lg border-2  hover:shadow-lg w-full' type="text" name="search" placeholder='Search Name/Email' />
                    <div className='absolute right-10 top-[35%] cursor-pointer'>
                        <i className="text-green-500 fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>

            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-[#F4F5F7] dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                JOINING DATE
                            </th>
                            <th scope="col" className="px-6 py-3">
                                NAME
                            </th>
                            <th scope="col" className="px-6 py-3">
                                EMAIL
                            </th>
                            {/* <th scope="col" className="px-6 py-3">
                                PHONE
                            </th> */}

                            <th scope="col" className="px-6 py-3">
                                ACTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customers?.map((customer, index) => <tr key={customer._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium  dark:text-white whitespace-nowrap">
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">
                                    {customer.creationTime}
                                </td>
                                <td className="px-6 py-4">
                                    {customer.name}
                                </td>
                                <td className="px-6 py-4">
                                    {customer.email}
                                </td>
                                {/* <td className="px-6 py-4">
                                    {customer.phone}
                                </td> */}

                                <td className="px-6 py-4">
                                    <div className='flex justify-between'>
                                        <label htmlFor="customer-view-modal"> <i onClick={() => setCustomerModal(customer)} className="cursor-pointer fa-solid fa-eye"></i></label>
                                        <label htmlFor="customer-delete-modal"> <i onClick={() => setCustomerModal(customer)} className="cursor-pointer fa-solid fa-trash-can"></i></label>

                                    </div>
                                </td >

                            </tr >)
                        }

                    </tbody >
                </table >

            </div >
            {
                customerModal && <CustomerViewModal setCustomerModal={setCustomerModal} customerModal={customerModal}></CustomerViewModal>
            }
            {
                customerModal && <CustomerDeleteModal setCustomerModal={setCustomerModal} customerModal={customerModal}></CustomerDeleteModal>
            }

            {
                totalItem > 10 && <div className='flex justify-center md:justify-end'>
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageCount={pageCount}></Pagination>
                </div>
            }
        </div >
    );
};

export default Customers;