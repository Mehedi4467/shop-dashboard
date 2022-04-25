import React from 'react';
import CustomLink from './CustomLink/CustomLink';

const Menu = () => {
    return (
        <div>
            <div>
                <CustomLink to='/'> <i className="fa-solid fa-house"></i> Home</CustomLink>
                <CustomLink to='/products'> <i className="fa-solid fa-bag-shopping"></i> Products</CustomLink>
                <CustomLink to='/category'> <i className="fa-solid fa-align-left"></i> Category</CustomLink>
                <CustomLink to='/customers'> <i className="fa-solid fa-user-group"></i> Customers</CustomLink>
                <CustomLink to='/orders'> <i className="fa-solid fa-compass"></i> Orders</CustomLink>
                <CustomLink to='/coupons'> <i className="fa-solid fa-gift"></i> Coupons</CustomLink>
                <CustomLink to='/staff'> <i className="fa-solid fa-user"></i> Our Staff</CustomLink>
                <CustomLink to='/setting'> <i className="fa-solid fa-gear"></i>  Setting</CustomLink>
            </div>
        </div>
    );
};

export default Menu;