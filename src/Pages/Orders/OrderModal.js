import React from 'react';

// const OrderModal = ({ openOrderModal }) => {
//     const { address, customerEmail, customerName, customerPhone, marchentEmail, shopName, pId, paymentMethod, productImage, productName, quantity, status, time, totalAmount } = openOrderModal;


//     return (
//         <div>

//             <input type="checkbox" id="order-modal" className="modal-toggle" />
//             <label htmlFor="order-modal" className="modal cursor-pointer">
//                 <label className="modal-box relative" htmlFor="">
//                     <div className="card full my-10 bg-base-100 shadow-xl">
//                         <figure><img src={productImage} width="300px" alt="Shoes" /></figure>
//                         <div className="card-body">
//                             <h2 className="card-title mx-auto text-orange-500">{productName}</h2>
//                             <p className='text-center mb-4'><b>Shop Name : </b>{shopName} </p>
//                             <p><b>Customer Name : </b>{customerName} </p>
//                             <p><b>Customer Email : </b>{customerEmail} </p>
//                             <p><b>Customer Phone : </b>{customerPhone} </p>
//                             <p><b>Customer Address : </b>{address} </p>
//                             <p><b>Quantity : </b>{quantity} </p>
//                             <p><b>Price : </b>{totalAmount} </p>
//                             <p><b>Time : </b>{time} </p>
//                             <p><b>Payment Method : </b>{paymentMethod} </p>
//                             <p><b>Status : </b>{status} </p>
//                         </div>
//                     </div>
//                 </label>
//             </label>
//         </div>
//     );
// };

// export default OrderModal;





const OrderModal = ({ setOrderModal, openOrderModal }) => {
    // console.log(orderModal)

    return (
        <div>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal z-[9999999999999999999999999999999] modal-bottom ">
                <div className="modal-box w-11/12 max-w-5xl">

                    <div className="overflow-x-auto w-full">
                        <table className="table w-full">

                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Shop Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    openOrderModal?.products?.map((product, index) => <tr key={index}>

                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={`http://localhost:5000/${product?.productImage}`} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{product?.productName}</div>
                                                    {/* <div className="text-sm opacity-50">United States</div> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {product?.shopName}

                                        </td>
                                        <td>{product?.productPrices} &#2547;</td>
                                        <th>
                                            {product?.quantity}
                                        </th>
                                        <td>{product?.status}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                        <label onClick={() => setOrderModal(null)} htmlFor="my-modal-6" className="btn btn-primary">Cencel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;