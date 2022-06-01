import React from 'react';

const ProductViewModal = ({ productModal }) => {
    const { productName, sku, subCategory, category, orderType, price, quantity, deliveryInDhaka, outDhaka, color, size, marchentShop, marchentEmail, marchantPhone, primaryImage, status, date, time } = productModal;
    return (
        <div>
            <input type="checkbox" id="product-view-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label for="product-view-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <div className='flex justify-center'>
                        <img src={`http://localhost:5000/${primaryImage}`} width='150' alt="product images" />
                    </div>
                    <div>
                        <p className='text-center text-orange-500 font-semibold'>{productName}</p>
                        <p className='text-center font-semibold'> Shop Name : {marchentShop} </p>
                    </div>

                    <div className='mt-4'>
                        <p className='font-semibold'> Product SKU : <span className='text-orange-500'>{sku}</span> </p>
                        <p className='font-semibold'> Product Category : <span className='text-orange-500'>{category} </span></p>
                        <p className='font-semibold'> Product Sub Category : <span className='text-orange-500'>{subCategory}</span> </p>
                        <p className='font-semibold'> Product Price : <span className='text-orange-500'>{price}</span> </p>
                        <p className='font-semibold'> Product Quantity : <span className='text-orange-500'>{quantity}</span> </p>
                        <p className='font-semibold'> Order Type : <span className='text-orange-500'>{orderType}</span> </p>
                        <p className='font-semibold'> Delivery Charge : <span className='text-orange-500'>In Dhaka- {deliveryInDhaka}, Out of Dhaka - {outDhaka}</span> </p>
                        <p className='font-semibold'> Product Color : <span className='text-orange-500'>{color}</span> </p>
                        <p className='font-semibold'> Product Size : <span className='text-orange-500'>{size}</span> </p>
                        <p className='font-semibold'> Product Status : <span className='text-orange-500'>{status}</span> </p>
                        <p className='font-semibold'> Marchant Email : <span className='text-orange-500'>{marchentEmail}</span> </p>
                        <p className='font-semibold'> Marchant Phone : <span className='text-orange-500'>{marchantPhone}</span> </p>
                        <p className='font-semibold'> Publish Date : <span className='text-orange-500'>{date} {time}</span> </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductViewModal;