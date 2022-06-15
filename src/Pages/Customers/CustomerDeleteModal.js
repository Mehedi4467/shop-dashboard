import React from 'react';
import { toast } from 'react-toastify';

const CustomerDeleteModal = ({ setCustomerModal, customerModal }) => {
    const handelCustomerDelete = id => {
        fetch(`http://localhost:5000/customer/admin/delete/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }

        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged && data.deletedCount > 0) {
                    setCustomerModal(null);
                    toast("Customer Delete Successfully.");
                }

            })
    }
    return (
        <div>

            <input type="checkbox" id="customer-delete-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Do you want to delete <span className='text-orange-500'>{customerModal.name}</span>  ?</h3>
                    <p className="py-4"><span className='text-warning'>Warning : </span> If you delete, the customer will no longer be able to buy the product</p>
                    <div className='flex justify-end'>
                        <div className="modal-action mr-4">
                            <button onClick={() => handelCustomerDelete(customerModal._id)} className="btn bg-orange-500">Delete</button>
                        </div>
                        <div className="modal-action">
                            <label htmlFor="customer-delete-modal" className="btn">Cencle</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDeleteModal;