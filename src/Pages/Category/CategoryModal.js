import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Spinner from '../../Shared/Spinner/Spinner';

const CategoryModal = () => {
    const [existing, setExisting] = useState(false);

    const [subCategoryItem, setSubCategoryItem] = useState([]);




    const { isLoading, error, data, refetch } = useQuery('categories', () =>
        fetch('http://localhost:5000/category').then(res =>
            res.json()
        )
    )

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
        const categorySlug = category.replace(/\s/g, '-');




        const selectItem = data.categories.find(i => i._id === type)
        const newCategory = [...selectItem.category];
        console.log("newCategory", newCategory)
        const category2 = newCategory.find(e => e.name === category)
        console.log(category2)
        if (!category2) {
            newCategory.push({ name: category, slug: categorySlug, img: '', subCategory: [subCategory] });
            console.log(newCategory);
        }
        else {
            newCategory.subCategory.push(subCategory)
        }
        console.log("final array", newCategory)



        // const Category = {

        //     name: type,
        //     category: [
        //         {
        //             name: category,
        //             slug: categorySlug,
        //             img: '',
        //             subCategory: [
        //                 subCategory,
        //             ]
        //         }]
        // };

        fetch(`http://localhost:5000/category/${type}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ newCategory })
        })
            .then(res => res.json())
            .then(data => console.log(data));

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
                                <option value="DEFAULT" disabled >Seclct Category Type</option>
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

                                {subCategoryItem.map((category, index) => <option key={index} >{category?.name}</option>)}
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