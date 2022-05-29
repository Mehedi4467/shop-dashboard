import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit } = useForm({ mode: "onChange" });
    const [image, setImage] = useState(null);
    const img = register('img');
    const onSubmit = data => console.log(data);
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            // setImage(event.target.files[0].size)
        }

    }
    console.log(image);
    return (
        <div className='flex justify-center'>
            <div class="card w-full bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title mx-auto text-orange-500">Add Your Product</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>




                        <div className='flex justify-center'>
                            <div className='w-3/4'>
                                <div class="form-control w-full ">
                                    <label class="label">
                                        <span class="label-text font-semibold">Product Image *</span>
                                    </label>
                                    <div className='flex items-center space-x-6'>
                                        <div class="shrink-0">
                                            {
                                                image ? <img class="object-cover w-16 h-16 rounded-full"
                                                    src={image} alt="Product Images" /> : <i class="far fa-image"></i>
                                            }

                                        </div>
                                        <label class="block">
                                            <span class="sr-only">Choose File</span>
                                            <input type="file"
                                                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                {...register("img", {
                                                    required: {
                                                        value: true,
                                                        message: "Product Image is required",

                                                    },

                                                })}
                                                onChange={(e) => { img.onChange(e); onImageChange(e) }}


                                            />
                                            <label class="label">
                                                {errors.img?.type === "required" && (
                                                    <span className="label-text-alt text-warning">
                                                        {errors.img.message}
                                                    </span>
                                                )}
                                            </label>
                                        </label>
                                    </div>
                                </div>

                                <div class="form-control w-full ">
                                    <label class="label">
                                        <span class="label-text font-semibold">Product Name *</span>
                                    </label>
                                    <input type="text" placeholder="Product Name" class="input input-bordered input-primary w-full"
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: "Product Name is required",
                                            },
                                        })}
                                    />
                                    <label class="label">
                                        {errors.name?.type === "required" && (
                                            <span className="label-text-alt text-warning">
                                                {errors.name.message}
                                            </span>
                                        )}
                                    </label>
                                </div>
                                <div class="form-control w-full ">
                                    <label class="label">
                                        <span class="label-text font-semibold">Product SKU *</span>
                                    </label>
                                    <input type="text" placeholder="Product SKU" class="input input-bordered input-primary w-full"
                                        {...register("sku", {
                                            required: {
                                                value: true,
                                                message: "Product SKU is required",
                                            },
                                        })}
                                    />
                                    <label class="label">
                                        {errors.sku?.type === "required" && (
                                            <span className="label-text-alt text-warning">
                                                {errors.sku.message}
                                            </span>
                                        )}
                                    </label>
                                </div>

                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text font-semibold">Product Short Description *</span>

                                    </label>
                                    <textarea class="textarea textarea-bordered textarea-primary  h-24" placeholder="Product Short Description"
                                        {...register("shortDescription", {
                                            required: {
                                                value: true,
                                                message: "Product short description is required",
                                            },
                                        })}

                                    />
                                    <label class="label">
                                        {errors.shortDescription?.type === "required" && (
                                            <span className="label-text-alt text-warning">
                                                {errors.shortDescription.message}
                                            </span>
                                        )}
                                    </label>
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text font-semibold">Product Long Description</span>

                                    </label>
                                    <textarea class="textarea textarea-bordered textarea-primary  h-24" placeholder="Product Long Description"
                                        {...register("longDescription", {
                                            required: {
                                                value: false,
                                            },
                                        })}

                                    />

                                </div>

                                <div class="form-control w-full ">
                                    <label class="label">
                                        <span class="label-text font-semibold">Product Price *</span>
                                    </label>
                                    <input type="number" placeholder="Product Price" class="input input-bordered input-primary w-full"
                                        {...register("price", {
                                            required: {
                                                value: true,
                                                message: "Product Price is required",
                                            },
                                        })}
                                    />
                                    <label class="label">
                                        {errors.price?.type === "required" && (
                                            <span className="label-text-alt text-warning">
                                                {errors.price.message}
                                            </span>
                                        )}
                                    </label>
                                </div>
                                <div class="form-control w-full ">
                                    <label class="label">
                                        <span class="label-text font-semibold">Product Quantity *</span>
                                    </label>
                                    <input type="number" placeholder="Product Quantity" class="input input-bordered input-primary w-full"
                                        {...register("quantity", {
                                            required: {
                                                value: true,
                                                message: "Product Quantity is required",
                                            },
                                        })}
                                    />
                                    <label class="label">
                                        {errors.quantity?.type === "required" && (
                                            <span className="label-text-alt text-warning">
                                                {errors.quantity.message}
                                            </span>
                                        )}
                                    </label>
                                </div>
                                <div class="form-control w-full">
                                    <label class="label">
                                        <span class="label-text font-semibold">Product Delivery Charge *</span>
                                    </label>
                                    <div className='flex justify-center'>
                                        <div className='mr-6 w-full'>
                                            <label class="label">
                                                <span class="label-text font-semibold">In Dhaka</span>
                                            </label>
                                            <input type="number" placeholder="Delivery Charge In Dhaka" class="input input-bordered input-primary w-full"
                                                {...register("dInDhaka", {
                                                    required: {
                                                        value: true,
                                                        message: "Product Delivery Charge is required",
                                                    },
                                                })}
                                            />
                                            <label class="label">
                                                {errors.dInDhaka?.type === "required" && (
                                                    <span className="label-text-alt text-warning">
                                                        {errors.dInDhaka.message}
                                                    </span>
                                                )}
                                            </label>
                                        </div>

                                        <div className='w-full'>
                                            <label class="label">
                                                <span class="label-text font-semibold">Above Dhaka</span>
                                            </label>
                                            <input type="number" placeholder="Product Delivery Charge Out Side Of Dhaka" class="input input-bordered input-primary w-full"
                                                {...register("oDhaka", {
                                                    required: {
                                                        value: true,
                                                        message: "Product Delivery Charge is required",
                                                    },
                                                })}
                                            />
                                            <label class="label">
                                                {errors.oDhaka?.type === "required" && (
                                                    <span className="label-text-alt text-warning">
                                                        {errors.oDhaka.message}
                                                    </span>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-control w-full ">
                                    <label class="label">
                                        <span class="label-text font-semibold">Product Color</span>
                                    </label>
                                    <input type="text" placeholder="Product Color" class="input input-bordered input-primary w-full"
                                        {...register("color", {
                                            required: {
                                                value: false,

                                            },
                                            deps: [],
                                        })}
                                    />
                                    <label class="label">
                                        {errors.color?.type === "required" && (
                                            <span className="label-text-alt text-warning">
                                                {errors.color.message}
                                            </span>
                                        )}
                                    </label>
                                </div>
                                <div class="form-control w-full ">
                                    <label class="label">
                                        <span class="label-text font-semibold">Product Size</span>
                                    </label>
                                    <input type="text" placeholder="Product Size" class="input input-bordered input-primary w-full"
                                        {...register("size", {
                                            required: {
                                                value: false,

                                            },
                                            deps: [],
                                        })}
                                    />
                                    <label class="label">
                                        {errors.size?.type === "required" && (
                                            <span className="label-text-alt text-warning">
                                                {errors.size.message}
                                            </span>
                                        )}
                                    </label>
                                </div>



                            </div>
                        </div>







                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Upload</button>
                        </div>
                    </form>



                </div>
            </div>
        </div>
    );
};

export default AddProduct;