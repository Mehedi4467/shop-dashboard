import React from 'react';
import { toast } from 'react-toastify';
const ProductDeleteModal = ({ products, setProducts, productModal, setProductModal }) => {

    const handelProductDelete = id => {

        fetch(`http://localhost:5000/product/${id}?path=${productModal.primaryImage}&secondPath=${productModal.secondImage}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged && data.deletedCount > 0) {
                    const reming = products.filter(product => product._id !== productModal._id);
                    setProducts(reming);
                    toast("Product Delete Successfully");
                    setProductModal(null);

                }

            })

    }

    return (
        <div>

            <input type="checkbox" id="product-delete-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Are you sure you want to delete the  <span className='text-orange-500'>{productModal.productName}</span> product?</h3>

                    <div className='flex justify-end'>
                        <div className="modal-action mr-4">
                            <button onClick={() => handelProductDelete(productModal._id)} className="btn bg-orange-500">Delete</button>
                        </div>
                        <div className="modal-action">
                            <label htmlFor="product-delete-modal" className="btn">Cancel</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDeleteModal;