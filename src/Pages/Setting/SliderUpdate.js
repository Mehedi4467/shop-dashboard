import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SliderUpdate = ({ sliderModal, setSliderMoodal }) => {
    const [checks, setChecks] = useState(sliderModal.textBox);
    // console.log(checks)
    const handelSliderUpdate = (event) => {
        event.preventDefault();
        const title = event.target.title.value || sliderModal.title;
        const description = event.target.description.value || sliderModal.description;
        const link = event.target.link.value || sliderModal.link;
        const textBox = checks || false;

        const updateInfo = {
            title, description, link, textBox
        }

        fetch(`http://localhost:5000/slider/update/${sliderModal._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updateInfo)
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {
                    toast("Slider Update Successfully");
                    setSliderMoodal(null);
                }
            });

    }
    return (
        <div>


            <input type="checkbox" id="slider-update" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center text-orange-500">Update Slider</h3>

                    <div>
                        <form onSubmit={handelSliderUpdate}>
                            <div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-primary font-semibold capitalize">Slider title </span>
                                    </label>
                                    <input type="text" name='title' placeholder={sliderModal.title} className="input input-warning w-full" />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-primary font-semibold">Slider Description</span>
                                    </label>
                                    <textarea className="textarea textarea-warning h-24" name='description' placeholder={sliderModal.description} ></textarea>
                                </div>


                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-primary font-semibold">Slider Link </span>
                                    </label>
                                    <input type="text" name='link' placeholder={sliderModal.link} className="input input-warning w-full" />
                                </div>

                            </div>

                            <div className="form-control">
                                <label className="label  cursor-pointer">
                                    <span className="label-text text-primary font-semibold">Text Hide/Show</span>
                                    <input onChange={(e) => setChecks(e.target.checked)} type="checkbox" name='check' checked={checks} className="toggle toggle-primary" />
                                </label>
                            </div>


                            <div className='flex justify-end'>

                                <div className="modal-action mr-4">
                                    <button type="submit" className="btn bg-orange-500">Update</button>
                                </div>

                                <div className="modal-action">
                                    <button onClick={() => setSliderMoodal(null)} type='reset' className="btn">Cencle</button>
                                </div>
                            </div>


                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SliderUpdate;