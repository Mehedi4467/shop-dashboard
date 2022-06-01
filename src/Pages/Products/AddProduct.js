import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useAdminUserData from '../../Hooks/AdminUserData/useAdminUserData';
import ButtonSpinner from '../../Shared/Spinner/ButtonSpinner';
import Spinner from '../../Shared/Spinner/Spinner';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm({ mode: "onChange" });
    const [image, setImage] = useState(null);
    const [secondImage, setSecondImage] = useState(null);
    const img = register('img');
    const secondImg = register('secondImg');
    const [primaryImageSize, setPrimaryImageSize] = useState('');
    const [secondImageSize, setsecondImageSize] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const [userData, adminLoadingData] = useAdminUserData(user?.email);
    const [subCategoryItem, setSubCategoryItem] = useState([]);
    const [subSubCategory, setsubSubCategory] = useState([]);
    const [buttonLoading, setButtonLoading] = useState(false);



    const { isLoading, data, refetch } = useQuery('categories', () =>
        fetch('http://localhost:5000/category').then(res =>
            res.json()
        )
    );


    const handelSubCategory = (id) => {
        const exsitingSub = data.categories.find(e => e._id === id);
        setSubCategoryItem(exsitingSub?.category);

    }
    const handelUnderSubCategory = (name) => {

        const machName = subCategoryItem.find(e => e.name === name);
        setsubSubCategory(machName?.subCategory);

    }


    if (loading || adminLoadingData || isLoading) {
        return <Spinner></Spinner>
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            if (event.target.files[0].size < 300000) {
                if (event.target.files[0].type === "image/jpeg" || event.target.files[0].type === "image/jpg" || event.target.files[0].type === "image/png") {
                    setImage(URL.createObjectURL(event.target.files[0]));
                    setPrimaryImageSize("");
                    console.log(event.target.files[0].type)
                }
                else {
                    setPrimaryImageSize("Only Accepted jpeg, png, jpg");
                }
            }
            else {

                setPrimaryImageSize("Image Size Too Large. Please upload image max size 300KB and type jpeg, png, jpg");
            }
        }

    };


    const onSecondImageChange = (event) => {
        if (event.target.files) {
            const targetImages = event.target.files;

            const imageObject = Object.keys(targetImages).map((img, index) => URL.createObjectURL(event.target.files[index]));
            const imageObjectLength = imageObject.length;
            let ImageSize = 0;
            for (let i = 0; i < imageObjectLength; i++) {

                if (event.target.files[0].type === "image/jpeg" || event.target.files[0].type === "image/jpg" || event.target.files[0].type === "image/png") {
                    ImageSize += event.target.files[i]?.size;
                }
                else {
                    return setsecondImageSize("Only Accepted jpeg, png, jpg");
                }
            }

            if (imageObjectLength > 4 || ImageSize > 300000) {
                setsecondImageSize("Image Size Too Large. Please upload image max size 300KB and less then 5 Images and type jpeg, png, jpg");
            }
            else {
                setSecondImage(imageObject);
                setsecondImageSize("")
            }
        }
    };


    const onSubmit = async (data) => {
        setButtonLoading(true);
        const productName = data.productName;
        const sku = data.sku;
        const shortDescription = data.shortDescription;
        const logDescription = data.longDescription;
        const price = data.price;
        const quantity = data.quantity;
        const deliveryInDhaka = data.dInDhaka;
        const outDhaka = data.oDhaka;
        const color = data.color;
        const size = data.size;
        const marchentShop = userData.name;
        const marchentEmail = userData.email;
        const marchantPhone = userData.phone;
        const mainCategoryID = data.mainCategory;
        const subCategory = data.subCategory;
        const category = data.category;
        const orderType = data.orderType;



        const imageData = data.img[0];
        const secondImageData = data.secondImg;
        let formData = new FormData();
        formData.append('primaryImage', imageData);

        for (let i = 0; i < secondImageData.length; i++) {
            formData.append(`secondImage`, secondImageData[i]);
        };
        formData.append('productName', productName);
        formData.append('sku', sku);
        formData.append('shortDescription', shortDescription);
        formData.append('logDescription', logDescription);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('deliveryInDhaka', deliveryInDhaka);
        formData.append('outDhaka', outDhaka);
        formData.append('color', color);
        formData.append('size', size);
        formData.append('marchentShop', marchentShop);
        formData.append('marchentEmail', marchentEmail);
        formData.append('marchantPhone', marchantPhone);
        formData.append('mainCategoryID', mainCategoryID);
        formData.append('subCategory', subCategory);
        formData.append('category', category);
        formData.append('orderType', orderType);




        await fetch('http://localhost:5000/product', {
            method: "POST",
            body: formData,

        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast('Product Upload Successfully.');
                    setButtonLoading(false);
                    reset();
                    refetch();
                }
            })
    };

    return (
        <div className='flex justify-center'>
            <div className="card w-full bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title mx-auto text-orange-500 mb-6">Add Your Product</h2>
                    {
                        primaryImageSize || secondImageSize ? <h2 className='text-center text-orange-500'>{primaryImageSize || secondImageSize}</h2> : ''
                    }

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className='flex justify-center'>
                            <div className='w-3/4'>
                                <div className='flex'>
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <p className="label-text font-semibold">Product primery Image <span className='text-orange-500'>(MAX 300MB Size 300X300) *</span> </p>
                                        </label>
                                        <div className='flex items-center space-x-6'>
                                            <div className="shrink-0">
                                                {
                                                    image ? <img className="object-cover w-16 h-16 rounded-full"
                                                        src={image} alt="Product Images" /> : <i className="far fa-image"></i>
                                                }

                                            </div>
                                            <label className="block">
                                                <span className="sr-only">Choose File</span>
                                                <input type="file"
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                    {...register("img", {
                                                        required: {
                                                            value: true,
                                                            message: "Product Image is required",

                                                        },

                                                    })}
                                                    onChange={(e) => { img.onChange(e); onImageChange(e) }}


                                                />
                                                <label className="label">
                                                    {errors.img?.type === "required" && (
                                                        <span className="label-text-alt text-warning">
                                                            {errors.img.message}
                                                        </span>
                                                    )}
                                                </label>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-control w-full ">
                                        <label className="label">

                                            <p className="label-text font-semibold">Product secondary Image <span className='text-orange-500 text-xs'>(Each image MAX 300MB Size 300X300 and upload 1 to 4 image) *</span> </p>
                                        </label>
                                        <div className=' space-x-6'>

                                            <label className="block">
                                                <span className="sr-only">Choose File</span>
                                                <input type="file"
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                    {...register("secondImg", {
                                                        required: {
                                                            value: true,
                                                            message: "Product secondary Image is required",

                                                        },

                                                    })}
                                                    onChange={(e) => { secondImg.onChange(e); onSecondImageChange(e) }}
                                                    multiple

                                                />
                                                <label className="label">
                                                    {errors.secondImg?.type === "required" && (
                                                        <span className="label-text-alt text-warning">
                                                            {errors.secondImg.message}
                                                        </span>
                                                    )}
                                                </label>
                                            </label>

                                            <div className="flex  items-center shrink-0 ml-0">
                                                {
                                                    secondImage ? <div className='flex justify-around'>
                                                        {
                                                            secondImage.map(image => <img className="mr-2 object-cover w-10 h-10 rounded-full"
                                                                src={image} alt="Product Images" />)
                                                        }
                                                    </div> : <i className="far fa-image"></i>
                                                }

                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text font-semibold">Product Name *</span>
                                    </label>
                                    <input type="text" placeholder="Product Name" className="input input-bordered input-primary w-full"
                                        {...register("productName", {
                                            required: {
                                                value: true,
                                                message: "Product Name is required",
                                            },
                                        })}
                                    />
                                    <label className="label">
                                        {errors.productName?.type === "required" && (
                                            <span className="label-text-alt text-warning">
                                                {errors.productName.message}
                                            </span>
                                        )}
                                    </label>
                                </div>

                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text font-semibold">Product SKU *</span>
                                    </label>
                                    <input type="text" placeholder="Product SKU" className="input input-bordered input-primary w-full"
                                        {...register("sku", {
                                            required: {
                                                value: true,
                                                message: "Product SKU is required",
                                            },
                                        })}
                                    />
                                    <label className="label">
                                        {errors.sku?.type === "required" && (
                                            <span className="label-text-alt text-warning">
                                                {errors.sku.message}
                                            </span>
                                        )}
                                    </label>
                                </div>




                                <div>

                                    <div className="form-control w-full">

                                        <label className="label">
                                            <span className="label-text font-semibold">Main Category *</span>
                                        </label>

                                        <select onClick={(e) => handelSubCategory(e.target.value)} className="select select-primary w-full"
                                            {...register("mainCategory", {
                                                required: {
                                                    value: true,
                                                    message: "Product Main Category is required",
                                                },
                                            })}


                                        >
                                            <option selected value='' >Selecte Main Category</option>

                                            {
                                                data?.categories?.map(category => <option value={category._id} key={category._id} >{category.name}</option>)
                                            }

                                        </select>


                                        <label className="label">
                                            {errors.mainCategory?.type === "required" && (
                                                <span className="label-text-alt text-warning">
                                                    {errors.mainCategory.message}
                                                </span>
                                            )}
                                        </label>
                                    </div>


                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text font-semibold">Category *</span>
                                        </label>

                                        <select onClick={(e) => handelUnderSubCategory(e.target.value)} className="select font-normal select-primary w-full"
                                            {...register("category", {
                                                required: {
                                                    value: true,
                                                    message: "Product Category is required",
                                                },
                                            })}
                                        >
                                            <option value="" selected >Seclct Category</option>

                                            {subCategoryItem?.map((category, index) => <option key={index} >{category?.name}</option>)

                                            }
                                        </select>

                                        <label className="label">
                                            {errors.category?.type === "required" && (
                                                <span className="label-text-alt text-warning">
                                                    {errors.category.message}
                                                </span>
                                            )}
                                        </label>
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text font-semibold">Sub Category *</span>
                                        </label>

                                        <select className="select select-primary w-full font-normal"
                                            {...register("subCategory", {
                                                required: {
                                                    value: true,
                                                    message: "Product Sub Category is required",
                                                },
                                            })}
                                        >
                                            <option value="" selected >Seclct Sub Category</option>

                                            {subSubCategory?.map((category, index) => <option key={index} >{category?.name}</option>)

                                            }
                                        </select>

                                        <label className="label">
                                            {errors.subCategory?.type === "required" && (
                                                <span className="label-text-alt text-warning">
                                                    {errors.subCategory.message}
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                </div>






                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Product Short Description *</span>

                                    </label>
                                    <textarea className="textarea textarea-bordered textarea-primary  h-24" placeholder="Product Short Description"
                                        {...register("shortDescription", {
                                            required: {
                                                value: true,
                                                message: "Product short description is required",
                                            },
                                        })}

                                    />
                                    <label className="label">
                                        {errors.shortDescription?.type === "required" && (
                                            <span className="label-text-alt text-warning">
                                                {errors.shortDescription.message}
                                            </span>
                                        )}
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Product Long Description</span>

                                    </label>
                                    <textarea className="textarea textarea-bordered textarea-primary  h-24" placeholder="Product Long Description"
                                        {...register("longDescription", {
                                            required: {
                                                value: false,
                                            },
                                        })}

                                    />

                                </div>

                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text font-semibold">Product Price *</span>
                                    </label>
                                    <input type="number" placeholder="Product Price" className="input input-bordered input-primary w-full"
                                        {...register("price", {
                                            required: {
                                                value: true,
                                                message: "Product Price is required",
                                            },
                                        })}
                                    />
                                    <label className="label">
                                        {errors.price?.type === "required" && (
                                            <span className="label-text-alt text-warning">
                                                {errors.price.message}
                                            </span>
                                        )}
                                    </label>
                                </div>
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text font-semibold">Product Quantity *</span>
                                    </label>
                                    <input type="number" placeholder="Product Quantity" className="input input-bordered input-primary w-full"
                                        {...register("quantity", {
                                            required: {
                                                value: true,
                                                message: "Product Quantity is required",
                                            },
                                        })}
                                    />
                                    <label className="label">
                                        {errors.quantity?.type === "required" && (
                                            <span className="label-text-alt text-warning">
                                                {errors.quantity.message}
                                            </span>
                                        )}
                                    </label>
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-semibold">Product Delivery Charge *</span>
                                    </label>
                                    <div className='flex justify-center'>
                                        <div className='mr-6 w-full'>
                                            <label className="label">
                                                <span className="label-text font-semibold">In Dhaka</span>
                                            </label>
                                            <input type="number" placeholder="Delivery Charge In Dhaka" className="input input-bordered input-primary w-full"
                                                {...register("dInDhaka", {
                                                    required: {
                                                        value: true,
                                                        message: "Product Delivery Charge is required",
                                                    },
                                                })}
                                            />
                                            <label className="label">
                                                {errors.dInDhaka?.type === "required" && (
                                                    <span className="label-text-alt text-warning">
                                                        {errors.dInDhaka.message}
                                                    </span>
                                                )}
                                            </label>
                                        </div>

                                        <div className='w-full'>
                                            <label className="label">
                                                <span className="label-text font-semibold">Above Dhaka</span>
                                            </label>
                                            <input type="number" placeholder="Product Delivery Charge Out Side Of Dhaka" className="input input-bordered input-primary w-full"
                                                {...register("oDhaka", {
                                                    required: {
                                                        value: true,
                                                        message: "Product Delivery Charge is required",
                                                    },
                                                })}
                                            />
                                            <label className="label">
                                                {errors.oDhaka?.type === "required" && (
                                                    <span className="label-text-alt text-warning">
                                                        {errors.oDhaka.message}
                                                    </span>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>




                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text font-semibold">Order Type *</span>
                                    </label>


                                    <select className="select select-primary w-full "
                                        {...register("orderType", {
                                            required: {
                                                value: true,
                                                message: "Order Type is required",
                                            },
                                        })}
                                    >
                                        <option disabled selected>Selete Order Type</option>
                                        <option>COD</option>
                                        <option>Pre-Order</option>
                                    </select>
                                    <label className="label">
                                        {errors.orderType?.type === "required" && (
                                            <span className="label-text-alt text-warning">
                                                {errors.orderType.message}
                                            </span>
                                        )}
                                    </label>

                                </div>




                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text font-semibold">Product Color</span>
                                    </label>
                                    <input type="text" placeholder="Product Color" className="input input-bordered input-primary w-full"
                                        {...register("color", {
                                            required: {
                                                value: false,

                                            },
                                            deps: [],
                                        })}
                                    />
                                    <label className="label">
                                        {errors.color?.type === "required" && (
                                            <span className="label-text-alt text-warning">
                                                {errors.color.message}
                                            </span>
                                        )}
                                    </label>
                                </div>
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text font-semibold">Product Size</span>
                                    </label>
                                    <input type="text" placeholder="Product Size" className="input input-bordered input-primary w-full"
                                        {...register("size", {
                                            required: {
                                                value: false,

                                            },
                                            deps: [],
                                        })}
                                    />
                                    <label className="label">
                                        {errors.size?.type === "required" && (
                                            <span className="label-text-alt text-warning">
                                                {errors.size.message}
                                            </span>
                                        )}
                                    </label>
                                </div>



                            </div>
                        </div>



                        {
                            buttonLoading ? <ButtonSpinner></ButtonSpinner> : <div className="card-actions justify-end">
                                {
                                    error || secondImageSize || primaryImageSize ? <button className="btn btn-primary" disabled>Solve Error</button> : <button className="btn btn-primary">Upload</button>
                                }

                            </div>
                        }




                    </form>



                </div>
            </div>
        </div>
    );
};

export default AddProduct;