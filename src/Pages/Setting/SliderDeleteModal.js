import React from 'react';
import { toast } from 'react-toastify';

const SliderDeleteModal = ({ sliderModal, setSliderMoodal }) => {
    const handelSliderDelete = (id) => {
        fetch(`http://localhost:5000/slider/delete/${id}?path=${sliderModal.img}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged && data.deletedCount > 0) {
                    setSliderMoodal(null);
                    toast("Slider Delete Successfully");

                }
            });
    }
    return (
        <div>

            <input type="checkbox" id="slider-delete-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center text-orange-500">Are you sure you want to delete the slider?</h3>

                    <div className='flex justify-end'>
                        <div className="modal-action mr-4">
                            < button onClick={(e) => handelSliderDelete(sliderModal._id)} className="btn bg-orange-500">Delete</button>
                        </div>
                        <div className="modal-action">
                            <label htmlFor="slider-delete-modal" className="btn">Cancel</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SliderDeleteModal;