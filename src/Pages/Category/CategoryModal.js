import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../../Shared/Spinner/Spinner';

const CategoryModal = ({ refetch, isLoading, data }) => {
    const [existing, setExisting] = useState(false);
    const imgStore_key = '2f6c6879a39132782b251889cb5d783f';
    const [subCategoryItem, setSubCategoryItem] = useState([]);




    const handelSubCategory = (id) => {
        const exsitingSub = data.categories.find(e => e._id === id);
        setSubCategoryItem(exsitingSub?.category)
    }

    const handelAddCategory = (event) => {
        event.preventDefault();
        const type = event.target.type.value;
        const category = event.target.category.value;
        const subCategory = event.target.subCategory.value;
        const img = event?.target?.img?.files[0] || subCategoryItem.img;
        const categorySlug = category.replace(/\s/g, '-');
        const subCategorySlug = subCategory.replace(/\s/g, '-');


        if (category === "DEFAULT") {
            toast.error("Please Select Valid Category");
        } else {


            if (img && !existing) {
                const formData = new FormData();
                formData.append('image', img);
                const url = `https://api.imgbb.com/1/upload?key=${imgStore_key}`;
                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result.success) {
                            const image = result.data.url;
                            const selectItem = data?.categories.find(i => i._id === type)
                            const newCategory = [...selectItem?.category];

                            const category2 = newCategory.find(e => e.name === category)
                            console.log(newCategory)
                            if (!category2) {
                                newCategory.push({ name: category, status: true, slug: categorySlug, img: image, subCategory: [{ name: subCategory, slug: subCategorySlug }] });

                            }

                            else {

                                const index = newCategory.findIndex(x => x.name === category);
                                newCategory[index].subCategory.push({ name: subCategory, slug: subCategorySlug })

                            }
                            console.log(newCategory)
                            fetch(`http://localhost:5000/category/${type}`, {
                                method: "PUT",
                                headers: {
                                    'content-type': 'application/json',
                                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
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
                        console.log(result)
                    })


            }


            else {

                const selectItem = data?.categories.find(i => i._id === type)
                const newCategory = [...selectItem?.category];

                const category2 = newCategory.find(e => e.name === category)

                if (!category2) {
                    newCategory.push({ name: category, status: true, slug: categorySlug, img: img, subCategory: [{ name: subCategory, slug: subCategorySlug }] });

                }
                else {

                    const index = newCategory.findIndex(x => x.name === category);
                    newCategory[index].subCategory.push({ name: subCategory, slug: subCategorySlug })

                }

                console.log(newCategory)
                fetch(`http://localhost:5000/category/${type}`, {
                    method: "PUT",
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
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
    }


    if (isLoading) {
        return <Spinner></Spinner>
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
                                    data?.categories?.map(category => <option value={category._id} key={category._id} >{category.name}</option>)
                                }

                            </select>
                        </div>


                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text font-semibold">Category</span> <div className='flex items-center'> <input onClick={() => setExisting(!existing)} type="checkbox" className="checkbox checkbox-xs" /><p className='ml-2'>Existing Category?</p></div>
                            </label>
                            {existing ? <select defaultValue={'DEFAULT'} name='category' className="select select-warning w-full" required>
                                <option value="DEFAULT" disabled >Seclct Category</option>

                                {subCategoryItem?.map((category, index) => <option key={index} >{category?.name}</option>)}
                            </select> : <input type="text" name='category' placeholder="Category here" className="input input-bordered w-full" required />}
                        </div>
                        <div className={`form-control w-full mb-4 ${existing && 'hidden'}`}>
                            <label className="label">
                                <span className="label-text font-semibold">Sub Category Image</span>
                            </label>
                            {/* <input name='img' type="text" placeholder="Sub Category Image here" className="input input-bordered w-full" /> */}





                            <div>
                                <label className="flex items-center ">
                                    <span className="sr-only">Choose File</span>
                                    <input type="file" name='img' defaultValue=''
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        required={!existing}
                                    />
                                </label>
                            </div>




                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text font-semibold">Sub Category</span>
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