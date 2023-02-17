import React, { useState, createContext } from 'react';

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {

    const value = {

    };
    
    return (
        <ApplicationContext.Provider value={value}>
            {children}
        </ApplicationContext.Provider>
    );
}