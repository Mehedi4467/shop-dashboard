import React, { useState } from 'react';
import logo from '../../Images/logo/logo.png';
import userImg from '../../Images/user/mehedi.jpg';
import './Header.css';
const Header = () => {
    const [showUser, setShowUser] = useState(false);
    const [notificationShow, setNotificationShow] = useState(false);

    const handelUser = () => {
        setShowUser(!showUser);
        setNotificationShow(false);
    }
    const handelNotification = () => {
        setNotificationShow(!notificationShow);
        setShowUser(false);
    }

    return (
        <div className='shadow-lg'>
            <div className='container mx-auto md:px-0 px-10 sm:px-10 py-3'>
                <div className='grid grid-cols-2 justify-between items-center'>
                    <div>
                        <img className='cursor-pointer' src={logo} width='50' height='50' alt="Dashboard logo" />
                    </div>
                    <div className='flex justify-end items-center image-body'>
                        <div className='mx-10 p-bell'>
                            <i onClick={handelNotification} className="text-green-600 cursor-pointer text-2xl fa-solid fa-bell"></i>
                            <div className='p-count flex items-center justify-center bg-green-500 p-1 rounded-full'><p className='text-xs text-white'>9</p></div>


                            <div className={`shadow-lg rounded notification scroll-smooth overflow-y-auto py-4 mb-4  px-2 ${notificationShow ? 'w-max' : 'hidden'}`}>
                                <div className='shadow rounded-full p-2 flex items-center justify-between gap-4 mb-4 hover:bg-slate-100 cursor-pointer'>
                                    <img className='rounded-full' src={userImg} width='40' alt="Notification Images" />
                                    <div>
                                        <p className='text-sm text-slate-500 mx-4'>Lorem ipsum, dolor consectetur......</p>
                                        <div className='flex justify-between mt-2'>
                                            <p className='text-xs ml-4 px-3 text-white rounded-full bg-orange-400'>Stock Out</p>
                                            <p className='text-xs mr-4'>April 23 2022 - 12:40 pm</p>
                                        </div>
                                    </div>
                                    <div className='delete shadow-lg rounded-full flex justify-center items-center'><i className="text-xs fa-solid fa-xmark"></i></div>
                                </div>

                                <div className='shadow rounded-full p-2 flex items-center justify-between gap-4 mb-4 hover:bg-slate-100 cursor-pointer'>
                                    <img className='rounded-full' src={userImg} width='40' alt="Notification Images" />
                                    <div>
                                        <p className='text-sm text-slate-500 mx-4'>Lorem ipsum, dolor consectetur......</p>
                                        <div className='flex justify-between mt-2'>
                                            <p className='text-xs ml-4 px-3 text-white rounded-full bg-orange-400'>Stock Out</p>
                                            <p className='text-xs mr-4'>April 23 2022 - 12:40 pm</p>
                                        </div>
                                    </div>
                                    <div className='delete shadow-lg rounded-full flex justify-center items-center'><i className="text-xs fa-solid fa-xmark"></i></div>
                                </div>

                                <div className='shadow rounded-full p-2 flex items-center justify-between gap-4 mb-4 hover:bg-slate-100 cursor-pointer'>
                                    <img className='rounded-full' src={userImg} width='40' alt="Notification Images" />
                                    <div>
                                        <p className='text-sm text-slate-500 mx-4'>Lorem ipsum, dolor consectetur......</p>
                                        <div className='flex justify-between mt-2'>
                                            <p className='text-xs ml-4 px-3 text-white rounded-full bg-orange-400'>Stock Out</p>
                                            <p className='text-xs mr-4'>April 23 2022 - 12:40 pm</p>
                                        </div>
                                    </div>
                                    <div className='delete shadow-lg rounded-full flex justify-center items-center'><i className="text-xs fa-solid fa-xmark"></i></div>
                                </div>

                                <div className='shadow rounded-full p-2 flex items-center justify-between gap-4 mb-4 hover:bg-slate-100 cursor-pointer'>
                                    <img className='rounded-full' src={userImg} width='40' alt="Notification Images" />
                                    <div>
                                        <p className='text-sm text-slate-500 mx-4'>Lorem ipsum, dolor consectetur......</p>
                                        <div className='flex justify-between mt-2'>
                                            <p className='text-xs ml-4 px-3 text-white rounded-full bg-orange-400'>Stock Out</p>
                                            <p className='text-xs mr-4'>April 23 2022 - 12:40 pm</p>
                                        </div>
                                    </div>
                                    <div className='delete shadow-lg rounded-full flex justify-center items-center'><i className="text-xs fa-solid fa-xmark"></i></div>
                                </div>

                                <div className='shadow rounded-full p-2 flex items-center justify-between gap-4 mb-4 hover:bg-slate-100 cursor-pointer'>
                                    <img className='rounded-full' src={userImg} width='40' alt="Notification Images" />
                                    <div>
                                        <p className='text-sm text-slate-500 mx-4'>Lorem ipsum, dolor consectetur......</p>
                                        <div className='flex justify-between mt-2'>
                                            <p className='text-xs ml-4 px-3 text-white rounded-full bg-orange-400'>Stock Out</p>
                                            <p className='text-xs mr-4'>April 23 2022 - 12:40 pm</p>
                                        </div>
                                    </div>
                                    <div className='delete shadow-lg rounded-full flex justify-center items-center'><i className="text-xs fa-solid fa-xmark"></i></div>
                                </div>

                                <div className='shadow rounded-full p-2 flex items-center justify-between gap-4 mb-4 hover:bg-slate-100 cursor-pointer'>
                                    <img className='rounded-full' src={userImg} width='40' alt="Notification Images" />
                                    <div>
                                        <p className='text-sm text-slate-500 mx-4'>Lorem ipsum, dolor consectetur......</p>
                                        <div className='flex justify-between mt-2'>
                                            <p className='text-xs ml-4 px-3 text-white rounded-full bg-orange-400'>Stock Out</p>
                                            <p className='text-xs mr-4'>April 23 2022 - 12:40 pm</p>
                                        </div>
                                    </div>
                                    <div className='delete shadow-lg rounded-full flex justify-center items-center'><i className="text-xs fa-solid fa-xmark"></i></div>
                                </div>



                            </div>

                        </div>
                        <div>
                            <img onClick={handelUser} className='cursor-pointer rounded-full shadow-lg' src={userImg} width='40' height='50' alt="User images" />
                        </div>
                        <div className={`shadow-lg rounded w-52 py-2 duration-100 ease-in-out profile  ${showUser ? 'dashboard-link' : 'hidden'}`}>

                            <div className='flex items-center gap-3 mb-3 px-3 py-2 rounded cursor-pointer hover:bg-slate-100'>
                                <i className="fa-solid fa-house"></i>
                                <p>Dashboard</p>
                            </div>
                            <div className='flex items-center gap-3 mb-3 px-3 py-2 rounded cursor-pointer hover:bg-slate-100'>
                                <i className="fa-solid fa-gear"></i>
                                <p>Edit Profile</p>
                            </div>
                            <div className='flex items-center gap-3 mb-3 px-3 py-2 rounded cursor-pointer hover:bg-slate-100'>
                                <i className="text-zic-400 fa-solid fa-arrow-right-from-bracket"></i>
                                <p>Log Out</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Header;