// src/pages/ProfilePage.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import UpdateProfilePhoto from '../components/UpdateProfilePhoto'; // Importa el nuevo componente

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    // Asumimos que los datos del usuario se cargan en el contexto al iniciar sesión.
    // En un escenario real, harías una llamada a la API aquí para obtener los datos completos.
    const user_data = {
        nombre: user.nombre,
        documento: '123456789',
        email: 'ejemplo@correo.com',
        telefono: '123-456-7890',
        direccion: 'Calle Falsa 123',
        fechaContratacion: '2022-01-01',
        rol: 'Vigilante',
        fotoUrl: user.fotoUrl,
    };
    
    // ... (lógica para formatear la fecha, etc.)

    return (
        <div id="mi-perfil-page" className="page-content active">
            <main>
                <section>
                    <h1>Mi Perfil</h1>
                    
                    {/* ... (Mostrar mensajes de éxito o error) ... */}
                    
                    <div className="perfil-container">
                        <div className="perfil-foto">
                            {/* La foto ahora se maneja en el componente UpdateProfilePhoto */}
                        </div>

                        <div className="perfil-datos">
                            <h2>{user_data.nombre}</h2>
                            <p className="rol-perfil">{user_data.rol}</p>
                            
                            <hr />

                            <p><strong>Documento:</strong> {user_data.documento}</p>
                            <p><strong>Correo Electrónico:</strong> {user_data.email}</p>
                            <p><strong>Teléfono:</strong> {user_data.telefono}</p>
                            <p><strong>Dirección:</strong> {user_data.direccion}</p>
                            <p><strong>Fecha de Contratación:</strong> {user_data.fechaContratacion}</p>

                            <Link to="/editar-perfil" className="btn-actualizar">Actualizar Datos Personales</Link>
                        </div>
                    </div>
                </section>
                
                {/* Aquí es donde se inserta el nuevo componente de subida de fotos */}
                <UpdateProfilePhoto />
                
            </main>
        </div>
    );
};

export default ProfilePage;