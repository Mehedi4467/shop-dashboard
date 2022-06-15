import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddSliderModal = ({ sliderModal, setSliderMoodal }) => {
    const [sliderImages, setSliderImages] = useState(null);
    const [imageError, setImageError] = useState('');




    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            if (event.target.files[0].size < 300000) {
                if (event.target.files[0].type === "image/jpeg" || event.target.files[0].type === "image/jpg" || event.target.files[0].type === "image/png") {
                    setSliderImages(URL.createObjectURL(event.target.files[0]));
                    setImageError("");

                }
                else {
                    setImageError("Only Accepted jpeg, png, jpg");
                }

            }
            else {

                setImageError("Image Size Too Large. Please upload image max size 300KB");
            }
        }

    };




    const handelSliderData = event => {
        event.preventDefault();

        const formData = new FormData();
        const image = event.target.img.files[0];
        const descriptrion = event.target.description.value;
        const link = event.target.link.value;
        const title = event.target.title.value;
        const textBox = event.target.check.checked;
        formData.append('slider', image);
        formData.append('title', title);
        formData.append('descriptrion', descriptrion);
        formData.append('link', link);
        formData.append('textBox', textBox);




        fetch('http://localhost:5000/slider', {
            method: "POST",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast('Slider Added Successfully');
                    event.target.reset();
                    setSliderImages(null);
                    setSliderMoodal(null);

                }
            });
    }


    return (
        <div>

            <input type="checkbox" id="slider-add-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center text-orange-500">Slider Add</h3>

                    {
                        imageError && <h2 className='text-center text-orange-500 mt-6'>{imageError}</h2>
                    }

                    <form onSubmit={handelSliderData}>
                        <div>
                            <div className='flex justify-between gap-4'>
                                <div className='my-6'>
                                    <label className="block">
                                        <span className="sr-only">Choose File</span>
                                        <input type="file" onChange={onImageChange} name='img' className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required />
                                    </label>
                                </div>

                                <div className='w-full mt-6'>
                                    {
                                        sliderImages && <img src={sliderImages} width='50' alt="this is slider images" />
                                    }
                                </div>

                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-primary font-semibold capitalize">Slider title </span>
                                </label>
                                <input type="text" name='title' placeholder="Slider Title" className="input input-warning w-full" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-primary font-semibold">Slider Description</span>
                                </label>
                                <textarea className="textarea textarea-warning h-24" name='description' placeholder="Slider Description" required></textarea>
                            </div>


                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-primary font-semibold">Slider Link </span>
                                </label>
                                <input type="text" name='link' placeholder="Slider Link" className="input input-warning w-full" required />
                            </div>

                        </div>



                        <div className="form-control">
                            <label className="label  cursor-pointer">
                                <span className="label-text text-primary font-semibold">Text Hide/Show</span>
                                <input type="checkbox" name='check' className="toggle toggle-primary" />
                            </label>
                        </div>

                        <div className='flex justify-end'>
                            <div className="modal-action mr-4">
                                {
                                    imageError ? <button className="btn text-warning cursor-not-allowed" disabled>Solve Error</button> : <button stype='submit' className="btn bg-orange-500">Upload Slider</button>
                                }

                            </div>
                            <div className="modal-action">
                                <label htmlFor="slider-add-modal" className="btn">Cencle</label>
                            </div>
                        </div>



                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddSliderModal;