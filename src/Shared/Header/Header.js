import React, { useState } from 'react';
import logo from '../../Images/logo/logo.png';
import CustomLink from '../../Pages/Menu/CustomLink/CustomLink';
import './Header.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import useAdminUserData from '../../Hooks/AdminUserData/useAdminUserData';
import Spinner from '../Spinner/Spinner';
const Header = ({ showHide, setShowHide }) => {
    const [showUser, setShowUser] = useState(false);

    const [user, loading] = useAuthState(auth);
    const [data, isLoading] = useAdminUserData(user?.email);

    const handelUser = () => {
        setShowUser(!showUser);
    }

    if (isLoading || loading) {
        return <Spinner></Spinner>
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

                        <div>
                            <h2 className='mr-4 text-orange-500'>{data?.name}</h2>
                        </div>

                        <div>
                            {
                                data?.logo ? <img onClick={handelUser} className='cursor-pointer rounded-full shadow-lg' src={`http://localhost:5000/${data?.logo}`} width='40' height='50' alt="User images" /> :
                                    <img onClick={handelUser} className='cursor-pointer rounded-full shadow-lg' src={logo} width='40' height='50' alt="User images" />
                            }
                        </div>
                        <div className={`shadow-lg bg-white rounded w-52 py-2 duration-100 ease-in-out profile  ${showUser ? 'dashboard-link' : 'hidden'}`}>

                            <CustomLink to='/' className='flex items-center gap-3 mb-3 px-3 py-2 rounded cursor-pointer hover:bg-slate-100'>
                                <i className="fa-solid fa-house"></i>
                                <p>Dashboard</p>
                            </CustomLink>
                            {
                                user && <div className='flex items-center gap-3 mb-3 px-3 py-2 rounded cursor-pointer hover:bg-slate-100'>
                                    <i className="fa-solid fa-gear"></i>
                                    <Link to='/profile'> <p>Edit Profile</p> </Link>

                                </div>
                            }
                            {user && <div onClick={() => {
                                signOut(auth);
                                localStorage.removeItem('accessToken');
                            }} className='flex items-center gap-3 mb-3 px-3 py-2 rounded cursor-pointer hover:bg-slate-100'>
                                <i className="text-zic-400 fa-solid fa-arrow-right-from-bracket"></i>
                                <p>Log Out</p>
                            </div>}

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Header;