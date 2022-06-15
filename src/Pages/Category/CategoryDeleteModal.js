import React from 'react';
import { toast } from 'react-toastify';

const CategoryDeleteModal = ({ categoryModal, subCategory, setCategoryModal, refetch }) => {


    const handelDeleteCategory = () => {
        fetch(`http://localhost:5000/category/delete/${categoryModal._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(subCategory)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged && data.modifiedCount > 0) {
                    refetch();
                    toast("Category Detete Successfully");
                    setCategoryModal(null);


                }
                else {
                    toast.error("Something is Wrong.Please Reload the Browser");
                }
            })
    }
    return (
        <div>

            <input type="checkbox" id="category-delete-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Do you want to delete the <span className='text-xl text-warning'>{subCategory.name}</span> category?</h3>
                    <p className="py-4"> <span className='text-warning'>Warning: </span> If you delete the parent category then all its child categories will be deleted</p>
                    <div className='flex justify-end'>
                        <div className="modal-action mr-4">
                            <button onClick={handelDeleteCategory} className="btn bg-orange-500">Delete</button>
                        </div>
                        <div className="modal-action">
                            <label htmlFor="category-delete-modal" className="btn">Cencle</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryDeleteModal;