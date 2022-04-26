import React from 'react';

const OrderList = () => {

    const orderList = [
        { _id: 1, time: 'Mar 20, 2022', phone: '01584452434', address: 'Salanga,Siraganj', method: 'Nagad', amount: '120', status: 'Confirm' },
        { _id: 2, time: 'Mar 21, 2022', phone: '01784452434', address: 'Puthiya, Pabana', method: 'Card', amount: '1200', status: 'Delivery' },
        { _id: 3, time: 'Mar 22, 2022', phone: '01384452434', address: 'Manglo,Bandarban', method: 'Roket', amount: '1020', status: 'Pending' },
        { _id: 4, time: 'Mar 23, 2022', phone: '01484452434', address: 'BashKhali,Bogura', method: 'Bank', amount: '100', status: 'Processing' },
        { _id: 5, time: 'Mar 24, 2022', phone: '01984452434', address: 'Mirpur-10, Dhaka', method: 'Bkash', amount: '130', status: 'Confirm' },
        { _id: 6, time: 'Mar 25, 2022', phone: '01884452434', address: 'Dhanmundi-32,Dhaka', method: 'Nagad', amount: '200', status: 'Delivery' },
    ]

    return (
        <div>
            <h1 className='my-2 text-xl font-bold'>Recent Order</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-[#F4F5F7] dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ORDER TIME
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
                            orderList.map(order => <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium  dark:text-white whitespace-nowrap">
                                    {order.time}
                                </th>
                                <td className="px-6 py-4">
                                    {order.address}
                                </td>
                                <td className="px-6 py-4">
                                    {order.phone}
                                </td>
                                <td className="px-6 py-4">
                                    {order.method}
                                </td>
                                <td className="px-6 py-4">
                                    &#x09F3; {order.amount}
                                </td>
                                <td className="px-6 py-4">
                                    <p className='bg-orange-200 p-1 rounded-full text-center text-blue-500'>{order.status}</p>
                                </td >

                            </tr >)
                        }

                    </tbody >
                </table >
            </div >

        </div >
    );
};

export default OrderList;