import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Spinner from '../../Shared/Spinner/Spinner';
import InternetError from '../NotFound/InternetError';
import CategoryDeleteModal from './CategoryDeleteModal';
import CategoryEditModal from './CategoryEditModal';
import CategoryModal from './CategoryModal';


const Category = () => {
    const [categoryModal, setCategoryModal] = useState(null);
    const [subCategory, setSubCategory] = useState([]);
    const [search, setSearch] = useState('');
    const { isLoading, error, data, refetch } = useQuery(['categories'], () =>
        fetch(`https://stormy-peak-02130.herokuapp.com/category?name=${search.toLocaleLowerCase()}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res =>
            res.json()
        )
    );

    if (isLoading) {
        return <Spinner></Spinner>
    }
    if (error) {
        return <InternetError></InternetError>
    }


    const handelStatus = (id, index, value, name, slug) => {

        const status = { index, value, category: name, slug }
        fetch(`https://stormy-peak-02130.herokuapp.com/categoryStatus/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ status })
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast(`Category ${value}`);
                    refetch();
                } else {
                    toast.error("Some Problem Occurs! Please Reload Browser");
                }
            });
    };

    const handelSearchClean = (event) => {
        event.preventDefault();
        event.target.reset();
        setSearch('');
        refetch();


    }

    return (
        <div className='container mx-auto'>
            <h1 className='text-center md:text-left mb-4 text-xl font-bold'>Category</h1>



            <div className='md:flex gap-4 justify-center mt-5  items-center '>
                <div className='md:flex hidden justify-center order-1 md:order-2 gap-4 mb-8 md:mb-0'>

                    <label htmlFor="category-modal" className='btn  border-none bg-green-400 hover:bg-green-500 h-12 w-52 text-sm md:text-lg text-white font-bold rounded-full '><i className="mr-2 fas fa-plus-circle"></i> Add Category</label>
                </div>

                <div className='relative  bg-white p-4 w-full order-2 md:order-1 rounded-full'>
                    <form onSubmit={handelSearchClean}>
                        <input onChange={(e) => {
                            refetch();
                            setSearch(e.target.value);
                        }
                        } className='outline-0 p-2 h-12 rounded-full pl-10 text-orange-500 text-lg border-2  hover:shadow-lg w-full' type="text" name="search" placeholder='Search Category' />
                        <button type='submit' className='absolute right-10 top-[35%] cursor-pointer'>

                            <i className=" text-green-500 fa-solid fa-x"></i>

                        </button>
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
                                TYPE
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                SUB CATEGORY
                            </th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.categories?.map((category, index) => <tr key={category._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium  dark:text-white whitespace-nowrap">
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">
                                    {category.name}
                                </td>
                                <td className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-[#F4F5F7] dark:bg-gray-700 dark:text-gray-400">
                                            <tr>

                                                <th scope="col" className="px-6 py-3">
                                                    Image
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    PARENT
                                                </th>

                                                <th scope="col" className="px-6 py-3">
                                                    CHILD
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    STATUS
                                                </th>

                                                <th scope="col" className="px-6 py-3 text-center">
                                                    ACTIONS
                                                </th>
                                            </tr>
                                        </thead>
                                        {category?.category?.map((e, indexCategory) =>
                                            <tbody key={indexCategory}>

                                                <td className="px-6 py-4">
                                                    <div className='flex items-center justify-between'>
                                                        <img src={e.img} width='40' alt="" />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {e.name}
                                                </td>
                                                <td className="px-6 py-4 w-20">
                                                    {/* {e?.subCategory.map((sub, index) => <p key={index}>{index + 1}</p>)} */}
                                                    {e?.subCategory.length}

                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="form-control">
                                                        <label className="label cursor-pointer">
                                                            <input onClick={(event) => {
                                                                handelStatus(category._id, indexCategory, event.target.checked, e.name, e.slug)
                                                            }
                                                            } type="checkbox" className="toggle toggle-primary" checked={e.status} />


                                                        </label>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className='flex justify-around'>

                                                        <label onClick={() => {
                                                            setSubCategory(e);
                                                            setCategoryModal(category);
                                                        }} htmlFor="update-modal-category"> <i className=" cursor-pointer fa-solid fa-pen-to-square"></i></label>

                                                        <label onClick={() => {
                                                            setCategoryModal(category);
                                                            setSubCategory(e)
                                                        }
                                                        } htmlFor="category-delete-modal"> <i className="cursor-pointer fa-solid fa-trash-can"></i></label>

                                                    </div>
                                                </td >
                                            </tbody>
                                        )}

                                    </table>
                                </td>
                            </tr >)
                        }

                    </tbody >
                </table >

            </div >

            {
                categoryModal && <CategoryDeleteModal refetch={refetch} setCategoryModal={setCategoryModal} subCategory={subCategory} categoryModal={categoryModal}></CategoryDeleteModal>
            }

            {
                categoryModal && <CategoryEditModal refetch={refetch} setCategoryModal={setCategoryModal} subCategory={subCategory}></CategoryEditModal>
            }

            {/* <div className='flex justify-center md:justify-end'>
                <Pagination></Pagination>
            </div> */}


            <label htmlFor="category-modal">    <div className='h-12 w-12 bg-white flex justify-center items-center cursor-pointer fixed bottom-20 md:hidden  right-5 shadow-lg rounded-full'>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <i className="text-blue-600  text-lg fa-solid fa-plus"></i>

            </div></label>




            <CategoryModal refetch={refetch} data={data} isLoading={isLoading} ></CategoryModal>


        </div >
    );
};

export default Category;