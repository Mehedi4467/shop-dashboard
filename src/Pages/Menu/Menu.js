import React from 'react';
import CustomLink from './CustomLink/CustomLink';
import './Menu.css';

const Menu = () => {
    return (
        <div className='mega-menu'>
            <div className='py-4 px-2 shadow-lg rounded-lg'>
                <CustomLink className="py-3 rounded-lg text-lg w-100 block hover:bg-slate-100" to='/'> <i className="ml-4 fa-solid fa-house"></i> Home</CustomLink>
                <CustomLink className="py-3 rounded-lg text-lg w-100 block hover:bg-slate-100" to='/products'> <i className="ml-4 fa-solid fa-bag-shopping"></i> Products</CustomLink>
                <CustomLink className="py-3 rounded-lg text-lg w-100 block hover:bg-slate-100" to='/category'> <i className="ml-4 fa-solid fa-align-left"></i> Category</CustomLink>
                <CustomLink className="py-3 rounded-lg text-lg w-100 block hover:bg-slate-100" to='/customers'> <i className="ml-4 fa-solid fa-user-group"></i> Customers</CustomLink>
                <CustomLink className="py-3 rounded-lg text-lg w-100 block hover:bg-slate-100" to='/orders'> <i className="ml-4 fa-solid fa-compass"></i> Orders</CustomLink>
                <CustomLink className="py-3 rounded-lg text-lg w-100 block hover:bg-slate-100" to='/coupons'> <i className="ml-4 fa-solid fa-gift"></i> Coupons</CustomLink>
                <CustomLink className="py-3 rounded-lg text-lg w-100 block hover:bg-slate-100" to='/staff'> <i className="ml-4 fa-solid fa-user"></i> Our Staff</CustomLink>
                <CustomLink className="py-3 rounded-lg text-lg w-100 block hover:bg-slate-100" to='/setting'> <i className="ml-4 fa-solid fa-gear"></i>  Setting</CustomLink>

                <div className=',l-4 pb-16 mt-10'>
                    <button className=' bg-green-500 py-2 px-6 rounded-full hover:bg-green-600 text-white '><i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out</button>

                </div>
            </div>
        </div>
    );
};

export default Menu;