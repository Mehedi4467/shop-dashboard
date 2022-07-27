import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useAdmin from '../../Hooks/useAdmin';
import Pagination from '../../Shared/Pagination/Pagination';
import Spinner from '../../Shared/Spinner/Spinner';
import ProductDeleteModal from './ProductDeleteModal';
import ProductEditModal from './ProductEditModal';
import ProductViewModal from './ProductViewModal';


const Products = () => {
    const [user, loading] = useAuthState(auth);
    const [productModal, setProductModal] = useState(null);
    const [productLoad, setProductLoad] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [totalItem, setTotalItem] = useState(0)
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isAdmin] = useAdmin(user);



    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/product/${user?.email}?name=${search.toLocaleLowerCase()}&page=${currentPage - 1}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);

                const count = data.length;
                const pages = Math.ceil(parseInt(count) / 10);
                setPageCount(pages);
                setTotalItem(count);
                setProductLoad(false);

            })

    }, [user, currentPage, search, productModal]);


    const productUpdateStatus = (id, value) => {
        fetch(`http://localhost:5000/product/status/update/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ value })
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {
                    toast("Product Status Update Successfully");

                }
            })
    }

    if (loading || productLoad) {
        return <Spinner></Spinner>
    }

    // console.log(products[5].category.map(x => JSON.parse(x).value))

    return (
        <div className='container mx-auto'>
            <h1 className='text-center md:text-left mb-4 text-xl font-bold'>Products</h1>

            <div className='md:grid grid-cols-2 gap-4  mt-5 items-center '>
                <div className='md:flex justify-between hidden  order-1 md:order-2 gap-4 mb-8 md:mb-0'>
                    <Link to="/addProduct"> <button className='bg-green-400 hover:bg-green-500 h-12 w-52 text-white font-bold rounded-full '>Add Product</button></Link>
                </div>

                <div className='relative bg-white p-4 w-full order-2 md:order-1 rounded-full'>
                    <input onChange={(e) => setSearch(e.target.value)} className='outline-0 p-2 h-12 rounded-full pl-10 text-orange-500 text-lg border-2  hover:shadow-lg w-full' type="text" name="search" placeholder='Search Product Name' />
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
                                        <p className='w-40 ml-4'>{product.productName}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 capitalize">
                                    {
                                        Array.isArray(product.category) && product.category.map(x => JSON.parse(x).value).join(' , ')
                                    }
                                </td>
                                <td className="px-6 py-4">
                                    &#x09F3; {product.price}
                                </td>
                                <td className="px-6 py-4">
                                    {product.quantity}
                                </td>
                                <td className="px-6 py-4">
                                    {
                                        isAdmin ? <select onChange={(e) => productUpdateStatus(product._id, e.target.value)} className='outline-0 cursor-pointer border-2 hover:shadow-lg text-slate-400 p-1 rounded-full px-4' id="cars">
                                            <option className='text-orange-600' defaultValue={product.status} selected disabled>{product.status}</option>
                                            <option>Pending</option>
                                            <option>Accept</option>
                                            <option>Mute</option>
                                            <option>Block</option>

                                        </select> : <p className='bg-orange-200 p-1 rounded-full text-center text-blue-500 capitalize'>{product.status}</p>
                                    }

                                </td >
                                <td className="px-6 py-4">
                                    <label htmlFor="product-view-modal"> <i onClick={() => setProductModal(product)} className="cursor-pointer fa-solid fa-eye"></i></label>

                                </td >
                                <td className="px-6 py-4">
                                    <div className='flex justify-between'>
                                        <label htmlFor="product-edit-modal"> <i onClick={() => setProductModal(product)} className=" cursor-pointer fa-solid fa-pen-to-square"></i></label>

                                        <label htmlFor="product-delete-modal">   <i onClick={() => setProductModal(product)} className="cursor-pointer fa-solid fa-trash-can"></i></label>

                                    </div>
                                </td >

                            </tr >)
                        }

                    </tbody >
                </table >

            </div >
            {
                totalItem > 10 && <div className='flex justify-center md:justify-end'>
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageCount={pageCount}></Pagination>
                </div>
            }

            <Link to="/addProduct"><div className='h-12 w-12 bg-white flex justify-center items-center cursor-pointer fixed bottom-20 md:hidden  right-5 shadow-lg rounded-full'>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>


                <i className="text-blue-600  text-lg fa-solid fa-plus"></i>

            </div></Link>


            {
                productModal && <ProductDeleteModal products={products} setProducts={setProducts} setProductModal={setProductModal} productModal={productModal}></ProductDeleteModal>
            }
            {
                productModal && <ProductViewModal productModal={productModal}></ProductViewModal>
            }
            {
                productModal && <ProductEditModal productModal={productModal} setProductModal={setProductModal}></ProductEditModal>
            }

        </div >
    );
};

export default Products;