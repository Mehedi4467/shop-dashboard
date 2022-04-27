import React from 'react';
import Pagination from '../../Shared/Pagination/Pagination';

const Orders = () => {
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
            <h1 className='text-center md:text-left mb-4 text-xl font-bold'>Orders</h1>

            <div className='md:grid grid-cols-2 gap-4  mt-5 items-center '>
                <div className='flex justify-between order-1 md:order-2 gap-4 mb-8 md:mb-0'>
                    <select className='outline-0 cursor-pointer border-2 hover:shadow-lg text-slate-400 h-12 w-52 rounded-full px-4' id="cars">
                        <option value="">Status</option>
                        <option value="volvo">Delivered</option>
                        <option value="saab">Pending</option>
                        <option value="opel">Processing</option>
                        <option value="audi">Cancel</option>
                    </select>
                    <button className='bg-green-400 hover:bg-green-500 h-12 w-52 text-white font-bold rounded-full '>Download All Orders</button>
                </div>

                <div className='relative  w-full order-2 md:order-1 rounded-full'>
                    <input className='outline-0 p-2 h-12 rounded-full pl-10 text-orange-500 text-lg border-2  hover:shadow-lg w-full' type="text" name="search" placeholder='Search Product Name' />
                    <div className='absolute right-8 top-[25%] cursor-pointer'>
                        <i class="text-green-500 fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>

            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-[#F4F5F7] dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                SR NO
                            </th>
                            <th scope="col" className="px-6 py-3">
                                TIME
                            </th>
                            <th scope="col" className="px-6 py-3">
                                SHIPPING ADDRESS
                            </th>
                            <th scope="col" className="px-6 py-3">
                                PHONE
                            </th>
                            <th scope="col" className="px-6 py-3">
                                METHOD
                            </th>
                            <th scope="col" className="px-6 py-3">
                                AMOUNT
                            </th>

                            <th scope="col" className="px-6 py-3">
                                STATUS
                            </th>

                            <th scope="col" className="px-6 py-3">
                                ACTIONS
                            </th>
                            <th scope="col" className="px-6 py-3">
                                INVOICE
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderList.map(order => <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium  dark:text-white whitespace-nowrap">
                                    1
                                </th>
                                <td className="px-6 py-4">
                                    Mar 28, 2022
                                </td>
                                <td className="px-6 py-4">
                                    Nagrig, Egypt
                                </td>
                                <td className="px-6 py-4">
                                    01957930034
                                </td>
                                <td className="px-6 py-4">
                                    Card
                                </td>
                                <td className="px-6 py-4">
                                    &#x09F3; 2000
                                </td>
                                <td className="px-6 py-4">
                                    <p className='bg-orange-200 p-1 rounded-full text-center text-blue-500'>Processing</p>
                                </td >
                                <td className="px-6 py-4">
                                    <select className='outline-0 cursor-pointer border-2 hover:shadow-lg text-slate-400 p-1 rounded-full px-4' id="cars">
                                        <option value="">Status</option>
                                        <option value="volvo">Delivered</option>
                                        <option value="saab">Pending</option>
                                        <option value="opel">Processing</option>
                                        <option value="audi">Cancel</option>
                                    </select>

                                </td >
                                <td className="px-6 py-4">
                                    <div className='flex justify-between'>
                                        <i class="cursor-pointer fa-solid fa-eye"></i>

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

export default Orders;