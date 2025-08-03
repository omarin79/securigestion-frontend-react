// src/pages/ResetPasswordPage.js
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const ResetPasswordPage = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setStatus('');

        if (!token) {
            setMessage('Token no proporcionado.');
            setStatus('error');
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            setStatus('error');
            return;
        }

        try {
            const response = await fetch('http://localhost/securigestion/actions/reset_password_action.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: token,
                    new_password: newPassword,
                    password_confirm: confirmPassword,
                }),
            });
            const result = await response.json();

            if (result.success) {
                setMessage(result.message);
                setStatus('success');
                setTimeout(() => navigate('/login'), 2000); // Redirigir al login después de 2 segundos
            } else {
                setMessage(result.message);
                setStatus('error');
            }
        } catch (err) {
            setMessage('Error de conexión con el servidor.');
            setStatus('error');
        }
    };

    return (
        <div id="reset-password-page" className="page-content active">
            <div className="login-container">
                <img src="images/logo_jh.png" alt="Logo SecuriGestiónIntegral" className="logo" />
                <h1>Restablecer Contraseña</h1>
                <p>Por favor, ingrese su nueva contraseña.</p>
                
                {message && (
                    <div className={status === 'success' ? 'success-message' : 'error-message'}>
                        {message}
                    </div>
                )}

                <form id="reset-form" onSubmit={handleSubmit}>
                    <label htmlFor="new_password">Nueva Contraseña:</label>
                    <input
                        type="password"
                        id="new_password"
                        name="new_password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="confirm_new_password">Confirmar Nueva Contraseña:</label>
                    <input
                        type="password"
                        id="confirm_new_password"
                        name="confirm_new_password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Guardar Nueva Contraseña</button>
                    <div className="login-links">
                        <Link to="/login">Volver al Inicio de Sesión</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;