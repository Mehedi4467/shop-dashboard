import React from 'react';
import Pagination from '../../Shared/Pagination/Pagination';

const Customers = () => {
    const orderList = [
        { _id: 1, time: 'Mar 20, 2022', phone: '01584452434', address: 'Salanga,Siraganj', method: 'Nagad', amount: '120', status: 'Confirm' },
        { _id: 2, time: 'Mar 21, 2022', phone: '01784452434', address: 'Puthiya, Pabana', method: 'Card', amount: '1200', status: 'Delivery' },
        { _id: 3, time: 'Mar 22, 2022', phone: '01384452434', address: 'Manglo,Bandarban', method: 'Roket', amount: '1020', status: 'Pending' },
        { _id: 4, time: 'Mar 23, 2022', phone: '01484452434', address: 'BashKhali,Bogura', method: 'Bank', amount: '100', status: 'Processing' },
        { _id: 5, time: 'Mar 24, 2022', phone: '01984452434', address: 'Mirpur-10, Dhaka', method: 'Bkash', amount: '130', status: 'Confirm' },
        { _id: 6, time: 'Mar 25, 2022', phone: '01884452434', address: 'Dhanmundi-32,Dhaka', method: 'Nagad', amount: '200', status: 'Delivery' },
    ]
    return (
        <div className='container mx-auto'>
            <h1 className='text-center md:text-left mb-4 text-xl font-bold'>Customers</h1>



            <div className='mt-5 '>
                <div className='relative bg-white p-4 w-full order-2 md:order-1 rounded-full'>
                    <input className='outline-0 p-2 h-12 rounded-full pl-10 text-orange-500 text-lg border-2  hover:shadow-lg w-full' type="text" name="search" placeholder='Search Name/Email/Phone' />
                    <div className='absolute right-10 top-[35%] cursor-pointer'>
                        <i class="text-green-500 fa-solid fa-magnifying-glass"></i>
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
                            <th scope="col" className="px-6 py-3">
                                PHONE
                            </th>

                            <th scope="col" className="px-6 py-3">
                                ACTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderList.map(order => <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium  dark:text-white whitespace-nowrap">
                                    6DA1
                                </th>
                                <td className="px-6 py-4">
                                    Dec 10, 2021
                                </td>
                                <td className="px-6 py-4">
                                    Md.Mehedi Hassan
                                </td>
                                <td className="px-6 py-4">
                                    mehedihassan4467@gmail.com
                                </td>
                                <td className="px-6 py-4">
                                    01784452434
                                </td>

                                <td className="px-6 py-4">
                                    <div className='flex justify-between'>

                                        <i class="cursor-pointer fa-solid fa-eye"></i>
                                        <i class="cursor-pointer fa-solid fa-trash-can"></i>
                                    </div>
                                </td >

                            </tr >)
                        }

                    </tbody >
                </table >

            </div >
            <div className='flex justify-center md:justify-end'>
                <Pagination></Pagination>
            </div>
        </div >
    );
};

export default Customers;