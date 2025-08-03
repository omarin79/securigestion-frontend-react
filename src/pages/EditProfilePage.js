// src/components/UpdateProfilePhoto.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const UpdateProfilePhoto = () => {
    const { user, login } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    
    // Suponiendo que el contexto ya contiene la ruta de la foto de perfil
    const fotoPerfilUrl = user?.fotoUrl ? `http://localhost/securigestion/${user.fotoUrl}` : 'images/default_avatar.png';

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setStatus('');
        
        if (!file) {
            setMessage('Por favor, selecciona un archivo.');
            setStatus('error');
            return;
        }

        const formData = new FormData();
        formData.append('foto_perfil', file);

        try {
            const response = await fetch('http://localhost/securigestion/actions/perfil_action.php', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();

            if (result.success) {
                setMessage(result.message);
                setStatus('success');
                // Actualizar el contexto de autenticación con la nueva URL de la foto
                login({ ...user, fotoUrl: result.foto_url });
                setFile(null); // Limpiar el campo del archivo
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
        <section>
            <fieldset>
                <legend>Cambiar Foto de Perfil</legend>
                <img src={fotoPerfilUrl} alt="Foto de Perfil Actual" style={{ maxWidth: '150px', borderRadius: '50%', marginBottom: '10px' }} />
                
                {message && <div className={status === 'success' ? 'success-message' : 'error-message'}>{message}</div>}
                
                <form onSubmit={handleSubmit}>
                    <input type="file" name="foto_perfil" id="foto_perfil" accept="image/*" onChange={handleFileChange} required />
                    <small>Archivos permitidos: JPG, PNG, GIF. Tamaño máximo: 5MB.</small>
                    <button type="submit">Subir Nueva Foto</button>
                </form>
            </fieldset>
        </section>
    );
};

export default UpdateProfilePhoto;