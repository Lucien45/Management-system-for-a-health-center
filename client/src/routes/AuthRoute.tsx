import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import Page404 from '../pages/other/Page404';
import AuthPage from '../pages/auth/AuthPage';
import AuthLayout from '../pages/auth/AuthLayout';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';

interface AuthRouteProps {
    setLoading: (value: boolean) => void;
}

const AuthRoute = ({setLoading}: AuthRouteProps) => {
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const handleComplete = () => setLoading(false);
        const timeout = setTimeout(handleComplete, 900);

        return () => clearTimeout(timeout);
    }, [location, setLoading]);

    return (
        <Routes>
            <Route element={<AuthLayout/>}>
                <Route index element={<AuthPage/>} />
                <Route path='forgot' element={<ForgotPasswordPage/>} />
                <Route path='*' element={<Page404/>} />
            </Route>
        </Routes>
    )
}

export default AuthRoute