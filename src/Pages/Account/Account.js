import React from 'react';

const Account = () => {
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                <div className='text-center bg-[#0694A2] p-4 rounded-lg'>
                    <i className="text-4xl text-white fa-solid fa-hand-holding-dollar"></i>
                    <h1 className='my-2 text-white text-lg font-bold'>Payable Amount</h1>
                    <p className='text-3xl text-white font-extrabold'>&#x09F3; 3000</p>
                </div>

                <div className='text-center bg-[#3F83F8] p-4 rounded-lg'>
                    <i className=" text-4xl text-white fa-solid fa-cart-arrow-down"></i>
                    <h1 className='my-2 text-white text-lg font-bold'>Due Amount</h1>
                    <p className='text-3xl text-white font-extrabold'>&#x09F3; 50000</p>
                </div>

                <div className='text-center bg-[#0E9F6E] p-4 rounded-lg'>

                    <i className="text-4xl text-white fa-solid fa-credit-card"></i>
                    <h1 className='my-2 text-white text-lg font-bold'>Total Paid Amount</h1>
                    <p className='text-3xl text-white font-extrabold'>&#x09F3; 700000</p>
                </div>

            </div>
            <div className='mt-10'>
                <h2 className="text-2xl text-center text-orange-500 capitalize">withdraw request</h2>
            </div>
        </div>
    );
};

export default Account;