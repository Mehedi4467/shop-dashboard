import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import auth from '../../firebase.init';
import useMonthData from '../../Hooks/useAdminData/useMonthData';
import useYearData from '../../Hooks/useAdminData/useYearData';
import Spinner from '../../Shared/Spinner/Spinner';


const Pricing = ({ todayData }) => {
    const orderPrice = todayData?.reduce((previousValue, currentValue) => previousValue + currentValue.totalPrice, 0);
    const [user, loading] = useAuthState(auth);
    const [monthData, monthLoading] = useMonthData(user);
    const [data, isLoading] = useYearData(user)
    const orderMonthPrice = monthData?.reduce((previousValue, currentValue) => previousValue + currentValue.totalPrice, 0);
    const orderYearPrice = data?.reduce((previousValue, currentValue) => previousValue + currentValue.totalPrice, 0);

    if (loading || monthLoading || isLoading) {
        return <Spinner></Spinner>
    }
    // console.log(data)
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
            <div className='text-center bg-[#0694A2] p-4 rounded-lg'>
                <i className="text-4xl text-white fa-solid fa-hand-holding-dollar"></i>
                <h1 className='my-2 text-white text-lg font-bold'>Today Order</h1>
                <p className='text-3xl text-white font-extrabold'>&#x09F3; {orderPrice}</p>
            </div>

            <div className='text-center bg-[#3F83F8] p-4 rounded-lg'>
                <i className=" text-4xl text-white fa-solid fa-cart-arrow-down"></i>
                <h1 className='my-2 text-white text-lg font-bold'>This Month</h1>
                <p className='text-3xl text-white font-extrabold'>&#x09F3; {orderMonthPrice}</p>
            </div>

            <div className='text-center bg-[#0E9F6E] p-4 rounded-lg'>

                <i className="text-4xl text-white fa-solid fa-credit-card"></i>
                <h1 className='my-2 text-white text-lg font-bold'>Total Order</h1>
                <p className='text-3xl text-white font-extrabold'>&#x09F3; {orderYearPrice}</p>
            </div>

        </div>
    );
};

export default Pricing;