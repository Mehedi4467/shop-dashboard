import React from 'react';
import { toast } from 'react-toastify';

const ProductEditModal = ({ productModal, setProductModal }) => {


    const { productName, sPrice, orderType, price, quantity, video, deliveryInDhaka, outDhaka, color, size } = productModal;
    // console.log(sPrice)
    const handelProductUpdate = event => {
        event.preventDefault();
        const productNames = event.target.productName.value || productName;
        const orderTypes = event.target.orderType.value || orderType;
        const prices = event.target.price.value || price;
        const sPrices = event.target.sPrice.value || sPrice;
        const quantitys = event.target.quantity.value || quantity;
        const deliveryInDhakas = event.target.deliveryInDhaka.value || deliveryInDhaka;
        const outDhakas = event.target.outDhaka.value || outDhaka;
        const colors = event.target.color.value || color;
        const sizes = event.target.size.value || size;
        const videos = event.target.video.value || video;

        const productUpdateInfo = {
            productNames, orderTypes, sPrices, prices, videos, quantitys, deliveryInDhakas, outDhakas, colors, sizes
        }


        fetch(`http://localhost:5000/product/update/${productModal._id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(productUpdateInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged && data.modifiedCount > 0) {
                    toast("Product Update Successfully.");
                    setProductModal(null);
                }
                else if (data.modifiedCount === 0) {
                    toast("No Product Update");
                }
            })


    }

    return (
        <div>

            <input type="checkbox" id="product-edit-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center text-orange-500">Product Update</h3>


                    <form onSubmit={handelProductUpdate}>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input type="text" placeholder={productName} name='productName' className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text">Product Price</span>
                            </label>
                            <input type="number" placeholder={price} name='price' className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text">Product Special Price <span className='text-orange-500 text-sm'>(Enter 0 if you don't want to pay Special Price)</span></span>
                            </label>
                            <input type="text" placeholder={sPrice || 'Special Price is now closed. If you want to open then give the price'} name='sPrice' className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text">Product quantity</span>
                            </label>
                            <input type="text" placeholder={quantity} name='quantity' className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <p className="label-text">Product color <span className='text-orange-500 text-xs'>If you want to give more than one color, you must give a comma(,) </span></p>
                            </label>
                            <input type="text" placeholder={color} name='color' className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <p className="label-text">Product Size <span className='text-orange-500 text-xs'>If you want to give more than one size, you must give a comma(,) </span></p>
                            </label>
                            <input type="text" placeholder={size} name='size' className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <p className="label-text">Delivery Charge in Dhaka</p>
                            </label>
                            <input type="text" placeholder={deliveryInDhaka} name='deliveryInDhaka' className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <p className="label-text">Delivery Charge out of Dhaka</p>
                            </label>
                            <input type="text" placeholder={outDhaka} name='outDhaka' className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Order Type</span>
                            </label>

                            <select className="select select-bordered" name='orderType'>
                                <option value='' disabled selected>{orderType}</option>
                                <option>COD</option>
                                <option>Pay</option>
                                <option>Pre-Order</option>
                            </select>
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <p className="label-text">Product Youtube Video ID</p>
                            </label>
                            <input type="text" placeholder={video || "N/A"} name='video' className="input input-bordered w-full" />
                        </div>


                        <div className='flex justify-end'>
                            <div className="modal-action mr-4">
                                <button className="btn bg-orange-500">Update</button>
                            </div>
                            <div className="modal-action">
                                <button type='reset' onClick={() => setProductModal(null)} className="btn">Cancel</button>
                            </div>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    );
};

export default ProductEditModal;