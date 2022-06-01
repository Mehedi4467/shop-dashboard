import React, { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { toast } from 'react-toastify';



const CouponUpdateModal = ({ couponModal, setCouponModal }) => {
    const { _id, name, code, percentage, startDates, endDates } = couponModal;


    const [startDate, setStartDate] = useState(new Date(startDates));
    const [endDate, setEndDate] = useState(new Date(endDates));




    const handelUpdateCoupon = (event) => {
        event.preventDefault();
        const couponName = event.target.name.value || name;
        const couponCode = event.target.code.value || code;
        const couponPercentage = event.target.percentage.value || percentage;
        const satrtDateUpdate = format(startDate, 'PP') || startDates;
        const endDateUpdate = format(endDate, 'PP') || endDates;


        const update = {
            couponName, couponCode, couponPercentage, satrtDateUpdate, endDateUpdate
        }


        fetch(`http://localhost:5000/coupon/update/${_id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(update)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast('Coupon Update Successfully.');
                    setCouponModal(null);
                }

            })

    }
    return (
        <div>
            <input type="checkbox" id="coupon-update" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-xl text-center text-orange-500">Update Your Coupon</h3>
                    <form onSubmit={handelUpdateCoupon}>
                        <div className="form-control w-full mb-4 ">
                            <label className="label">
                                <span className="label-text font-semibold">Campaigns Name</span>
                            </label>
                            <input type="text" placeholder={name} name='name' className="input input-warning w-full" />
                        </div>
                        <div className="form-control w-full mb-4 ">
                            <label className="label">
                                <span className="label-text font-semibold">Coupon Code</span>
                            </label>
                            <input type="text" placeholder={code} name='code' className="input input-warning w-full" />
                        </div>
                        <div className="form-control w-full mb-4 ">
                            <label className="label">
                                <span className="label-text font-semibold">Coupon Percentage %</span>
                            </label>
                            <input type="number" placeholder={percentage} name='percentage' className="input input-warning w-full" />
                        </div>

                        <div className="form-control w-full mb-4 ">
                            <label className="label">
                                <span className="label-text font-semibold text-xl">Start Date</span>
                            </label>


                            <DayPicker
                                styles={{
                                    caption: { color: 'red', fontSize: '12px' }

                                }}
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                            />
                            <input type="text" value={format(startDate, 'PP')} placeholder="Coupon Percentage" className="input input-warning w-full" disabled />

                        </div>

                        <div className="form-control w-full mb-4 ">
                            <label className="label">
                                <span className="label-text font-semibold text-xl">End Date</span>
                            </label>


                            <DayPicker
                                styles={{
                                    caption: { color: 'red', fontSize: '12px' }

                                }}
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                            />
                            <input type="text" value={format(endDate, 'PP')} placeholder="Coupon Percentage" className="input input-warning w-full" disabled />

                        </div>
                        <div className='flex justify-end'>
                            <div className="modal-action mr-4">
                                <button className="btn bg-orange-500">Update</button>
                            </div>
                            <div className="modal-action">
                                <button onClick={() => setCouponModal(null)} type='rest' className="btn"> Cencel</button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default CouponUpdateModal;