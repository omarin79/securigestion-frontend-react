// src/pages/OlvidoContrasenaPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OlvidoContrasenaPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setStatus('');

        try {
            const response = await fetch('http://localhost/securigestion/actions/recuperar_action.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email_recuperar: email }),
            });

            const result = await response.json();
            
            // Siempre mostrar el mensaje de éxito genérico por seguridad
            setMessage(result.message);
            setStatus('success');
            
        } catch (err) {
            setMessage('Error de conexión con el servidor.');
            setStatus('error');
        }
    };

    return (
        <div id="olvido-contrasena-page" className="page-content active">
            <div className="login-container">
                <img src="images/logo_jh.png" alt="Logo SecuriGestiónIntegral" className="logo" />
                <h1>Recuperar Contraseña</h1>
                <p>Ingresa tu correo electrónico y te enviaremos instrucciones.</p>
                
                {message && (
                    <div className={status === 'success' ? 'success-message' : 'error-message'}>
                        {message}
                    </div>
                )}

                <form id="recuperar-form" onSubmit={handleSubmit}>
                    <label htmlFor="email-recuperar">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email-recuperar"
                        name="email_recuperar"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Enviar Instrucciones</button>
                    <div className="login-links">
                        <Link to="/login">Volver al Inicio de Sesión</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OlvidoContrasenaPage;