import React from 'react';
import logo from '../../Images/logo/logo.png';
const UpdateUser = ({ openModal, setOpenModal, refetch }) => {
    // console.log(openModal)

    return (
        <div>
            <input type="checkbox" id="update-user-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="update-user-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg capitalize text-center font-bold text-primary"> {openModal.name}'s Profile</h3>
                    <div className='py-4'>
                        <form>

                            <div className="avatar flex justify-center">
                                {
                                    openModal?.logo ? <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={`http://localhost:5000/${openModal?.logo}`} alt='business logo' />
                                    </div> : <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={logo} alt='business logo' />
                                    </div>
                                }
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-primary">Business Name</span> </label>
                                <button type="text" className="input input-bordered input-primary text-justify w-full" disabled > {openModal.name}</button>
                                <label className="label">
                                </label>
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-primary">Business Email</span> </label>
                                <button type="text" className="input text-justify input-bordered input-primary  w-full" disabled >{openModal.email} </button>
                                <label className="label">
                                </label>
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-primary">Business Phone Number</span> </label>
                                <button type="text" className="input text-justify input-bordered input-primary  w-full" disabled >{openModal.phone} </button>
                                <label className="label">
                                </label>
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-primary">Profile Status</span> </label>
                                <button type="text" className="input text-justify input-bordered input-primary  w-full" disabled >{openModal.status} </button>
                                <label className="label">
                                </label>
                            </div>


                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-primary">Business Profile Create</span> </label>
                                <button type="text" className="input text-justify input-bordered input-primary  w-full" disabled >{openModal.creationTime}</button>
                                <label className="label">
                                </label>
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-primary">Marchent NID</span>
                                </label>
                                {
                                    openModal?.bin ? <img className='h-[645px] w-[454px]' src={`http://localhost:5000/${openModal?.nid}`} alt="marchent nid" /> : <p>Merchant has not uploaded NID yet</p>
                                }
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-primary">Marchent BIN</span>
                                </label>
                                {
                                    openModal?.bin ? <img className='h-[645px] w-[454px]' src={`http://localhost:5000/${openModal?.bin}`} alt="marchent bin" /> : <p>Merchant has not uploaded BIN yet</p>
                                }
                            </div>
                        </form>
                    </div>

                </div>
            </div >
        </div >
    );
};

export default UpdateUser;