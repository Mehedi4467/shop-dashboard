import React from 'react';
import logo from '../../Images/logo/logo.png';

const Merchant = ({ user, index, setOpenModal, UserUpdatepdateStatus }) => {
    const { name, email, phone, role, status, image } = user;

    return (


        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium  dark:text-white whitespace-nowrap">
                {index + 1}
            </th>
            <td className="px-6 py-4">
                <div className='flex items-center justify-between'>
                    {
                        image ? <img src={image} width='40' alt="Business logo" /> :
                            <img src={logo} width='40' alt="Business logo" />
                    }
                    <p className='w-full ml-2'>{name}</p>
                </div>
            </td>
            <td className="px-6 py-4">
                {email}
            </td>
            <td className="px-6 py-4">
                {phone}
            </td>

            <td className="px-6 py-4">
                <select onChange={(e) => UserUpdatepdateStatus(user._id, e.target.value)} className='outline-0 cursor-pointer border-2 hover:shadow-lg text-slate-400 p-1 rounded-full px-4' id="cars">
                    {status && <option defaultValue={status} selected disabled>{status}</option>}
                    <option defaultValue="Accept">Accept</option>
                    <option defaultValue="Pending">Pending</option>
                    <option defaultValue="Reject">Reject</option>
                    <option defaultValue="Block">Block</option>

                </select>
            </td>

            <td className="px-6 py-4">
                <div className='flex justify-between'>
                    <label onClick={() => setOpenModal(user)} htmlFor="update-user-modal"> <i className="cursor-pointer fa-solid fa-eye"></i></label>

                    <label onClick={() => setOpenModal(user)} htmlFor="delete-modal-user"> <i className="cursor-pointer fa-solid fa-trash-can"></i></label>

                </div>
            </td >
            <td className="px-6 py-4">
                {
                    role ? <p>Admin</p> : <label onClick={() => setOpenModal(user)} htmlFor="makeAdmin-modal-user" className="btn text-xs btn-xs capitalize">Admin?</label>
                }
            </td >

        </tr >


    );
};

export default Merchant;