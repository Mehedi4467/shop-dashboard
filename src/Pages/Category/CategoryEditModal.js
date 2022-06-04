import React from 'react';
import { toast } from 'react-toastify';

const CategoryEditModal = ({ subCategory: categoryModal, setCategoryModal, refetch }) => {

    const handelCategoryUpdate = (event) => {
        event.preventDefault();

        const subCategorys = [];
        if (!event.target.subCategory.length) {
            subCategorys.push({ name: event.target.subCategory.value || categoryModal.subCategory[0].name, slug: event.target.subCategory.value.replace(/\s/g, '-') || categoryModal.subCategory[0].slug })
        }
        else {
            for (let i = 0; i < categoryModal.subCategory.length; i++) {
                const subCategoryName = event.target?.subCategory[i].value;
                subCategorys.push({ name: subCategoryName || categoryModal.subCategory[i].name, slug: subCategoryName.replace(/\s/g, '-') || categoryModal.subCategory[i].slug });
            }
        }

        const subCategory = subCategorys;
        const name = event.target.name.value || categoryModal.name;
        const slug = name.replace(/\s/g, '-');
        const status = categoryModal.status;
        const img = categoryModal.img;

        const updateAllCategory = {
            name, slug, status, img, subCategory
        }


        fetch(`https://stormy-peak-02130.herokuapp.com/category/update/all/${categoryModal.slug}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updateAllCategory)

        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged && data.modifiedCount > 0) {
                    toast('Category Update Successfully');
                    refetch();
                    setCategoryModal(null);

                }
            });



        console.log(updateAllCategory);
    }


    return (
        <div>
            <input type="checkbox" id="update-modal-category" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center text-orange-500">Update Category</h3>


                    <form onSubmit={handelCategoryUpdate}>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Category</span>
                            </label>
                            <input type="text" defaultValue={categoryModal.name} name='name' placeholder={categoryModal.name} className="input input-primary w-full" />
                        </div>


                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Sub Category</span>
                            </label>
                            {
                                categoryModal?.subCategory.map((sub, index) => <input key={index} type="text" defaultValue={sub.name} name={`subCategory`} placeholder={sub.name} className="input input-primary w-full mb-2" />)
                            }

                        </div>




                        <div className='flex justify-end'>
                            <div className="modal-action mr-4">
                                <button type='submit' className="btn bg-orange-500">Update Category</button>
                            </div>
                            <div className="modal-action">
                                <button type='reset' onClick={() => setCategoryModal(null)} className="btn">Cencle</button>
                            </div>
                        </div>

                    </form>


                </div>
            </div>
        </div>
    );
};

export default CategoryEditModal;