import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../firebase.init';
import Spinner from '../Shared/Spinner/Spinner';
import VerifyEmail from '../Shared/VerifyEmail/VerifyEmail';

function RequireAuth({ children }) {

    const [user, loading] = useAuthState(auth);
    let location = useLocation();


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