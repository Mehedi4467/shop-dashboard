import React from 'react';
import Spinner from '../Spinner/Spinner';


const OrderList = ({ isLoading, data, refetch }) => {




    if (isLoading) {
        return <Spinner></Spinner>
    }


    return (
        <div>
            <h1 className='text-center md:text-left my-2 text-xl font-bold'>Today Order</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-[#F4F5F7] dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ORDER TIME
                            </th>
                            <th scope="col" className="px-6 py-3">
                                CUSTOMER NAME
                            </th>
                            <th scope="col" className="px-6 py-3">
                                DELIVERY ADDRESS
                            </th>
                            <th scope="col" className="px-6 py-3">
                                PHONE
                            </th>
                            <th scope="col" className="px-6 py-3">
                                PAYMENT METHOD
                            </th>

                            <th scope="col" className="px-6 py-3">
                                ORDER AMOUNT
                            </th>
                            <th scope="col" className="px-6 py-3">
                                STATUS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map(order => <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium  dark:text-white whitespace-nowrap">
                                    {order.date} : {order.time}
                                </th>
                                <td className="px-6 py-4">
                                    {order.customerName}
                                </td>
                                <td className="px-6 py-4">
                                    {order.customerState}-{order.customerCity}
                                </td>
                                <td className="px-6 py-4">
                                    {order.customerPhone}
                                </td>
                                <td className="px-6 py-4">
                                    {order.paymentMethod}
                                </td>

                                <td className="px-6 py-4">
                                    {order.totalPrice} &#x09F3;
                                </td>
                                <td className="px-6 py-4">
                                    <p className='bg-orange-200 p-1 rounded-full text-center text-blue-500'>{order.status}</p>
                                </td >

                            </tr >).reverse()
                        }

                    </tbody >
                </table >

            </div >

        </div >
    );
};

export default OrderList;