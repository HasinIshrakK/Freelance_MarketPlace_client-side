import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loader from '../Components/Loader';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);

    const location = useLocation();

    if (loading) {
        return <Loader></Loader>
    }

    if (user) {
        return children;
    }

    return <Navigate to='/auth/login' state={location?.pathname} replace />
};

export default PrivateRoute;