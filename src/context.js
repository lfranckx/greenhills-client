import React, { useState, createContext } from 'react';

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {

    const [error, setError] = useState(null);
    const [employees, setEmployees] = useState(null);
    const [location_id, setLocationId] = useState(null);

    const value = {
        error: error,
        setError: setError,
        employees: employees,
        setEmployees: setEmployees,
        location_id: location_id,
        setLocationId: setLocationId
    };
    
    return (
        <ApplicationContext.Provider value={value}>
            {children}
        </ApplicationContext.Provider>
    );
}