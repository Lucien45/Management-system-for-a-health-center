import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../context/AuthContext';
import Page404 from '../pages/other/Page404';
import AdminLayout from '../components/layout/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';

interface AdminRouteProps {
    setLoading: (value: boolean) => void;
}


const AppRoute = ({ setLoading }: AdminRouteProps) => {
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const handleComplete = () => setLoading(false);
        const timeout = setTimeout(handleComplete, 500);
    
        return () => clearTimeout(timeout);
    }, [location, setLoading]);

    if (!isAuthenticated()) {
        return <Navigate to="/" replace />;
    }
    
    return (
        <Routes>
            {/* APP ROUTE */}
            <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                {/* <Route path='/article' element={<Articles/>}/>
                <Route path='/report' element={<Report/>}/>
                <Route path='/institution' element={<Institution/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/settings' element={<Settings/>}/> */}
            </Route>
            {/* ERREUR */}
            <Route path='*' element={<Page404/>} />
        </Routes>
    )
}

export default AppRoute