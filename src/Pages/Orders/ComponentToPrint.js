import React from 'react';
import logo from '../../Images/logo/logo.png';


const ComponentToPrint = React.forwardRef((props, ref) => {
    const { order } = props;
    // console.log('print', order)


    return (
        <div className="bg-gray-200 p-6" ref={ref}>
            <div className="a4-screen-sized">
                <div className="aspect-ratio-box shadow-lg rounded-lg overflow-hidden">
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
                                            <td className='p-2'>{order.orderID}</td>

                                        </tr>
                                        <tr className='border-2 border-slate-300'>
                                            <td className='border-2 border-slate-300 p-2'>Invoice Date</td>
                                            <td className='p-2'>{order.date}</td>

                                        </tr>
                                        <tr className='border-2 border-slate-300 bg-slate-300'>
                                            <td className='border-2 border-slate-300 p-2'>Total</td>
                                            <td className='p-2'>{order.totalPrice} tk</td>

                                        </tr>
                                    </table>
                                </div>
                            </div>

                            <div className='px-6'>
                                <div className='mt-6'>
                                    <p className='font-bold'>To : </p>
                                    <p>{order.customerName}</p>
                                    <p>{order.customerState}, {order.customerCity}, {order.customerDetails}</p>
                                    <p>{order.customerEmail}</p>
                                    <p>{order.customerPhone}</p>
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
                                        order?.products?.map((product, index) => <tr key={index} className='border-2 border-slate-300'>
                                            <td className='border-2 border-slate-300 p-2'>{product.productName}</td>
                                            <td className='p-2 border-2 border-slate-300'>{order?.color || '---'}</td>
                                            <td className='p-2 border-2 border-slate-300'>{order?.size || '---'}</td>
                                            <td className='p-2 border-2 border-slate-300'>{product.quantity}</td>
                                            <td className='p-2 border-2 border-slate-300'>{product.productPrices} tk</td>
                                            {/* product price with quantity */}
                                            <td className='p-2'>{product.productPrices * product.quantity} tk</td>

                                        </tr>)
                                    }

                                </table>
                            </div>

                            <div className='mt-6 flex justify-end'>
                                <table className='border-2 w-30 border-slate-300 text-center'>

                                    <tr className='border-2 font-bold border-slate-300'>
                                        <td className='border-2 border-slate-300 p-2'>Sub Total</td>

                                        {/* <td className='p-2'>{subTotal} tk</td> */}

                                    </tr>
                                    <tr className='border-2 border-slate-300'>
                                        <td className='border-2 border-slate-300 p-2'>Delivery Charge</td>
                                        <td className='p-2'>{order?.deliveryCharge} tk</td>

                                    </tr>
                                    <tr className='border-2 border-slate-300'>
                                        <td className='border-2 border-slate-300 p-2'>Vat</td>
                                        <td className='p-2'>{order?.vatPrice} tk</td>

                                    </tr>
                                    <tr className='border-2 border-slate-300'>
                                        <td className='border-2 border-slate-300 p-2'>Due</td>
                                        <td className='p-2'>{order?.duePrice ? order?.duePrice : '0'} tk</td>

                                    </tr>
                                    <tr className='border-2 font-bold border-slate-300 bg-slate-300'>
                                        <td className='border-2 border-slate-300 p-2'>Total</td>
                                        {/* <td className='p-2 '>{subTotal + parseFloat(pdfs?.deliveryCharge) + parseFloat(pdfs?.vatPrice)} tk</td> */}

                                    </tr>
                                </table>
                            </div>

                            <div className='pb-6'>
                                <img src={logo} width='90' alt="marehent logo" />
                                <p>A merchant belongs to Shop in Shop</p>
                            </div>

                        </div>
                    </div >
                </div>
            </div>
        </div>
    );
});

export default ComponentToPrint;
