// src/pages/LoginPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    // Usamos el hook useState para gestionar el estado de los campos del formulario
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    // Obtenemos las funciones de login del contexto de autenticación
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el recargado de la página por defecto del formulario
        setError('');

        try {
            // Hacemos una llamada a la API de login_action.php
            const response = await fetch('http://localhost/securigestion/actions/login_action.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            // Parseamos la respuesta JSON del servidor
            const data = await response.json();

            if (data.success) {
                // Si el login es exitoso, llamamos a la función de login del contexto
                login(data.user);
                navigate('/inicio'); // Redirigimos al usuario a la página de inicio
            } else {
                setError(data.message); // Mostramos el mensaje de error del backend
            }
        } catch (err) {
            console.error('Error de conexión:', err);
            setError('Error de conexión. Por favor, intente de nuevo.');
        }
    };

    return (
        <div id="login-page">
            <div className="login-container">
                <img src="images/logo_jh.png" alt="Logo SecuriGestiónIntegral" className="logo" />
                <h1>SecuriGestiónIntegral</h1>
                
                {error && <div className="error-message" style={{ display: 'block' }}>{error}</div>}

                <form id="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Nombre de usuario (Cédula):</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Ingresar</button>

                    <div className="login-links">
                        <a href="index.php?page=olvido-contrasena">¿Olvidó su contraseña?</a>
                        <a href="index.php?page=registro">Registrarse</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;