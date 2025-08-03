// src/pages/ProfilePage.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    const user_data = {
        nombre: user?.nombre || 'Nombre de Usuario',
        documento: '123456789',
        email: 'ejemplo@correo.com',
        telefono: '123-456-7890',
        direccion: 'Calle Falsa 123',
        fechaContratacion: '2022-01-01',
        rol: 'Vigilante',
        fotoUrl: user?.fotoUrl,
    };

    return (
        <div id="mi-perfil-page" className="page-content active">
            <main>
                <section>
                    <h1>Mi Perfil</h1>
                    <div className="perfil-container">
                        <div className="perfil-foto">
                            <img src={user_data.fotoUrl ? `http://localhost/securigestion/${user_data.fotoUrl}` : 'images/user2-160x160.jpg'} alt="Foto de Usuario" />
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
            </main>
        </div>
    );
};

export default ProfilePage;