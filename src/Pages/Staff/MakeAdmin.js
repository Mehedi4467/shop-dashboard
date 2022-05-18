import React from 'react';
import { toast } from 'react-toastify';

const MakeAdmin = ({ openModal, setOpenModal, refetch }) => {

    const makeAdmin = () => {
        fetch(`http://localhost:5000/adminUser/admin/${openModal.email}`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast("Admin set successfully");
                    setOpenModal(null);
                    refetch();
                }
                else {
                    toast("Something is wrong! Please try Again");
                }

            })

    }
    return (
        <div>
            <input type="checkbox" id="makeAdmin-modal-user" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="font-bold text-lg"> Do you want to be the admin of <span className='text-red-600'>{openModal.name}</span> ?</h3>
                    <p class="py-4"><span className='text-red-600'>Discretion: </span> {`If you admin ${openModal.name} then he will get all access to your dashboard. And he/she also edit User, Product and Orders !`}</p>
                    <div className='flex justify-end'>
                        <div class="modal-action mr-4">
                            <label onClick={makeAdmin} class="btn bg-red-500">Make Admin</label>
                        </div>
                        <div class="modal-action">
                            <label for="makeAdmin-modal-user" class="btn">Cencal</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeAdmin;