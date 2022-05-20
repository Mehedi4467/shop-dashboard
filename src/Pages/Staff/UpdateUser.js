
const UpdateUser = ({ openModal, setOpenModal, refetch }) => {
    console.log(openModal)

    return (
        <div>
            <input type="checkbox" id="update-user-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label for="update-user-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg capitalize text-center font-bold text-primary"> {openModal.name}'s Profile</h3>
                    <div className='py-4'>
                        <form>

                            <div className="avatar flex justify-center">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src="https://api.lorem.space/image/face?hash=3174" alt='business logo' />
                                </div>
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


                        </form>
                    </div>

                </div>
            </div >
        </div >
    );
};

export default UpdateUser;