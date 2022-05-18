import React from 'react';

const Merchant = ({ user, index, setOpenModal }) => {
    const { name, email, phone, role } = user;
    return (


        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium  dark:text-white whitespace-nowrap">
                {index + 1}
            </th>
            <td className="px-6 py-4">
                <div className='flex items-center justify-between'>
                    <img src="https://www.findurings.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/1/_/1_541.jpg" width='40' alt="" />
                    <p className='w-full'>{name}</p>
                </div>
            </td>
            <td className="px-6 py-4">
                {email}
            </td>
            <td className="px-6 py-4">
                {phone}
            </td>

            <td className="px-6 py-4">
                <select className='outline-0 cursor-pointer border-2 hover:shadow-lg text-slate-400 p-1 rounded-full px-4' id="cars">
                    <option value="">Status</option>
                    <option value="volvo">Reject</option>
                    <option value="saab">Accept</option>
                    <option value="opel">Block</option>

                </select>
            </td>

            <td className="px-6 py-4">
                <div className='flex justify-between'>

                    <i className="cursor-pointer fa-solid fa-eye"></i>
                    <label onClick={() => setOpenModal(user)} for="delete-modal-user"> <i className="cursor-pointer fa-solid fa-trash-can"></i></label>

                </div>
            </td >
            <td className="px-6 py-4">
                {
                    role ? <p>Admin</p> : <label onClick={() => setOpenModal(user)} for="makeAdmin-modal-user" className="btn btn-xs">Admin ?</label>
                }
            </td >

        </tr >


    );
};

export default Merchant;