import React from 'react';

const Notification = ({ notification, handelCleanNotification }) => {
    const { _id, picture, status, date, name } = notification;


    return (
        <div className='shadow rounded-full p-2 flex items-center justify-between gap-4 mb-4 hover:bg-slate-100'>
            <img className='rounded-full' src={picture} width='40' alt="Notification Images" />
            <div>
                <p className='text-sm text-slate-500 mx-4 cursor-pointer hover:text-orange-400'>{name.length > 25 ? name.slice(0, 25) + '....' : name}</p>
                <div className='flex justify-between mt-2'>
                    <p className='text-xs ml-4 px-3 text-white rounded-full bg-orange-400'>{status}</p>
                    <p className='text-xs mr-4'>{date} - 12:40 pm</p>
                </div>
            </div>
            <div onClick={() => handelCleanNotification(_id)} className='delete shadow-lg rounded-full flex justify-center items-center'><i className="text-xs fa-solid fa-xmark"></i></div>
        </div>
    );
};

export default Notification;