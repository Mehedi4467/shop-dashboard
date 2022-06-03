import React from 'react';

const OrderModal = ({ openOrderModal }) => {
    const { address, customerEmail, customerName, customerPhone, marchentEmail, shopName, pId, paymentMethod, productImage, productName, quantity, status, time, totalAmount } = openOrderModal;


    return (
        <div>

            <input type="checkbox" id="order-modal" className="modal-toggle" />
            <label htmlFor="order-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <div className="card full my-10 bg-base-100 shadow-xl">
                        <figure><img src={productImage} width="300px" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title mx-auto text-orange-500">{productName}</h2>
                            <p className='text-center mb-4'><b>Shop Name : </b>{shopName} </p>
                            <p><b>Customer Name : </b>{customerName} </p>
                            <p><b>Customer Email : </b>{customerEmail} </p>
                            <p><b>Customer Phone : </b>{customerPhone} </p>
                            <p><b>Customer Address : </b>{address} </p>
                            <p><b>Quantity : </b>{quantity} </p>
                            <p><b>Price : </b>{totalAmount} </p>
                            <p><b>Time : </b>{time} </p>
                            <p><b>Payment Method : </b>{paymentMethod} </p>
                            <p><b>Status : </b>{status} </p>
                        </div>
                    </div>
                </label>
            </label>
        </div>
    );
};

export default OrderModal;