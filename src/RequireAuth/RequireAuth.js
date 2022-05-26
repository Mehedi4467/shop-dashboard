import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import Spinner from '../Shared/Spinner/Spinner';
import VerifyEmail from '../Shared/VerifyEmail/VerifyEmail';

function RequireAuth({ children }) {

    const [user, loading] = useAuthState(auth);
    let location = useLocation();
    const nevigate = useNavigate();

    useEffect(() => {
        if (user && user?.emailVerified) {
            fetch(`http://localhost:5000/adminUser/admin/verify/${user?.email}`, {
                method: 'PUT',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ emailVerified: user?.emailVerified })
            }).then(res => {
                return res.json();
            })
                .then(data => {

                })
        }
    }, [user, nevigate, user?.emailVerified])




    if (loading) {
        return <Spinner></Spinner>
    }
    if (user && !user?.emailVerified) {
        return <VerifyEmail></VerifyEmail>
    }



    if (!user) {

        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;