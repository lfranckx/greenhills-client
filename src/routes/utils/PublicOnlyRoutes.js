import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import TokenService from '../../services/TokenService';

export default function PublicOnlyRoutes() {
    return (
        TokenService.hasAuthToken()
            ? <Navigate to={'/'} />
            : <Outlet />
    )
}