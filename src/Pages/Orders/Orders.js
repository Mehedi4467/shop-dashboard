import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useOrders from '../../Hooks/UseOrders/useOrders';
import Pagination from '../../Shared/Pagination/Pagination';
import Spinner from '../../Shared/Spinner/Spinner';
import OrderModal from './OrderModal';

const Orders = () => {
    const [user, loading] = useAuthState(auth);
    const [orders] = useOrders(user?.email);
    const [openOrderModal, setOpenOrderModal] = useState(null);
    if (loading) {
        return <Spinner></Spinner>
    }

    console.log(orders)

    return (
        <div className='container mx-auto'>
            <h1 className='text-center md:text-left mb-4 text-xl font-bold'>Orders</h1>

            <div className='md:grid grid-cols-2 gap-4  mt-5 items-center '>


                <div className='relative  w-full  rounded-full'>
                    <input className='outline-0 p-2 h-12 rounded-full pl-10 text-orange-500 text-lg border-2  hover:shadow-lg w-full' type="text" name="search" placeholder='Search Product Name' />
                    <div className='absolute right-8 top-[25%] cursor-pointer'>
                        <i className="text-green-500 fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>

                <div className='flex justify-center md:justify-between  gap-4 mt-8 md:mt-0'>
                    <select className='outline-0 cursor-pointer border-2 hover:shadow-lg text-slate-400 h-12 w-60  rounded-full px-4' id="cars">
                        <option value="">Status</option>
                        <option value="volvo">Delivered</option>
                        <option value="saab">Pending</option>
                        <option value="opel">Processing</option>
                        <option value="audi">Cancel</option>
                    </select>
                    {/* <button className='bg-green-400 hover:bg-green-500 h-12 w-52 text-white font-bold rounded-full '>Download All Orders</button> */}
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
                                ACTIONS
                            </th>
                            <th scope="col" className="px-6 py-3">
                                INVOICE
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order, index) => <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium  dark:text-white whitespace-nowrap">
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">
                                    {order.time}
                                </td>
                                <td title={order.address} className="px-6 py-4">
                                    {order.address.slice(0, 20) + '...'}
                                </td>
                                <td className="px-6 py-4">
                                    {order.customerPhone}
                                </td>
                                <td className="px-6 py-4">
                                    {order.paymentMethod}
                                </td>
                                <td className="px-6 py-4">
                                    &#x09F3; {order.totalAmount}
                                </td>

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
                                        <label for="order-modal"><i onClick={() => setOpenOrderModal(order)} className="cursor-pointer fa-solid fa-eye"></i></label>
                                        <button><i className="text-orange-500 fas fa-file-alt"></i></button>
                                    </div>
                                </td >


                            </tr >)
                        }

                    </tbody >
                </table >
                {
                    openOrderModal && <OrderModal openOrderModal={openOrderModal}></OrderModal>
                }
            </div >
            <div className='flex justify-center md:justify-end'>
                <Pagination></Pagination>
            </div>


        </div >
    );
};

export default Orders;