import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import Pagination from '../../Shared/Pagination/Pagination';
import Spinner from '../../Shared/Spinner/Spinner';
import ProductDeleteModal from './ProductDeleteModal';

const Products = () => {
    const [user, loading] = useAuthState(auth);
    const [productModal, setProductModal] = useState(null);

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/product/${user?.email}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProducts(data);
            })

    }, [user]);

    console.log(products)


    if (loading) {
        return <Spinner></Spinner>
    }



    return (
        <div className='container mx-auto'>
            <h1 className='text-center md:text-left mb-4 text-xl font-bold'>Products</h1>

            {/* {
                products.map(image => <img src={`http://localhost:5000/${image.primaryImage}`} alt="dfggd" />)
            } */}

            <div className='md:grid grid-cols-2 gap-4  mt-5 items-center '>
                <div className='flex justify-between order-1 md:order-2 gap-4 mb-8 md:mb-0'>
                    <Link to="/addProduct"> <button className='bg-green-400 hover:bg-green-500 h-12 w-52 text-white font-bold rounded-full '>Add Product</button></Link>

                </div>

                <div className='relative bg-white p-4 w-full order-2 md:order-1 rounded-full'>
                    <input className='outline-0 p-2 h-12 rounded-full pl-10 text-orange-500 text-lg border-2  hover:shadow-lg w-full' type="text" name="search" placeholder='Search Product Name' />
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
                                SKU
                            </th>
                            <th scope="col" className="px-6 py-3">
                                PRODUCT NAME
                            </th>
                            <th scope="col" className="px-6 py-3">
                                CATEGORY
                            </th>
                            <th scope="col" className="px-6 py-3">
                                PRICE
                            </th>
                            <th scope="col" className="px-6 py-3">
                                STOCK
                            </th>
                            <th scope="col" className="px-6 py-3">
                                STATUS
                            </th>

                            <th scope="col" className="px-6 py-3">
                                DETAILS
                            </th>

                            <th scope="col" className="px-6 py-3">
                                ACTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map(product => <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium  dark:text-white whitespace-nowrap">
                                    {product.sku}
                                </th>
                                <td className="px-6 py-4">
                                    <div className='flex items-center justify-between'>
                                        <img src={`http://localhost:5000/${product.primaryImage}`} width='40' alt="" />
                                        <p>{product.productName}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    Jewelry
                                </td>
                                <td className="px-6 py-4">
                                    &#x09F3; {product.price}
                                </td>
                                <td className="px-6 py-4">
                                    {product.quantity}
                                </td>
                                <td className="px-6 py-4">
                                    <p className='bg-orange-200 p-1 rounded-full text-center text-blue-500'>Published</p>
                                </td >
                                <td className="px-6 py-4">
                                    <i className="cursor-pointer fa-solid fa-eye"></i>
                                </td >
                                <td className="px-6 py-4">
                                    <div className='flex justify-between'>
                                        <i className=" cursor-pointer fa-solid fa-pen-to-square"></i>

                                        <label for="product-delete-modal">   <i onClick={() => setProductModal(product)} className="cursor-pointer fa-solid fa-trash-can"></i></label>

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
            {
                productModal && <ProductDeleteModal products={products} setProducts={setProducts} setProductModal={setProductModal} productModal={productModal}></ProductDeleteModal>
            }

        </div >
    );
};

export default Products;