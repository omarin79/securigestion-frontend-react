// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // El estado 'user' almacenará la información del usuario autenticado
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
        // Opcional: guardar el usuario en el almacenamiento local para persistencia
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        // Opcional: remover el usuario del almacenamiento local
        localStorage.removeItem('user');
    };

    const value = { user, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};