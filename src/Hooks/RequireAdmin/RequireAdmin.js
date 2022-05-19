import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Spinner from '../../Shared/Spinner/Spinner';
import useAdmin from '../useAdmin';

const RequireAdmin = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);

    if (loading || adminLoading) {
        return <Spinner></Spinner>
    }

    if (!admin) {
        return <Navigate to="/" />;
    }
    return children;


};

export default RequireAdmin;