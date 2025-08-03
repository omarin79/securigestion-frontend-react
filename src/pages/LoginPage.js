// src/pages/LoginPage.js (Versión FINAL Corregida)

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // CORRECCIÓN: URL limpia sin caracteres extra
            const response = await fetch('http://localhost/Seguri_gestion_integral_React/actions/login_action.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                login(data.user);
                navigate('/inicio');
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error('Error al intentar iniciar sesión:', err);
            setError('Error de conexión. Por favor, intente de nuevo.');
        }
    };

    return (
        <div id="login-page">
            <div className="login-container">
                <img src="/images/logo_jh.png" alt="Logo SecuriGestiónIntegral" className="logo" />
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
                        <Link to="/olvido-contrasena">¿Olvidó su contraseña?</Link>
                        <Link to="/registro">Registrarse</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;