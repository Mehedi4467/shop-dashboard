import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Spinner from '../../Shared/Spinner/Spinner';
import Merchant from './Merchant';
import DeleteModalUser from './DeleteModalUser';
import MakeAdmin from './MakeAdmin';
import UpdateUser from './UpdateUser';
import { toast } from 'react-toastify';
import Pagination from '../../Shared/Pagination/Pagination';


const Staff = () => {
    const [openModal, setOpenModal] = useState(null);
    const [search, setSearch] = useState('');
    const [pageCount, setPageCount] = useState(0);
    // const [page, setPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);

    const { isLoading, error, data, refetch } = useQuery(['adminUser', currentPage], () =>
        fetch(`http://localhost:5000/adminUser?name=${search.toLocaleLowerCase()}&page=${currentPage - 1}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => {

            return res.json();
        }
        )
    );

    useEffect(() => {
        fetch(`http://localhost:5000/userCount`)
            .then(res => res.json())
            .then(data => {
                const count = data.count;
                const pages = Math.ceil(count / 10);
                setPageCount(pages);


            })

    }, []);

    const UserUpdatepdateStatus = (id, status) => {
        fetch(`http://localhost:5000/adminUser/admin/accept/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status }),
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {
                    toast("You have successfully changed the status!");
                    refetch();
                }
                else {
                    toast("Oops! Something is Wrong. Please Reload your Browser")
                }
            })
    }

    if (isLoading) {
        return <Spinner></Spinner>
    }

    if (error) {
        return <h2>Something Is Wrong. Please Reload Again</h2>
    }

    return (
        <div className='container mx-auto'>
            <h1 className='text-center md:text-left mb-4 text-xl font-bold'>Merchants</h1>



            <div className='mt-5 '>
                <div className='relative bg-white p-4 w-full order-2 md:order-1 rounded-full'>
                    <form>
                        <input onChange={(e) => {
                            refetch();
                            setSearch(e.target.value)

                        }} type="search" className='outline-0 p-2 h-12 rounded-full px-10 text-orange-500 text-lg border-2  hover:shadow-lg w-full' name="search" placeholder='Search Shop Name' />

                    </form>
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
                            data?.map((user, index) => <Merchant key={user._id} UserUpdatepdateStatus={UserUpdatepdateStatus} index={index} user={user} setOpenModal={setOpenModal}></Merchant>).reverse()
                        }
                    </tbody >
                </table >

            </div >
            {
                openModal && <DeleteModalUser openModal={openModal} setOpenModal={setOpenModal} refetch={refetch}></DeleteModalUser>
            }

            {
                openModal && <MakeAdmin openModal={openModal} setOpenModal={setOpenModal} refetch={refetch}></MakeAdmin>
            }
            {
                openModal && <UpdateUser openModal={openModal} setOpenModal={setOpenModal} refetch={refetch}></UpdateUser>
            }

            <div className='flex justify-center md:justify-end'>
                {
                    pageCount > 10 && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageCount={pageCount} ></Pagination>
                }
            </div>
        </div >
    );
};

export default Staff;