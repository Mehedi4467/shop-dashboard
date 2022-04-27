import React, { useEffect, useState } from 'react';
import logo from '../../Images/logo/logo.png';
import userImg from '../../Images/user/mehedi.jpg';
import CustomLink from '../../Pages/Menu/CustomLink/CustomLink';
import './Header.css';
import Notification from './Notification/Notification';
const Header = ({ showHide, setShowHide }) => {
    const [showUser, setShowUser] = useState(false);
    const [notificationShow, setNotificationShow] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const handelUser = () => {
        setShowUser(!showUser);
        setNotificationShow(false);
    }
    const handelNotification = () => {
        setNotificationShow(!notificationShow);
        setShowUser(false);
    };


    useEffect(() => {
        fetch('../../notification.json')
            .then(res => res.json())
            .then(data => setNotifications(data));

    }, []);

    const handelCleanNotification = (id) => {
        const reaming = notifications.filter(notification => notification._id !== id);
        setNotifications(reaming);
    }

    return (
        <div className='shadow-lg zIndex-1'>
            <div className='container mx-auto md:px-0 px-10 sm:px-10 py-3'>
                <div className='grid grid-cols-2 justify-between items-center'>
                    <div className='flex items-center'>
                        <i onClick={() => setShowHide(!showHide)} className={`mr-4 text-xl cursor-pointer md:hidden ${showHide ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}`}></i>
                        <img className='cursor-pointer' src={logo} width='50' height='50' alt="Dashboard logo" />
                    </div>
                    <div className='flex justify-end items-center image-body'>
                        <div className='mx-10 p-bell'>
                            <i onClick={handelNotification} className="text-green-600 cursor-pointer text-2xl fa-solid fa-bell"></i>
                            <div className='p-count flex items-center justify-center bg-green-500 p-1 rounded-full'><p className='text-xs text-white'>{notifications.length}</p></div>


                            <div className={`shadow-lg rounded notification bg-white scroll-smooth overflow-y-auto py-4 mb-4  px-2 ${notificationShow ? 'w-max' : 'hidden'}`}>

                                {
                                    notifications.length > 0 ? notifications.map(notification => <Notification handelCleanNotification={handelCleanNotification} key={notification._id} notification={notification}></Notification>)
                                        : <div className='shadow rounded-full p-2 mt-20 flex items-center justify-between gap-4 mb-4 hover:bg-slate-100'>
                                            <p className='text-lg text-slate-500'>No Notifications Yet</p>
                                        </div>
                                }

                            </div>

                        </div>
                        <div>
                            <img onClick={handelUser} className='cursor-pointer rounded-full shadow-lg' src={userImg} width='40' height='50' alt="User images" />
                        </div>
                        <div className={`shadow-lg bg-white rounded w-52 py-2 duration-100 ease-in-out profile  ${showUser ? 'dashboard-link' : 'hidden'}`}>

                            <CustomLink to='/' className='flex items-center gap-3 mb-3 px-3 py-2 rounded cursor-pointer hover:bg-slate-100'>
                                <i className="fa-solid fa-house"></i>
                                <p>Dashboard</p>
                            </CustomLink>
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