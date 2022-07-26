import React from 'react';
import './Dashboard.css';


const DashboardStatus = ({ monthData, user }) => {
    const totalOrder = monthData?.length;
    const pendingOrder = monthData?.filter(pending => pending?.products[0]?.status === 'Pending' && pending?.products[0]?.marchentEmail === user?.email)
    const processingOrder = monthData?.filter(Processing => Processing?.products[0]?.status === 'Processing' && Processing?.products[0]?.marchentEmail === user?.email)
    const deliveredOrder = monthData?.filter(Delivered => Delivered?.products[0]?.status === 'Delivered' && Delivered?.products[0]?.marchentEmail === user?.email)

    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div className='flex items-center justify-start bg-white p-4 border-[1px] rounded-lg border-orange-300'>
                <div className='bg-[#FCD9BD] flex items-center justify-center iconRound rounded-full'>
                    <i className="text-orange-500 fa-solid fa-cart-flatbed-suitcase"></i>
                </div>
                <div className='ml-3'>
                    <h2 className='text-[#4C4F52] font-semibold '>Total Order</h2>
                    <p className='text-[#4C4F52] font-bold text-lg '>{totalOrder}</p>
                </div>
            </div>

            <div className='flex items-center justify-start bg-white p-4 border-[1px] rounded-lg border-red-200'>
                <div className='bg-red-100 flex items-center justify-center iconRound rounded-full'>
                    <i className="text-orange-500 fa-solid fa-repeat"></i>
                </div>
                <div className='ml-3'>
                    <h2 className='text-[#4C4F52] font-semibold '>Order Pending</h2>
                    <p className='text-[#4C4F52] font-bold text-lg '>{pendingOrder.length}</p>
                </div>
            </div>

            <div className='flex items-center justify-start bg-white p-4 border-[1px] rounded-lg border-[#C3DDFD]'>
                <div className='bg-[#C3DDFD] flex items-center justify-center iconRound rounded-full'>
                    <i className="text-orange-500 fa-solid fa-truck"></i>
                </div>
                <div className='ml-3'>
                    <h2 className='text-[#4C4F52] font-semibold '>Order Processing</h2>
                    <p className='text-[#4C4F52] font-bold text-lg '>{processingOrder.length}</p>
                </div>
            </div>

            <div className='flex items-center justify-start bg-white p-4 border-[1px] rounded-lg border-green-300'>
                <div className='bg-green-300 flex items-center justify-center iconRound rounded-full'>
                    <i className="text-orange-500 fa-solid fa-check"></i>
                </div>
                <div className='ml-3'>
                    <h2 className='text-[#4C4F52] font-semibold '>Order Delivered</h2>
                    <p className='text-[#4C4F52] font-bold text-lg '>{deliveredOrder.length}</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardStatus;