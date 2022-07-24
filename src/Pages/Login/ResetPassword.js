import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logoBlack from "../../Images/logo/logo.png";
import { toast } from "react-toastify";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Spinner from "../../Shared/Spinner/Spinner";

const ResetPassword = () => {
    const [sendPasswordResetEmail, sending, error] =
        useSendPasswordResetEmail(auth);
    const navigation = useNavigate();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const onSubmit = async (data) => {
        const email = data.email;
        await sendPasswordResetEmail(email);
        toast("Send Email for reset password.");
        navigation("/login");
    };
    if (sending) {
        return <Spinner></Spinner>;
    }
    return (
        <div className=" flex justify-center items-center my-10">
            <div className="card w-full md:w-1/3  bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex justify-center">
                        <img src={logoBlack} width="100" alt="shop in shop black logo" />
                    </div>
                    <h2 className="card-title mx-auto mb-2 text-2xl">Reset Password</h2>

                    {error && (
                        <p className="text-warning text-center mb-4 text-lg">
                            {error?.message}
                        </p>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Your Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="input input-bordered input-warning w-full"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email is required",
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: "Please enter valid email",
                                        },
                                    })}
                                />
                                <label className="label">
                                    {errors.email?.type === "required" && (
                                        <span className="label-text-alt text-warning">
                                            {errors.email.message}
                                        </span>
                                    )}
                                    {errors.email?.type === "pattern" && (
                                        <span className="label-text-alt text-warning">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </label>
                            </div>
                        </div>
                        <div className="card-actions w-full">
                            <button type="submit" className="btn w-full  bg-secondary ">
                                Reset
                            </button>
                        </div>

                        <div className="flex items-center justify-between"></div>
                    </form>
                    <div className="flex flex-col w-full border-opacity-50">
                        <div className="grid  card  rounded-box place-items-center">
                            <div>
                                <h2>
                                    Remember the password?
                                    <Link className="text-orange-400" to="/login">
                                        Login!
                                    </Link>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
