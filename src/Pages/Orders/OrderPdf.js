import React, { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Pdf from "react-to-pdf";
import auth from '../../firebase.init';
import useAdmin from '../../Hooks/useAdmin';
import logo from '../../Images/logo/logo.png';
import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from './ComponentToPrint';

const ref = React.createRef();
const OrderPdf = ({ openOrderModal }) => {
    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    // console.log(openOrderModal)
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const subTotal = openOrderModal?.products?.reduce(
        (previousValue, currentValue) => previousValue + currentValue?.productTotalPrice, 0);


    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    return (
        <div>
            <input type="checkbox" id="pdf-modal" className="modal-toggle" />
            <label htmlFor="pdf-modal" className="modal justify-end">
                <label htmlFor='' className="modal-box w-[900px] max-w-5xl">

                    <div>
                        <div className='px-12 border-2 w-[795px]' ref={ref}>
                            <div className='pt-6'>
                                <img src={logo} width='90px' alt="Business Logo" />
                            </div>

                            <div className='flex items-center justify-between px-6  w-full'>
                                <div className='mt-6'>
                                    <p className='font-bold'>From : </p>
                                    <p>Shop in Shop BD</p>
                                    <p>530/A, Baridhara-DOHS, Dhaka-1206,Bangladesh</p>
                                    <p>shopinshopbd12@gmail.com</p>
                                </div>

                                <div className='ml-10'>
                                    <h2 className='text-center uppercase font-bold mb-4'>Invoice</h2>
                                    <table className='border-2 border-slate-300 text-center'>

                                        <tr className='border-2 border-slate-300'>
                                            <td className='border-2 border-slate-300 p-2'>Order Number</td>
                                            <td className='p-2'>{openOrderModal?.orderID}</td>

                                        </tr>
                                        <tr className='border-2 border-slate-300'>
                                            <td className='border-2 border-slate-300 p-2'>Invoice Date</td>
                                            <td className='p-2'>{date}</td>

                                        </tr>
                                        <tr className='border-2 border-slate-300 bg-slate-300'>
                                            <td className='border-2 border-slate-300 p-2'>Total</td>
                                            {/* <td className='p-2'>{openOrderModal.totalPrice} tk</td> */}
                                            <td className="px-6 py-4">
                                                {admin ? openOrderModal.totalPrice : openOrderModal?.products?.reduce((previousValue, currentValue) => previousValue + (currentValue?.productTotalPrice + parseInt(currentValue.deliveryCharge)), 0)}  &#x09F3;
                                            </td>

                                        </tr>
                                    </table>
                                </div>
                            </div>

                            <div className='px-6'>
                                <div className='mt-6'>
                                    <p className='font-bold'>To : </p>
                                    <p>{openOrderModal.customerName}</p>
                                    <p>{openOrderModal.customerState}, {openOrderModal.customerCity}, {openOrderModal.customerDetails}</p>
                                    <p>{openOrderModal.customerEmail}</p>
                                    <p>{openOrderModal.customerPhone}</p>
                                </div>
                            </div>

                            <div className='mt-6'>
                                <table className='border-2 border-slate-300 w-full text-center'>

                                    <tr className='border-2 border-slate-300 bg-slate-300'>
                                        <th className='border-2 border-slate-300 p-2'>product Name</th>
                                        <th className='p-2'>Color</th>
                                        <th className='p-2'>Size</th>
                                        <th className='p-2'>Quantity</th>
                                        <th className='p-2'>Price</th>
                                        <th className='p-2'>Sub Total</th>

                                    </tr>
                                    {
                                        openOrderModal?.products?.map((product, index) => <tr key={index} className='border-2 border-slate-300'>
                                            <td className='border-2 border-slate-300 p-2'>{product.productName}</td>
                                            <td className='p-2 border-2 border-slate-300'>{openOrderModal?.color || '---'}</td>
                                            <td className='p-2 border-2 border-slate-300'>{openOrderModal?.size || '---'}</td>
                                            <td className='p-2 border-2 border-slate-300'>{product.quantity}</td>
                                            <td className='p-2 border-2 border-slate-300'>{product.productPrices} tk</td>
                                            {/* product price with quantity */}
                                            <td className='p-2'>{product.productPrices * product.quantity} tk</td>

                                        </tr>)
                                    }

                                </table>
                            </div>
                            <div className='flex justify-between'>
                                <div className='border-2 m-6 w-96'>
                                    <p className='font-bold'>Note : </p>
                                    <p className='px-6'>{openOrderModal.customerNote}</p>
                                </div>
                                <div className='mt-6 flex justify-end'>
                                    <table className='border-2 w-38 border-slate-300 text-center'>

                                        <tr className='border-2 font-bold border-slate-300'>
                                            <td className='border-2 border-slate-300 p-2'>Sub Total</td>

                                            <td className='p-2'>{subTotal} tk</td>

                                        </tr>
                                        <tr className='border-2 border-slate-300'>
                                            <td className='border-2 border-slate-300 p-2'>Delivery Charge</td>
                                            <td className='p-2'>{openOrderModal?.deliveryCharge} tk</td>

                                        </tr>

                                        <tr className='border-2 border-slate-300'>
                                            <td className='border-2 border-slate-300 p-2'>Due</td>
                                            <td className='p-2'>{openOrderModal?.duePrice ? openOrderModal?.duePrice : '0'} tk</td>

                                        </tr>
                                        <tr className='border-2 font-bold border-slate-300 bg-slate-300'>
                                            <td className='border-2 border-slate-300 p-2'>Total</td>
                                            {/* <td className='p-2 '>{subTotal + parseFloat(pdfs?.deliveryCharge) + parseFloat(pdfs?.vatPrice)} tk</td> */}
                                            <td className="px-6 py-4">
                                                {admin ? openOrderModal.totalPrice : openOrderModal?.products?.reduce((previousValue, currentValue) => previousValue + (currentValue?.productTotalPrice + parseInt(currentValue.deliveryCharge)), 0)}  &#x09F3;
                                            </td>

                                        </tr>
                                    </table>
                                </div>
                            </div>



                            <div className='pb-6'>
                                <h2 className='text-2xl font-bold text-orange-500'>{openOrderModal?.products[0]?.shopName}</h2>
                                <p>A merchant belongs to Shop in Shop</p>
                            </div>

                        </div>
                    </div >

                    <div className='flex justify-end'>
                        <Pdf targetRef={ref} filename={openOrderModal.customerName}>
                            {({ toPdf }) => <button className='btn bg-orange-500 mt-6 mr-6' onClick={toPdf}>Download Invoice</button>}
                        </Pdf>

                        <div>
                            {/* <i onClick={handlePrint} className="text-orange-500 cursor-pointer fa-solid fa-print"></i> */}
                            <button className='btn bg-orange-500 mt-6 mr-6' onClick={handlePrint}>Print Invoice</button>
                            <div className='hidden'>
                                <ComponentToPrint openOrderModal={openOrderModal} ref={componentRef} />
                            </div>
                        </div>

                        <div className="modal-action">
                            <label htmlFor="pdf-modal" className="btn">Cancel</label>
                        </div>

                    </div>
                </label>
            </label>
        </div>
    );
};

export default OrderPdf;




