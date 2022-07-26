import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Pagination from '../../Shared/Pagination/Pagination';
import Spinner from '../../Shared/Spinner/Spinner';
import OrderModal from './OrderModal';
import OrderPdf from './OrderPdf';
import useOrders from '../../Hooks/UseOrders/useOrders';
import useAdmin from '../../Hooks/useAdmin';




const Orders = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [user, loading] = useAuthState(auth);
    const [orders, pageCount, totalItem, dataLodiang, setSearch, setStatus, setTotalItem, setPageCount, openOrderModal, setOpenOrderModal] = useOrders(user?.email, currentPage);

    const [admin, adminLoading] = useAdmin(user);
    // console.log(orders)


    // console.log(totalPrice)
    const orderStatusUpdate = (id, value) => {
        const status = { value }
        fetch(`http://localhost:5000/order/status/${id}?email=${user?.email}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(status)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged && data.modifiedCount > 0) {
                    toast('Your Order Status update Successfully ');
                }
            })
    };

    useEffect(() => {

        fetch(`http://localhost:5000/order/dashboard/count/${user?.email}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const count = data.count;
                const pages = Math.ceil(parseInt(count) / 10);
                setPageCount(pages);
                setTotalItem(count);

            })
    }, [])


    const handelResetStatus = (event) => {
        setStatus('');
        event.preventDefault();
        event.target.reset();
    }

    const handelStatusSearch = (value) => {
        setStatus(value);
    }


    if (loading || dataLodiang || adminLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div className='container mx-auto'>
            <h1 className='text-center md:text-left mb-4 text-xl font-bold'>Orders</h1>

            <div className='md:grid grid-cols-2 gap-4  mt-5 items-center '>
                <div className='relative  w-full  rounded-full'>
                    <input onChange={(e) => setSearch(e.target.value)} className='outline-0 p-2 h-12 rounded-full pl-10 text-orange-500 text-lg border-2  hover:shadow-lg w-full' type="text" name="search" placeholder='Search Order ID' />
                    <div className='absolute right-8 top-[25%] cursor-pointer'>
                        <i className="text-green-500 fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>

                <div className='flex justify-center md:justify-between  gap-4 mt-8 md:mt-0'>
                    <form onSubmit={handelResetStatus}>
                        <select onChange={(e) => handelStatusSearch(e.target.value)} className='outline-0 cursor-pointer border-2 hover:shadow-lg text-slate-400 h-12 w-60  rounded-full px-4' id="cars">
                            <option value="">Status Search</option>
                            <option>Pending</option>
                            <option>Processing</option>
                            <option>Delivered</option>
                            <option>Completed</option>
                            <option>Cancel</option>
                        </select>
                        <button><i className="ml-2 text-orange-500 fas fa-times-circle"></i></button>

                    </form>

                </div>

            </div>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-[#F4F5F7] dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {/* <th scope="col" className="px-6 py-3">
                                SR NO
                            </th> */}
                            <th scope="col" className="px-2  py-3">
                                DATE AND TIME
                            </th>
                            <th scope="col" className="px-2 py-3">
                                CUSTOMER NAME
                            </th>
                            <th scope="col" className="px-2 py-3">
                                SHIPPING ADDRESS
                            </th>
                            <th scope="col" className="px-2 py-3">
                                PHONE
                            </th>

                            <th scope="col" className="px-2 py-3">
                                AMOUNT
                            </th>
                            <th scope="col" className="px-2 py-3">
                                PAYMENT METHOD
                            </th>
                            <th scope="col" className="px-2 py-3">
                                ACTIONS
                            </th>
                            <th scope="col" className="px-2 py-3">
                                INVOICE
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order, index) => <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                                <td className="px-6  py-4">
                                    <p className='w-28'>{order.date} : {order.time}</p>
                                </td>
                                <td className="px-6 py-4">
                                    {order.customerName}
                                </td>
                                <td title={order.address} className="px-6 py-4">
                                    {order.customerState}-{order.customerCity}
                                </td>
                                <td className="px-6 py-4">
                                    {order.customerPhone}
                                </td>

                                <td className="px-6 py-4">
                                    {admin ? order.totalPrice : order?.products?.reduce((previousValue, currentValue) => previousValue + (currentValue?.productTotalPrice + parseInt(currentValue.deliveryCharge)), 0)}  &#x09F3;
                                </td>
                                <td className="px-6 py-4">
                                    {order.paymentMethod}
                                </td>

                                {
                                    admin && order.status !== 'Cancel' ? <td className="px-6 py-4">
                                        <select onChange={(e) => orderStatusUpdate(order._id, e.target.value)} className='outline-0 cursor-pointer border-2 hover:shadow-lg text-slate-400 p-1 rounded-full px-4' id="cars">
                                            <option className='text-orange-600' defaultValue={order.status} selected disabled>{order.status}</option>
                                            <option>Pending</option>
                                            <option>Processing</option>
                                            <option>Delivered</option>
                                            <option>Completed</option>
                                            <option>Cancel</option>
                                        </select>

                                    </td > : order.status !== 'Cancel' ? <td className="px-6 py-4">
                                        <select onChange={(e) => orderStatusUpdate(order._id, e.target.value)} className='outline-0 cursor-pointer border-2 hover:shadow-lg text-slate-400 p-1 rounded-full px-4' id="cars">
                                            <option className='text-orange-600' defaultValue={order?.products[0]?.status} selected disabled>{order?.products[0]?.status}</option>
                                            <option>Pending</option>
                                            <option>Processing</option>
                                            <option>Delivered</option>
                                            <option>Completed</option>
                                            <option>Cancel</option>
                                        </select>

                                    </td > : <td><p className='text-orange-500 text-center'>Cancel</p></td>
                                }

                                <td className="px-6 py-4">
                                    <div className='flex gap-x-4 justify-between'>
                                        <label htmlFor="my-modal-60"><i onClick={() => setOpenOrderModal(order)} className="cursor-pointer fa-solid fa-eye"></i></label>
                                        <label htmlFor="pdf-modal"><i onClick={() => setOpenOrderModal(order)} className="text-orange-500 fas fa-file-alt cursor-pointer"></i></label>

                                    </div>
                                </td >


                            </tr >)
                        }

                    </tbody >
                </table >
                {
                    openOrderModal && <OrderModal admin={admin} setOpenOrderModal={setOpenOrderModal} openOrderModal={openOrderModal}></OrderModal>
                }
            </div >
            {
                totalItem > 10 && <div className='flex justify-center md:justify-end'>
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageCount={pageCount}></Pagination>
                </div>
            }


            {
                openOrderModal && <OrderPdf openOrderModal={openOrderModal}></OrderPdf>
            }


        </div >
    );
};

export default Orders;




