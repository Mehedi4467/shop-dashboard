import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Spinner from '../../Shared/Spinner/Spinner';
import useAdminUserData from '../../Hooks/AdminUserData/useAdminUserData';
import useAdmin from '../../Hooks/useAdmin';
import { toast } from 'react-toastify';

const Account = () => {
    const [payable, setOrder] = useState([]);
    const [user, loading] = useAuthState(auth);
    const [withdraw, setWithdraw] = useState('');
    const [data, adminLoadingData] = useAdminUserData(user?.email);
    const [acountLoading, setAcountLoading] = useState(false);
    const [getInfo, setGetInfo] = useState([]);
    const [admin, adminLoading] = useAdmin(user);
    const pendingBalence = getInfo?.reduce((previousValue, currentValue) => previousValue + (currentValue.status === "Pending" && currentValue.RequestAmount), 0);
    const paidBalence = getInfo?.reduce((previousValue, currentValue) => previousValue + (currentValue.status === "Paid" && currentValue.RequestAmount), 0);

    useEffect(() => {
        fetch(`http://localhost:5000/account/order/${user?.email}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(resut => {
                setOrder(resut.finalPrice);
                // console.log(resut)
            })
    }, [user, acountLoading]);
    useEffect(() => {
        fetch(`http://localhost:5000/acount/withdraw/${user?.email}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(result => {
                setGetInfo(result);
                // console.log(result)
            })
    }, [user, payable, acountLoading]);



    if (loading || adminLoadingData || adminLoading) {
        return <Spinner></Spinner>
    };

    const withdrawHandel = (event) => {
        setAcountLoading(true)
        event.preventDefault();
        const RequestAmount = parseInt(event.target.amount.value);
        const shopEmail = data?.email;
        const shopName = data?.name;
        const shopPhone = data?.phone;
        const status = 'Pending';

        const withdrawInfo = { RequestAmount, shopEmail, shopName, shopPhone, status }

        fetch(`http://localhost:5000/acount/withdraw`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(withdrawInfo)
        })
            .then(res => res.json())
            .then(result => {
                if (result.acknowledged) {
                    setAcountLoading(false);
                    toast('Your withdrawal request has been accepted');
                }

            });

        setWithdraw('')
        event.target.reset();

    }

    const orderStatusUpdate = (id, value) => {
        setAcountLoading(true);
        const status = { value }
        fetch(`http://localhost:5000/acount/withdraw/status/${id}`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(status)
        })
            .then(res => res.json())
            .then(result => {
                if (result.acknowledged) {
                    toast('Your merchant withdrawal request has been accepted')
                    setAcountLoading(false)
                }

            })
    }
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                <div className='text-center bg-[#0694A2] p-4 rounded-lg'>
                    <i className="text-4xl text-white fa-solid fa-hand-holding-dollar"></i>
                    <h1 className='my-2 text-white text-lg font-bold'>Payable Amount</h1>
                    <p className='text-3xl text-white font-extrabold'>&#x09F3; {payable || 0}</p>
                </div>

                <div className='text-center bg-[#3F83F8] p-4 rounded-lg'>
                    <i className=" text-4xl text-white fa-solid fa-cart-arrow-down"></i>
                    <h1 className='my-2 text-white text-lg font-bold'>Pending Amount</h1>
                    <p className='text-3xl text-white font-extrabold'>&#x09F3; {pendingBalence || 0}</p>
                </div>

                <div className='text-center bg-[#0E9F6E] p-4 rounded-lg'>

                    <i className="text-4xl text-white fa-solid fa-credit-card"></i>
                    <h1 className='my-2 text-white text-lg font-bold'>Total Paid Amount</h1>
                    <p className='text-3xl text-white font-extrabold'>&#x09F3; {paidBalence || 0}</p>
                </div>

            </div>
            <div className='mt-10'>
                <h2 className="text-2xl text-center text-orange-500 capitalize">withdraw request</h2>
            </div>
            {
                !admin && <div className=''>
                    <form className='flex gap-x-4 mt-4' onSubmit={withdrawHandel} >
                        <input onChange={(e) => setWithdraw(e.target.value)} type="number" placeholder="Withdraw Amount" name='amount' className="input input-bordered input-warning w-full " />
                        {
                            !acountLoading && withdraw && payable - 200 > parseInt(withdraw) ? <button className='btn btn-primary'>Withdraw</button> : <button className='btn btn-primary' disabled>Withdraw</button>
                        }

                    </form>

                </div>
            }



            <div className='mt-6'>
                <div class="overflow-x-auto">
                    <table class="table w-full">

                        <thead>
                            <tr>
                                <th></th>
                                <th>Date Time</th>
                                <th>Shop Name</th>
                                <th>Shop Email</th>
                                <th>Shop Phone</th>
                                <th>Withdraw Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>


                        <tbody>
                            {
                                getInfo?.slice(0, 15).map((info, index) => <tr key={info._id}>
                                    <th>{index + 1}</th>
                                    <td>{info?.date} : {info?.time}</td>
                                    <td>{info.shopName}</td>
                                    <td>{info.shopEmail}</td>
                                    <td>{info.shopPhone}</td>
                                    <td className='text-center text-orange-500 font-semibold'>{info.RequestAmount} &#2547;</td>
                                    {
                                        admin ? <td className="px-6 py-4">
                                            <select onChange={(e) => orderStatusUpdate(info._id, e.target.value)} className='outline-0 cursor-pointer border-2 hover:shadow-lg text-slate-400 p-1 rounded-full px-4' id="cars">
                                                <option className='text-orange-600' defaultValue={info.status} selected disabled>{info.status}</option>
                                                <option>Pending</option>
                                                <option>Paid</option>
                                                <option>Cancel</option>
                                            </select>

                                        </td > : <td className={`${info.status === 'Paid' && 'text-green-500'}`}>{info.status}</td>
                                    }


                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Account;