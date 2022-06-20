

import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Spinner from '../Spinner/Spinner';
import Refresh from './Refresh';
// import getFirebase from "./firebase";
const VerifyEmail = () => {
    const [sendEmailVerification, sending] = useSendEmailVerification(auth);
    const [user, loading] = useAuthState(auth);



    if (sending || loading) {
        return <Spinner></Spinner>
    }
    return (
        <div className='w-3/4  my-32 mx-auto text-center'>
            <div>
                <h2 className='text-orange-700 text-2xl text-center my-4'>Verify Your Email Address</h2>
                <p className='text-primary text-lg mb-2'>To continue using Shop in Shop DB, Please verify your email address</p>
                <p className='text-orange-500 mb-2'>{user?.email}</p>
                <p className='text-primary mb-4'>If you have not received the verification email, check the spam or send the email for verification again.</p>
                <button
                    onClick={async () => {
                        await sendEmailVerification();
                        toast("Send Email For Verification Again")
                    }}
                    className='btn btn-primary'>Send verification Email Again</button>

                <Refresh></Refresh>
            </div>
        </div>
    );
};

export default VerifyEmail;