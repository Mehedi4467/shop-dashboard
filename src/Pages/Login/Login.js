import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import logoBlack from "../../Images/logo/logo.png";
import {
    useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Spinner from "../../Shared/Spinner/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();

    const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(auth);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        signInWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [navigate, from, user]);

    if (loading) {
        return <Spinner></Spinner>;
    }
    return (
        <div className=" flex justify-center items-center">
            <div className="card w-full md:w-1/2  bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex justify-center">
                        <img src={logoBlack} width="100" alt="shop in shop black logo" />
                    </div>
                    <h2 className="card-title mx-auto mb-2 text-2xl">Login</h2>

                    {error ? (
                        <p className="text-warning text-center mb-4 text-lg">
                            {error?.message}
                        </p>
                    ) : (
                        ""
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Email</span>
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
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Your Password"
                                    className="input input-bordered input-warning w-full "
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Password is required",
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "Must be six characters or longer",
                                        },
                                    })}
                                />
                                <label className="label">
                                    {errors.password?.type === "required" && (
                                        <span className="label-text-alt text-warning">
                                            {errors.password.message}
                                        </span>
                                    )}
                                    {errors.password?.type === "minLength" && (
                                        <span className="label-text-alt text-warning">
                                            {errors.password.message}
                                        </span>
                                    )}
                                </label>
                            </div>
                        </div>
                        <div className="card-actions w-full">
                            <button type="submit" className="btn w-full  bg-secondary ">
                                Login
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input type="checkbox" className="checkbox mr-2" />
                                    <span className="label-text">Remember me</span>
                                </label>
                            </div>
                            <div>
                                <h2>
                                    <Link to="/resetpassword" className="text-orange-400">
                                        Forgot Password
                                    </Link>
                                </h2>
                            </div>
                        </div>
                    </form>
                    <div className="flex flex-col w-full border-opacity-50">
                        <div className="grid  card  rounded-box place-items-center">
                            <div>
                                <h2>
                                    Don’t have an account?{" "}
                                    <Link className="text-orange-400" to="/registration">
                                        Registration Now!
                                    </Link>
                                </h2>
                            </div>
                        </div>

                        <ToastContainer />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
