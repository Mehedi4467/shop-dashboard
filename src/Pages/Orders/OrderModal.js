import React from 'react';


const OrderModal = ({ setOpenOrderModal, openOrderModal, admin }) => {


    return (
        <div>
            <input type="checkbox" id="my-modal-60" className="modal-toggle" />
            <div className="modal z-[9999999999999999999999999999999] modal-bottom ">
                <div className="modal-box w-11/12 max-w-5xl">

                    <div className="overflow-x-auto w-full">
                        <table className="table w-full">

                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Delivery Charge</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
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
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {product?.deliveryCharge} &#2547;
                                        </td>
                                        <td>{product?.productPrices} &#2547;</td>
                                        <th>
                                            {product?.quantity}
                                        </th>
                                        <th>
                                            {(product?.quantity * product?.productPrices) + parseInt(product?.deliveryCharge)} &#2547; {admin && '+ Vat'}
                                        </th>
                                        <td>{product?.status}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                        <label onClick={() => setOpenOrderModal(null)} htmlFor="my-modal-60" className="btn btn-primary">Cencel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;