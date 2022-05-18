import React from 'react';

const deleteModalUser = ({ openModal }) => {
    return (
        <div>
            <input type="checkbox" id="delete-modal-user" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="font-bold text-lg"> Are you sure you want to delete <span className='text-red-600'>{openModal.name}</span> ?</h3>
                    <p class="py-4"><span className='text-red-600'>Discretion: </span>  {`If you delete ${openModal.name}, he will lose all access and will be canceled from Shop in Shop member.`}</p>
                    <div className='flex justify-end'>
                        <div class="modal-action mr-4">
                            <label class="btn bg-red-500">Delete</label>
                        </div>
                        <div class="modal-action">
                            <label for="delete-modal-user" class="btn">Cencal</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default deleteModalUser;