import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Pagination from '../../Shared/Pagination/Pagination';
import Spinner from '../../Shared/Spinner/Spinner';
import Merchant from './Merchant';
import DeleteModalUser from './DeleteModalUser';
import MakeAdmin from './MakeAdmin';


const Staff = () => {
    const [openModal, setOpenModal] = useState(null)

    const { isLoading, error, data, refetch } = useQuery('categories', () =>
        fetch('http://localhost:5000/adminUser', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => {
            console.log(res);
            return res.json();
        }
        )
    )


    if (isLoading) {
        return <Spinner></Spinner>
    }


    return (
        <div className='container mx-auto'>
            <h1 className='text-center md:text-left mb-4 text-xl font-bold'>Merchants</h1>



            <div className='mt-5 '>
                <div className='relative bg-white p-4 w-full order-2 md:order-1 rounded-full'>
                    <input className='outline-0 p-2 h-12 rounded-full pl-10 text-orange-500 text-lg border-2  hover:shadow-lg w-full' type="text" name="search" placeholder='Search Name/Email/Phone' />
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
                                NAME
                            </th>
                            <th scope="col" className="px-6 py-3">
                                EMAIL
                            </th>
                            <th scope="col" className="px-6 py-3">
                                CONTACT
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>

                            <th scope="col" className="px-6 py-3">
                                ACTIONS
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ROLE
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((user, index) => <Merchant key={user._id} index={index} user={user} setOpenModal={setOpenModal}></Merchant>)
                        }
                    </tbody >
                </table >

            </div >
            {
                openModal && <DeleteModalUser openModal={openModal}></DeleteModalUser>
            }

            {
                openModal && <MakeAdmin openModal={openModal} setOpenModal={setOpenModal} refetch={refetch}></MakeAdmin>
            }
            <div className='flex justify-center md:justify-end'>
                <Pagination></Pagination>
            </div>
        </div >
    );
};

export default Staff;