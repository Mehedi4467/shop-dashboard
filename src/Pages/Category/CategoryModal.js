import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../../Shared/Spinner/Spinner';

const CategoryModal = ({ refetch, isLoading, data }) => {
    const [existing, setExisting] = useState(false);

    const [subCategoryItem, setSubCategoryItem] = useState([]);



    if (isLoading) {
        return <Spinner></Spinner>
    }

    const handelSubCategory = (id) => {
        const exsitingSub = data.categories.find(e => e._id === id);
        setSubCategoryItem(exsitingSub?.category)
    }

    const handelAddCategory = (event) => {
        event.preventDefault();
        const type = event.target.type.value;
        const category = event.target.category.value;
        const subCategory = event.target.subCategory.value;
        const img = event?.target?.img?.value;
        const categorySlug = category.replace(/\s/g, '-');
        const subCategorySlug = subCategory.replace(/\s/g, '-');


        if (category === "DEFAULT") {
            toast.error("Please Select Valid Category");
        } else {
            const selectItem = data?.categories.find(i => i._id === type)
            const newCategory = [...selectItem?.category];

            const category2 = newCategory.find(e => e.name === category)
            console.log(category2)

            if (!category2) {
                newCategory.push({ name: category, status: true, slug: categorySlug, img: img, subCategory: [{ name: subCategory, slug: subCategorySlug }] });

            }
            else {

                const index = newCategory.findIndex(x => x.name === category);
                newCategory[index].subCategory.push({ name: subCategory, slug: subCategorySlug })

            }


            fetch(`http://localhost:5000/category/${type}`, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ newCategory })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast("Successful added category");
                        event.target.reset();
                        refetch();
                    } else {
                        toast.error("Some Problem Occurs! Please Reload Browser");
                    }
                });


        }
    }


    return (
        <div>

            <input type="checkbox" id="category-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="category-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold text-center text-blue-500">Add category</h3>
                    <form onSubmit={handelAddCategory} className='py-6'>
                        <div className="form-control w-full">
                            <select onClick={(e) => handelSubCategory(e.target.value)} defaultValue={'DEFAULT'} name="type" className="select select-warning w-full" required>

                                {
                                    data.categories.map(category => <option value={category._id} key={category._id} >{category.name}</option>)
                                }

                            </select>
                        </div>


                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Category</span> <div className='flex items-center'> <input onClick={() => setExisting(!existing)} type="checkbox" className="checkbox checkbox-xs" /><p className='ml-2'>Existing Category?</p></div>
                            </label>
                            {existing ? <select defaultValue={'DEFAULT'} name='category' className="select select-warning w-full" required>
                                <option value="DEFAULT" disabled >Seclct Category</option>

                                {subCategoryItem?.map((category, index) => <option key={index} >{category?.name}</option>)}
                            </select> : <input type="text" name='category' placeholder="Category here" className="input input-bordered w-full" required />}
                        </div>
                        <div className={`form-control w-full mb-4 ${existing && 'hidden'}`}>
                            <label className="label">
                                <span className="label-text">Sub Category Image</span>
                            </label>
                            <input name='img' type="text" placeholder="Sub Category Image here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text">Sub Category</span>
                            </label>
                            <input name='subCategory' type="text" placeholder="Sub Category here" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full">
                            <button type='submit' className="btn btn-primary">Add Category</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;