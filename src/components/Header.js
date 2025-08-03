// src/components/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="main-header" id="app-header">
            <div className="logo-container">
                <Link to={user ? "/inicio" : "/login"}>
                    {/* Ruta corregida para el logo */}
                    <img src="/images/logo_segurigestion.png" alt="Logo" id="header-logo" />
                </Link>
            </div>
            {user && (
                <div className="header-right">
                    <nav className="main-nav">
                        <ul>
                            <li><Link to="/inicio">Inicio</Link></li>
                            <li><Link to="/plataforma_operativa">Plataforma Operativa</Link></li>
                            <li><Link to="/talento-humano">Talento Humano</Link></li>
                            <li><Link to="/nomina">Nómina</Link></li>
                            <li><Link to="/visitas">Registrar Visita</Link></li>
                            <li><Link to="/informes">Informes</Link></li>
                            <li><Link to="/mi-perfil">Mi Perfil</Link></li>
                            <li><a href="#" onClick={handleLogout}>Cerrar Sesión</a></li>
                        </ul>
                    </nav>
                    <div className="user-info">
                        {/* Ruta corregida para la foto de usuario */}
                        <img src={user.fotoUrl ? `http://localhost/securigestion/${user.fotoUrl}` : '/images/user2-160x160.jpg'} alt="Foto de Usuario" />
                        <span id="logged-in-username">{user.nombre}</span>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;