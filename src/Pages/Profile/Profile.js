import logo from '../../Images/logo/logo.png';
import { useForm } from "react-hook-form";
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Spinner from '../../Shared/Spinner/Spinner';
import { toast } from 'react-toastify';
import useAdminUserData from '../../Hooks/AdminUserData/useAdminUserData';
import { useState } from 'react';


const Profile = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [isAdminLoad, setIsAdminLoad] = useState(false);
    const [user] = useAuthState(auth);
    const imgStore_key = '2f6c6879a39132782b251889cb5d783f';


    const [data, isLoading, refetch, error] = useAdminUserData(user?.email)

    console.log(data)

    if (isLoading || isAdminLoad) {
        return <Spinner></Spinner>
    }



    const onSubmit = async (inputData) => {
        const image = inputData.image[0];
        const phone = inputData.phone;
        const formData = new FormData();
        formData.append('image', image);
        setIsAdminLoad(true);
        const url = `https://api.imgbb.com/1/upload?key=${imgStore_key}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url
                    const profile = {
                        phone: phone,
                        img: img
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
                                refetch();
                                setIsAdminLoad(false);
                            }
                            else {
                                toast("Something is wrong. Please Reload your Browser!")
                            }
                        })
                }
                else {


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
                                refetch();
                                setIsAdminLoad(false);
                            }
                            else {
                                toast("Something is wrong. Please Reload your Browser!")
                            }
                        })
                    toast("Business Logo do not Upload")
                }
            })
    };




    return (
        <div>
            <div className="card mx-auto w-1/2 bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className='flex justify-center'>
                        {
                            data?.image ? <img src={data?.image} width='70' alt="Business Logo" /> : <img src={logo} width='70' alt="Business Logo" />
                        }
                    </div>


                    <form onSubmit={handleSubmit(onSubmit)} >

                        <div className='mb-4'>
                            <label className="label">
                                <span className="label-text text-primary">Business Logo</span>
                            </label>
                            <div>
                                <label className="flex items-center ">
                                    <span className="sr-only">Choose File</span>
                                    <input type="file"
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        {...register("image")}

                                    />
                                </label>
                            </div>
                        </div>



                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-primary">Business Name</span>
                            </label>
                            <input defaultValue={data?.name} type="text" className="input  input-primary input-bordered w-full max-w-xs" disabled />

                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-primary">Business Email</span>
                            </label>
                            <input defaultValue={data?.email} type="text" className="input  input-primary input-bordered w-full max-w-xs" disabled />

                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-primary">Business Phone</span>
                            </label>
                            <input defaultValue={data?.phone} type="text" className="input  input-primary input-bordered w-full max-w-xs"
                                {...register("phone")}
                            />



                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-primary">Business Email Verified</span>
                            </label>
                            <input defaultValue={data?.emailVerified} type="text" className="input  input-primary input-bordered w-full max-w-xs" disabled />

                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-primary">Business Profile Status</span>
                            </label>
                            <input defaultValue={data?.status} type="text" className="input  input-primary input-bordered w-full max-w-xs" disabled />

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