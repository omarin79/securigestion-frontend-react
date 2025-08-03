// src/pages/RegistroPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegistroPage = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        documento: '',
        telefono: '',
        direccion: '',
        email: '',
        password: '',
        password_confirm: '',
        id_rol: '',
        fecha_contratacion: '',
    });
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    
    // Simulación de roles para el desplegable (se podrían obtener de una API)
    const roles = [
        { ID_Rol: 1, NombreRol: 'Administrador' },
        { ID_Rol: 4, NombreRol: 'Vigilante' },
        { ID_Rol: 5, NombreRol: 'Guardia' }
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFotoPerfil(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setStatus('');

        if (formData.password !== formData.password_confirm) {
            setMessage('Las contraseñas no coinciden.');
            setStatus('error');
            return;
        }

        const data = new FormData();
        // Agregamos todos los campos del formulario
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        // Agregamos la foto de perfil si existe
        if (fotoPerfil) {
            data.append('foto_perfil', fotoPerfil);
        }

        try {
            const response = await fetch('http://localhost/securigestion/actions/registro_action.php', {
                method: 'POST',
                // No establecemos 'Content-Type' para FormData, el navegador lo hace automáticamente
                body: data,
            });
            const result = await response.json(); // Asumiendo que el backend devolverá JSON

            if (result.success) {
                setMessage(result.message);
                setStatus('success');
                // Redirigimos al usuario al login después de un registro exitoso
                setTimeout(() => navigate('/login'), 2000);
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
        <div id="registro-page" className="page-content active">
            <div className="login-container">
                <main>
                    <section>
                        <h1>Registro de Nuevo Usuario</h1>
                        <p>Complete el formulario para crear un nuevo empleado en el sistema.</p>
                    </section>
                    
                    {message && <div className={status === 'success' ? 'success-message' : 'error-message'} style={{ display: 'block' }}>{message}</div>}

                    <form id="form-registro-usuario" onSubmit={handleSubmit}>
                        {/* Aquí va el resto del formulario, adaptando el HTML de `registro.php` */}
                        {/* ... (campos de nombre, apellido, documento, etc.) */}
                        <div className="form-group">
                            <label htmlFor="reg-nombre">Nombres:</label>
                            <input type="text" id="reg-nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                        </div>
                        {/* Repite para todos los campos del formulario */}
                        
                        <div className="form-group">
                            <label htmlFor="reg-rol">Rol en el Sistema:</label>
                            <select id="reg-rol" name="id_rol" value={formData.id_rol} onChange={handleChange} required>
                                <option value="">-- Seleccione un Rol --</option>
                                {roles.map(rol => (
                                    <option key={rol.ID_Rol} value={rol.ID_Rol}>{rol.NombreRol}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="reg-foto">Foto de Perfil (Opcional):</label>
                            <input type="file" id="reg-foto" name="foto_perfil" accept="image/jpeg, image/png" onChange={handleFileChange} />
                        </div>
                        
                        <button type="submit">Registrar Usuario</button>
                    </form>
                    
                    <div className="login-links">
                        <p>¿Ya tienes una cuenta?</p>
                        <Link to="/login" className="btn-secondary">Ir a Inicio de Sesión</Link>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default RegistroPage;