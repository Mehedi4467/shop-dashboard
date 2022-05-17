import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Pagination from '../../Shared/Pagination/Pagination';
import Spinner from '../../Shared/Spinner/Spinner';
import CategoryModal from './CategoryModal';

const Category = () => {

    const { isLoading, error, data, refetch } = useQuery('categories', () =>
        fetch('http://localhost:5000/category').then(res =>
            res.json()
        )
    )

    if (isLoading) {
        return <Spinner></Spinner>
    }

    const handelStatus = (id, index, value, name, slug) => {

        const status = { index, value, category: name, slug }
        fetch(`http://localhost:5000/categoryStatus/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
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
    }

    return (
        <div className='container mx-auto'>
            <h1 className='text-center md:text-left mb-4 text-xl font-bold'>Category</h1>



            <div className='md:flex gap-4 justify-center mt-5  items-center '>
                <div className='flex justify-center order-1 md:order-2 gap-4 mb-8 md:mb-0'>

                    <label htmlFor="category-modal" className='btn  border-none bg-green-400 hover:bg-green-500 h-12 w-52 text-sm md:text-lg text-white font-bold rounded-full '><i className="mr-2 fas fa-plus-circle"></i> Add Category</label>
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
                                TYPE
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                SUB CATEGORY
                            </th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.categories.map((category, index) => <tr key={category._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                                        {category.category.map((e, indexCategory) =>
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
                                                        <i className=" cursor-pointer fa-solid fa-pen-to-square"></i>
                                                        <i className="cursor-pointer fa-solid fa-trash-can"></i>
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
            <div className='flex justify-center md:justify-end'>
                <Pagination></Pagination>
            </div>

            <div className='h-12 w-12 bg-white flex justify-center items-center cursor-pointer fixed bottom-20 md:hidden block right-5 shadow-lg rounded-full'>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <i className="text-blue-600  text-lg fa-solid fa-plus"></i>

            </div>

            <CategoryModal refetch={refetch} data={data} isLoading={isLoading} ></CategoryModal>


        </div >
    );
};

export default Category;