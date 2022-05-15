import React from 'react';
import Pagination from '../../Shared/Pagination/Pagination';
import CategoryModal from './CategoryModal';

const Category = () => {
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
            <h1 className='text-center md:text-left mb-4 text-xl font-bold'>Category</h1>



            <div className='md:flex gap-4 justify-center mt-5  items-center '>
                <div className='flex justify-center order-1 md:order-2 gap-4 mb-8 md:mb-0'>

                    <label for="category-modal" className='btn  border-none bg-green-400 hover:bg-green-500 h-12 w-52 text-sm md:text-lg text-white font-bold rounded-full '><i className="mr-2 fas fa-plus-circle"></i> Add Category</label>
                </div>

                <div className='relative bg-white p-4 w-full order-2 md:order-1 rounded-full'>
                    <input className='outline-0 p-2 h-12 rounded-full pl-10 text-orange-500 text-lg border-2  hover:shadow-lg w-full' type="text" name="search" placeholder='Search Category' />
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
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                PARENT
                            </th>
                            <th scope="col" className="px-6 py-3">
                                CHILDREN
                            </th>
                            <th scope="col" className="px-6 py-3">
                                TYPE
                            </th>
                            <th scope="col" className="px-6 py-3">
                                STATUS
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
                                    9582
                                </th>
                                <td className="px-6 py-4">
                                    <div className='flex items-center justify-between'>
                                        <img src="https://www.findurings.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/1/_/1_541.jpg" width='40' alt="" />

                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    Drinks
                                </td>
                                <td className="px-6 py-4">
                                    Tea,
                                    Water,
                                    Juice,
                                    Coffee,
                                    Energy Drinks,
                                </td>
                                <td className="px-6 py-4">
                                    Grocery
                                </td>
                                <td className="px-6 py-4">
                                    <p className='bg-orange-200 p-1 rounded-full text-center text-blue-500'>Published</p>
                                </td >

                                <td className="px-6 py-4">
                                    <div className='flex justify-between'>
                                        <i className=" cursor-pointer fa-solid fa-pen-to-square"></i>
                                        <i className="cursor-pointer fa-solid fa-trash-can"></i>
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

            <div className='h-12 w-12 bg-white flex justify-center items-center cursor-pointer fixed bottom-20 md:hidden block right-5 shadow-lg rounded-full'>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <i className="text-blue-600  text-lg fa-solid fa-plus"></i>

            </div>

            <CategoryModal></CategoryModal>


        </div >
    );
};

export default Category;