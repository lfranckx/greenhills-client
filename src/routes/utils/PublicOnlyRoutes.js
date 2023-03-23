import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import TokenService from '../../services/TokenService';
import { ApplicationContext } from '../../context';

export default function PublicOnlyRoutes() {
    const { location_id } = useContext(ApplicationContext);
    console.log('inside PublicOnlyRoutes...', location_id);

    return (
        TokenService.hasAuthToken()
            ? <Navigate to={`/location/${location_id}`} />
            : <Outlet />
    )
}