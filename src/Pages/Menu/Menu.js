import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useAdminUserData from '../../Hooks/AdminUserData/useAdminUserData';
import useAdmin from '../../Hooks/useAdmin';
import CustomLink from './CustomLink/CustomLink';
import './Menu.css';


const Menu = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const [data] = useAdminUserData(user?.email);
    return (
        <div className='h-95 mega-menu'>
            {
                data && data?.role !== 'admin' && <div className='border-2 m-2 p-4  rounded-full'>
                    <h2 className='text-primary text-xl font-bold text-center '>{data?.name || "Welcome ShopInShop"} </h2>
                </div>
            }
            <div className='py-4 h-screen px-2 shadow-lg rounded-lg'>
                <CustomLink className="py-3 rounded-lg text-lg w-100 block hover:bg-slate-100" to='/'> <i className="ml-4 fa-solid fa-house"></i> Home</CustomLink>
                <CustomLink className="py-3 rounded-lg text-lg w-100 block hover:bg-slate-100" to='/products'> <i className="ml-4 fa-solid fa-bag-shopping"></i> Products</CustomLink>

                {
                    admin && <CustomLink className="py-3 rounded-lg text-lg w-100 block hover:bg-slate-100" to='/category'> <i className="ml-4 fa-solid fa-align-left"></i> Category</CustomLink>
                }
                {
                    admin && <CustomLink className="py-3 rounded-lg text-lg w-100 block hover:bg-slate-100" to='/customers'> <i className="ml-4 fa-solid fa-user-group"></i> Customers</CustomLink>
                }
                <CustomLink className="py-3 rounded-lg text-lg w-100 block hover:bg-slate-100" to='/orders'> <i className="ml-4 fa-solid fa-compass"></i> Orders</CustomLink>
                <CustomLink className="py-3 rounded-lg text-lg w-100 block hover:bg-slate-100" to='/coupons'> <i className="ml-4 fa-solid fa-gift"></i> Coupons</CustomLink>
                {admin && <CustomLink className="py-3 rounded-lg text-lg w-100 block hover:bg-slate-100" to='/staff'> <i className="ml-4 fa-solid fa-user"></i> Merchant</CustomLink>}
                <CustomLink className="py-3 rounded-lg text-lg w-100 block hover:bg-slate-100" to='/account'> <i className="ml-4 fas fa-dollar-sign"></i> Account</CustomLink>
                {
                    admin && <CustomLink className="py-3 rounded-lg text-lg w-100 block hover:bg-slate-100" to='/setting'> <i className="ml-4 fa-solid fa-gear"></i>  Setting</CustomLink>
                }

                <div className=',l-4 pb-16 mt-10'>
                    {user && <button onClick={() => {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                    }} className=' bg-green-500 py-2 px-6 rounded-full hover:bg-green-600 text-white '><i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out</button>}

                </div>
            </div>
        </div>
    );
};

export default Menu;