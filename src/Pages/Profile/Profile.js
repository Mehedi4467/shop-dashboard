import logo from '../../Images/logo/logo.png';
import { useForm } from "react-hook-form";
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Spinner from '../../Shared/Spinner/Spinner';
import { toast } from 'react-toastify';
import useAdminUserData from '../../Hooks/AdminUserData/useAdminUserData';

const Profile = () => {
    const { register, handleSubmit } = useForm();

    const [user] = useAuthState(auth);
    // const imgStore_key = '2f6c6879a39132782b251889cb5d783f';
    const [data, adminLoadingData] = useAdminUserData(user?.email)

    if (adminLoadingData) {
        return <Spinner></Spinner>
    }

    const onSubmit = async (inputData) => {
        // const image = inputData.image[0];
        const phone = inputData.phone;
        const profile = {
            phone: phone,
            img: false
        }
        //send to database 
        fetch(`http://localhost:5000/adminUser/Update_profile/${data._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(profile)
        })
            .then(res => res.json())
            .then(updateImage => {

                if (updateImage.acknowledged) {
                    toast("Profile Update Successfully!");

                }
                else {
                    toast("Something is wrong. Please Reload your Browser!")
                }
            })

    };



    return (
        <div>
            <div className="card mx-auto w-1/2 bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className='flex justify-center'>
                        {
                            data?.logo ? <img src={`http://localhost:5000/${data?.logo}`} width='70' alt="Business Logo" /> : <img src={logo} width='70' alt="Business Logo" />
                        }
                    </div>


                    <form onSubmit={handleSubmit(onSubmit)} >

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text text-primary">Business Name</span>
                            </label>
                            <input defaultValue={data?.name} type="text" className="input  input-primary input-bordered w-full " disabled />

                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text text-primary">Business Email</span>
                            </label>
                            <input defaultValue={data?.email} type="text" className="input  input-primary input-bordered w-full " disabled />

                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <p className="label-text text-primary">Business Phone <span className='text-orange-600'> ({data?.phone})</span></p>
                            </label>
                            <input type="text" className="input  input-primary input-bordered w-full"
                                {...register("phone")}
                            />



                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-primary">Business Email Verified</span>
                            </label>
                            <input defaultValue={data?.emailVerified} type="text" className="input  input-primary input-bordered w-full" disabled />

                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-primary">Business Profile Status</span>
                            </label>
                            <input defaultValue={data?.status} type="text" className="input  input-primary input-bordered w-full" disabled />

                        </div>

                        <div className="card-actions justify-end mt-4">
                            <button className="btn btn-primary">Update</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Profile;