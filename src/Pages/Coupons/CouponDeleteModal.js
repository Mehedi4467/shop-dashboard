import React from 'react';
import { toast } from 'react-toastify';

const CouponDeleteModal = ({ couponModal, setCouponModal }) => {
    const handelDelwtwCoupon = id => {
        fetch(`http://localhost:5000/coupon/delete/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged && data.deletedCount > 0) {
                    toast("Coupon delete Successfully");
                    setCouponModal(null);
                }
            })
    }

    return (
        <div>
            <input type="checkbox" id="coupon-delete" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Do you want to delete the <span className='text-xl text-orange-500'>{couponModal.name}</span> coupon?</h3>
                    <p className="py-4">If you delete the coupon, customers will not be able to use the coupon.</p>
                    <div className='flex justify-end'>
                        <div className="modal-action mr-4">
                            <button onClick={() => handelDelwtwCoupon(couponModal._id)} className="btn bg-orange-500">Delete</button>
                        </div>
                        <div className="modal-action">
                            <label htmlFor="coupon-delete" className="btn">Cencel</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CouponDeleteModal;