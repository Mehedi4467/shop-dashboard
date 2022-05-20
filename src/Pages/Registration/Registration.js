import React, { useEffect, useState } from "react";
import {

  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import userToken from "../../Hooks/useToken";
import logoBlack from "../../Images/logo/logo.png";
import Spinner from "../../Shared/Spinner/Spinner";


const Registration = () => {

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);
  const [sendEmailVerification, sending, Verifyerror] = useSendEmailVerification(auth);
  const [Check, setCheck] = useState(true);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [token] = userToken(user);
  console.log(user);

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const displayName = data.name;
    const email = data.email;
    const password = data.password;
    const phoneNumber = data.phone;
    await createUserWithEmailAndPassword(email, password, phoneNumber);
    await updateProfile({ displayName });
    await sendEmailVerification();
    toast("You have been sent an email for verification! ")

  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  if (loading || updating || sending) {
    return <Spinner></Spinner>;
  }

  return (
    <div className=" flex justify-center items-center">
      <div className="card w-full md:w-1/2  bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-center">
            <img src={logoBlack} width="100" alt="shop in shop black logo" />
          </div>
          <h2 className="card-title mx-auto mb-2 text-2xl">Registration</h2>
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
                  <span className="label-text">Business Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Business Name"
                  className="input input-bordered input-warning w-full "
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Business is required",
                    },
                  })}
                />
                <label className="label">
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-warning">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>
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
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="phoneNumber"
                  placeholder="Phone Number"
                  className="input input-bordered input-warning w-full"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Phone Number is required",
                    },

                  })}
                />
                <label className="label">
                  {errors.phone?.type === "required" && (
                    <span className="label-text-alt text-warning">
                      {errors.phone.message}
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

              <div className="form-control mb-2">
                <label className="label cursor-pointer">
                  <input
                    onClick={() => setCheck(!Check)}
                    type="checkbox"
                    className="checkbox"
                  />
                  <span className="label-text">
                    I agree to the Terms of Use and Privacy Policy
                  </span>
                </label>
              </div>
            </div>
            <div className="card-actions w-full">
              <button
                disabled={Check}
                type="submit"
                className="btn w-full  bg-secondary "
              >
                Registration
              </button>
            </div>
          </form>
          <div className="flex flex-col w-full border-opacity-50">
            <div className="grid  card  rounded-box place-items-center">
              <div>
                <h2>
                  Already have an account?{" "}
                  <Link className="text-orange-400" to="/login">
                    Login Now!
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

export default Registration;
