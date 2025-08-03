// src/pages/HomePage.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div id="inicio-page" className="page-content active">
            <main>
                <section>
                    <div style={{ marginBottom: '40px', textAlign: 'left' }}>
                        <h1>Bienvenido, {user?.nombre || 'usuario'}</h1>
                        <p>Esta es tu plataforma de gestión integral. Selecciona una opción para comenzar.</p>
                    </div>

                    <h2 style={{ textAlign: 'left' }}>MENÚ PRINCIPAL</h2>
                    
                    <div className="menu-container">
                        <Link to="/plataforma_operativa" className="menu-card card-blue">
                            <div className="icon-container"><i className="fa-solid fa-shield-halved"></i></div>
                            <div className="text-container"><p className="card-title">Plataforma Operativa</p><p className="card-subtitle">Novedades, Alertas, Informes y Visitas</p></div>
                        </Link>
                        <Link to="/talento-humano" className="menu-card card-green">
                            <div className="icon-container"><i className="fa-solid fa-users"></i></div>
                            <div className="text-container"><p className="card-title">Talento Humano</p><p className="card-subtitle">Gestión de Cartas y Certificados</p></div>
                        </Link>
                        <Link to="/nomina" className="menu-card card-orange">
                            <div className="icon-container"><i className="fa-solid fa-file-invoice-dollar"></i></div>
                            <div className="text-container"><p className="card-title">Nómina</p><p className="card-subtitle">Consulta de Desprendibles de Pago</p></div>
                        </Link>
                        <Link to="/mi-perfil" className="menu-card card-purple">
                            <div className="icon-container"><i className="fa-solid fa-user-gear"></i></div>
                            <div className="text-container"><p className="card-title">Mi Perfil</p><p className="card-subtitle">Actualiza tus datos personales</p></div>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;