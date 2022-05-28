import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Spinner from '../../Shared/Spinner/Spinner';
import useAdminUserData from '../AdminUserData/useAdminUserData';

const NotAccept = () => {
    const [user, loading] = useAuthState(auth);
    const [data, adminLoadingData] = useAdminUserData(user?.email);


    if (loading || adminLoadingData) {
        return <Spinner></Spinner>
    }
    return (
        <div className='flex justify-center my-16'>
            <div className="card w-96 bg-primary text-primary-content">
                <div className="card-body">
                    <h2 className="card-title">Your Account is <span className='text-yellow-400'>{data.status}</span></h2>
                    {
                        data?.status === 'Pending' ? <p>We are reviewing your account. Please give us a little time. Thanks</p> : <p>If you think everything is OK.Please Contact us.</p>
                    }
                    <div className="card-actions justify-end">
                        {
                            data?.status === 'Pending' || <button className="btn">Contact us</button>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotAccept;