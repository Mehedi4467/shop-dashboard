import React from 'react';
import Pdf from "react-to-pdf";
import logo from '../../Images/logo/logo.png';

const ref = React.createRef();
const OrderPdf = ({ openOrderModal }) => {
    const { customerName, customerPhone, customerEmail, productName, quantity, address, marchentEmail, totalAmount } = openOrderModal;
    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

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

                            <div className='flex items-center justify-between px-6 mt-6 w-full'>
                                <div className='mt-6'>
                                    <p className='font-bold'>From : </p>
                                    <p>Shop in Shop BD</p>
                                    <p>Shewrapara Mirpur-10,Dhaka,Bangladesh</p>
                                    <p>{marchentEmail}</p>
                                </div>

                                <div className='ml-10'>
                                    <h2 className='text-center uppercase font-bold mb-4'>Invoice</h2>
                                    <table className='border-2 border-slate-300 text-center'>

                                        <tr className='border-2 border-slate-300'>
                                            <td className='border-2 border-slate-300 p-2'>Order Number</td>
                                            <td className='p-2'>15927AB</td>

                                        </tr>
                                        <tr className='border-2 border-slate-300'>
                                            <td className='border-2 border-slate-300 p-2'>Invoice Date</td>
                                            <td className='p-2'>{date}</td>

                                        </tr>
                                        <tr className='border-2 border-slate-300 bg-slate-300'>
                                            <td className='border-2 border-slate-300 p-2'>Total</td>
                                            <td className='p-2'>{totalAmount} tk</td>

                                        </tr>
                                    </table>
                                </div>
                            </div>

                            <div className='px-6'>
                                <div className='mt-6'>
                                    <p className='font-bold'>To : </p>
                                    <p>{customerName}</p>
                                    <p>{address}</p>
                                    <p>{customerEmail}</p>
                                    <p>{customerPhone}</p>
                                </div>
                            </div>

                            <div className='mt-6'>
                                <table className='border-2 border-slate-300 w-full text-center'>

                                    <tr className='border-2 border-slate-300 bg-slate-300'>
                                        <th className='border-2 border-slate-300 p-2'>product Name</th>
                                        <th className='p-2'>Color</th>
                                        <th className='p-2'>Quantity</th>
                                        <th className='p-2'>Price</th>
                                        <th className='p-2'>Sub Total</th>

                                    </tr>
                                    <tr className='border-2 border-slate-300'>
                                        <td className='border-2 border-slate-300 p-2'>{productName}</td>
                                        <td className='p-2 border-2 border-slate-300'>Pink</td>
                                        <td className='p-2 border-2 border-slate-300'>{quantity}</td>
                                        <td className='p-2 border-2 border-slate-300'>{totalAmount} tk</td>
                                        <td className='p-2'>{totalAmount} tk</td>

                                    </tr>

                                </table>
                            </div>

                            <div className='mt-6 flex justify-end'>
                                <table className='border-2 w-30 border-slate-300 text-center'>

                                    <tr className='border-2 border-slate-300'>
                                        <td className='border-2 border-slate-300 p-2'>Sub Total</td>
                                        <td className='p-2'>{totalAmount} tk</td>

                                    </tr>
                                    <tr className='border-2 border-slate-300'>
                                        <td className='border-2 border-slate-300 p-2'>Delivery Charge</td>
                                        <td className='p-2'>60 tk</td>

                                    </tr>
                                    <tr className='border-2 border-slate-300 bg-slate-300'>
                                        <td className='border-2 border-slate-300 p-2'>Total</td>
                                        <td className='p-2'>10060 tk</td>

                                    </tr>
                                </table>
                            </div>

                            <div className='pb-6'>
                                <img src={logo} width='90' alt="marehent logo" />
                                <p>A merchant belongs to Shop in Shop</p>
                            </div>

                        </div>
                    </div >

                    <div className='flex justify-end'>
                        <Pdf targetRef={ref} filename={customerName}>
                            {({ toPdf }) => <button className='btn bg-orange-500 mt-6 mr-6' onClick={toPdf}>Download Invoice</button>}
                        </Pdf>

                        <div className="modal-action">
                            <label htmlFor="pdf-modal" className="btn">Cencle</label>
                        </div>
                    </div>
                </label>
            </label>
        </div>
    );
};

export default OrderPdf;




