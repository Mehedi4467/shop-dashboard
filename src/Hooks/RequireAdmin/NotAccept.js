import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Spinner from '../../Shared/Spinner/Spinner';
import useAdminUserData from '../AdminUserData/useAdminUserData';
import VerifyNID from './VerifyNID';
import { useNavigate } from "react-router-dom";

const NotAccept = () => {
    const [user, loading] = useAuthState(auth);
    const [data, adminLoadingData, nidModal, setNidModal] = useAdminUserData(user?.email);
    // const [nidModal, setNidModal] = useState(null);
    const navigate = useNavigate();;

    if (loading || adminLoadingData) {
        return <Spinner></Spinner>
    }
    return (
        <div className='flex justify-center my-16'>
            <div className="card w-96 bg-primary text-primary-content">
                <div className="card-body">
                    {
                        data?.status === 'Resubmit' ? <h2 className="card-title">Please resubmit your documents</h2> : <h2 className="card-title">Your Account is <span className='text-yellow-400'>{data.status}</span></h2>
                    }

                    {
                        data?.status === 'Pending' && !data?.logo && data?.status !== 'Resubmit' ? <p>Upload your BIN and NID image to us for your account verification. Thanks</p> : data?.logo && data?.status !== 'Resubmit' ? <p>We have collected your documents and hope your account will be verified within a few days. Thank you</p> : data?.status === 'Resubmit' ? <p>We have seen your documents which do not seem correct to us. You submit your documents again</p> : <p>If you think everything is OK.Please Contact us.</p>
                    }

                    {
                        data?.status === 'Pending' && !data?.logo ? <div className='mt-4'> <label onClick={() => setNidModal(true)} htmlFor="verify-modal" className="btn btn-orange-500">Upload Image</label></div> : ''
                    }
                    {
                        data?.status === 'Resubmit' && data?.logo && <div className=''> <label onClick={() => setNidModal(true)} htmlFor="verify-modal" className="btn btn-orange-500">Upload Image</label></div>
                    }

                    <div className="card-actions justify-end">
                        {
                            data?.status === 'Pending' || <button onClick={() => navigate(`/contact`)} className="btn">Contact us</button>
                        }

                    </div>
                </div>
            </div>
            {
                nidModal && <VerifyNID setNidModal={setNidModal}></VerifyNID>
            }
        </div >
    );
};

export default NotAccept;