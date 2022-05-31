import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Pagination from '../../Shared/Pagination/Pagination';
import Spinner from '../../Shared/Spinner/Spinner';
import AddCouponsModal from './AddCouponsModal';
import CouponDeleteModal from './CouponDeleteModal';

const Coupons = () => {
    const [couponModal, setCouponModal] = useState(null);
    const [user, loading] = useAuthState(auth);
    const [coupons, setCoupons] = useState([]);

    const [couponLoad, setCoupon] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [totalItem, setTotalItem] = useState(0)
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:5000/coupons/${user?.email}?couponName=${search}&page=${currentPage - 1}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setCoupons(data);
                const count = data.length;
                const pages = Math.ceil(parseInt(count) / 10);
                setPageCount(pages);
                setTotalItem(count);
                setCoupon(false);
                console.log(data);
            })
    }, [user, search, currentPage, couponModal]);

    if (loading || couponLoad) {
        return <Spinner></Spinner>
    }
    return (
        <div className='container mx-auto'>
            <h1 className='text-center md:text-left mb-4 text-xl font-bold'>Coupons</h1>



            <div className='md:grid grid-cols-2 gap-4  mt-5 items-center '>
                <div className='hidden md:flex justify-center order-1 md:order-2 gap-4 mb-8 md:mb-0'>
                    <label onClick={() => setCouponModal(true)} htmlFor="coupons-modal" className='btn bg-green-400 hover:bg-green-500 h-12 w-52 text-white font-bold rounded-full '> Add Coupon</label>
                </div>

                <div className='relative bg-white p-4 w-full order-2 md:order-1 rounded-full'>
                    <input onChange={(e) => setSearch(e.target.value)} className='outline-0 p-2 h-12 rounded-full pl-10 text-orange-500 text-lg border-2  hover:shadow-lg w-full' type="text" name="search" placeholder='Search Campaigns Name' />
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
                                START DATE
                            </th>
                            <th scope="col" className="px-6 py-3">
                                END DATE
                            </th>
                            <th scope="col" className="px-6 py-3">
                                CAMPAIGNS NAME
                            </th>
                            <th scope="col" className="px-6 py-3">
                                CODE
                            </th>
                            <th scope="col" className="px-6 py-3">
                                PERCENTAGE
                            </th>

                            <th scope="col" className="px-6 py-3">
                                MUTE/UNMUTE
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
                            coupons?.map((coupon, index) => <tr key={coupon._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium  dark:text-white whitespace-nowrap">
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">

                                    {coupon.startDates}
                                </td>
                                <td className="px-6 py-4">

                                    {coupon.endDates}
                                </td>
                                <td className="px-6 py-4">
                                    {coupon.name}
                                </td>
                                <td className="px-6 py-4">
                                    {coupon.code}
                                </td>
                                <td className="px-6 py-4">
                                    {coupon.percentage}%
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="form-control">
                                        <label className="label cursor-pointer">

                                            <input type="checkbox" className="toggle toggle-primary" />
                                        </label>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className='bg-orange-200 p-1 rounded-full text-center text-blue-500'>Expired</p>
                                </td >

                                <td className="px-6 py-4">
                                    <div className='flex justify-between'>
                                        <i className=" cursor-pointer fa-solid fa-pen-to-square"></i>
                                        <label for="coupon-delete"><i onClick={() => setCouponModal(coupon)} className="cursor-pointer fa-solid fa-trash-can"></i></label>

                                    </div>
                                </td >

                            </tr >)
                        }

                    </tbody >
                </table >

            </div >
            {
                couponModal && <CouponDeleteModal couponModal={couponModal} setCouponModal={setCouponModal}></CouponDeleteModal>
            }

            {
                totalItem > 10 && <div className='flex justify-center md:justify-end'>
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageCount={pageCount}></Pagination>
                </div>
            }


            <label onClick={() => setCouponModal(true)} htmlFor="coupons-modal" className='h-12 w-12 bg-white flex justify-center items-center cursor-pointer fixed bottom-20 md:hidden  right-5 shadow-lg rounded-full'>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <i className="text-blue-600  text-lg fa-solid fa-plus"></i>

            </label>
            {
                couponModal && <AddCouponsModal setCouponModal={setCouponModal}></AddCouponsModal>
            }


        </div >
    );
};

export default Coupons;