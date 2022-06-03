import React from 'react';

const CustomerViewModal = ({ customerModal, setCustomerModal }) => {
    return (
        <div>

            <input type="checkbox" id="customer-view-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="customer-view-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold text-center text-orange-500">{customerModal.name}</h3>

                    <div className='my-6'>
                        <p> <span className='text-orange-500'>Email: </span> {customerModal.email}</p>
                        <p> <span className='text-orange-500'>Phone: </span> {customerModal.phone}</p>
                        <p> <span className='text-orange-500'>Joining Date: </span> {customerModal.date}</p>

                        <div>
                            <h2 className='font-bold text-orange-500 text-center'>Address</h2>
                            <div>
                                <p className='capitalize'> <span className='text-orange-500 '>Division: </span> {customerModal.address.Divisition}</p>
                                <p className='capitalize'> <span className='text-orange-500 '>City: </span> {customerModal.address.City}</p>
                                <p className='capitalize'> <span className='text-orange-500 '>Detail: </span> {customerModal.address.allAddress}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CustomerViewModal;