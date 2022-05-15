import React, { useState } from 'react';

const CategoryModal = () => {
    const [existing, setExisting] = useState(false);

    const handelAddCategory = (event) => {
        event.preventDefault();
        const type = event.target.type.value;
        const category = event.target.category.value;
        const subCategory = event.target.subCategory.value;

        const Category = { type, category, Category: [{ subCategory: [subCategory] }] };

        console.log(Category)
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
                            <select defaultValue={'DEFAULT'} name="type" className="select select-warning w-full" required>
                                <option value="DEFAULT" disabled >Seclct Category Type</option>
                                <option>Cheese</option>
                                <option >Veggie</option>
                                <option >Pepperoni</option>
                                <option>Margherita</option>
                                <option >Hawaiian</option>
                            </select>
                        </div>


                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Category</span> <div className='flex items-center'> <input onClick={() => setExisting(!existing)} type="checkbox" className="checkbox checkbox-xs" /><p className='ml-2'>Existing Category?</p></div>
                            </label>
                            {existing ? <select defaultValue={'DEFAULT'} name='category' className="select select-warning w-full" required>
                                <option value="DEFAULT" disabled >Seclct Category</option>
                                <option >Cheese</option>
                                <option >Veggie</option>
                                <option >Pepperoni</option>
                                <option>Margherita</option>
                                <option>Hawaiian</option>
                            </select> : <input type="text" name='category' placeholder="Category here" className="input input-bordered w-full" required />}
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