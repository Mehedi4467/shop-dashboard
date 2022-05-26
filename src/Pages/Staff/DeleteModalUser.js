
import React from 'react';
import { toast } from 'react-toastify';

const deleteModalUser = ({ user, openModal, refetch, setOpenModal }) => {


    const handelDeleteUser = id => {
        fetch(`http://localhost:5000/adminUser/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setOpenModal(null);
                    toast("User Deleted Successfully");
                    refetch();

                }
                else {
                    toast("Oop! Something is wrong. Please Reload your browser");
                }
            })
    };

    return (
        <div>
            <input type="checkbox" id="delete-modal-user" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg"> Are you sure you want to delete <span className='text-red-600 capitalize'>{openModal?.role || openModal.name}</span> ?</h3>
                    <p className="py-4"><span className='text-red-600'>Discretion: </span>  {`If you delete ${openModal.name}, he will lose all access and will be canceled from Shop in Shop member.`}</p>
                    <div className='flex justify-end'>
                        <div className="modal-action mr-4">
                            <label onClick={() => handelDeleteUser(openModal._id)} className="btn bg-red-500">Delete</label>
                        </div>
                        <div className="modal-action">
                            <label for="delete-modal-user" className="btn">Cencal</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default deleteModalUser;