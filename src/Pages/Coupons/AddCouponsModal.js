import React, { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Spinner from '../../Shared/Spinner/Spinner';
import { toast } from 'react-toastify';
const AddCouponsModal = ({ setCouponModal }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [user, loading] = useAuthState(auth);


    const handelCoupons = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const code = event.target.code.value;
        const percentage = event.target.percentage.value;
        const startDates = format(startDate, 'PP')
        const endDates = format(endDate, 'PP');
        const email = user?.email;


        const couponsInfo = {
            name, code, percentage, startDates, endDates, email, status: true
        };

        fetch('http://localhost:5000/coupons', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(couponsInfo)
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {
                    toast("Your Coupons Added Successfully");
                    event.target.reset();
                    setCouponModal(null);
                }
            })

    }


    if (loading) {
        return <Spinner></Spinner>
    }
    return (
        <div>

            <input type="checkbox" id="coupons-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-orange-500 text-center">Add Your Coupons</h3>

                    <div>

                        <form onSubmit={handelCoupons}>
                            <div className="form-control w-full mb-4 ">
                                <label className="label">
                                    <span className="label-text font-semibold">Campaigns Name</span>
                                </label>
                                <input type="text" placeholder="Campaigns Name" name='name' className="input input-warning w-full" required />
                            </div>
                            <div className="form-control w-full mb-4 ">
                                <label className="label">
                                    <span className="label-text font-semibold">Coupon Code</span>
                                </label>
                                <input type="text" placeholder="Coupon Code" name='code' className="input input-warning w-full" required />
                            </div>
                            <div className="form-control w-full mb-4 ">
                                <label className="label">
                                    <span className="label-text font-semibold">Coupon Percentage %</span>
                                </label>
                                <input type="number" placeholder="Coupon Percentage" name='percentage' className="input input-warning w-full" required />
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
                                    <button className="btn bg-orange-500">Add Coupon</button>
                                </div>
                                <div className="modal-action">
                                    <label htmlFor="coupons-modal" className="btn">Cencel</label>
                                </div>
                            </div>
                        </form>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default AddCouponsModal;