// src/pages/PlataformaOperativaPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const PlataformaOperativaPage = () => {
    return (
        <div id="plataforma-operativa-page" className="page-content active">
            <main>
                <section>
                    <h1>Plataforma Operativa</h1>
                    <p>Seleccione la opción que desea gestionar:</p>
                    
                    <div className="menu-container">
                        {/* Enlace a la página de Informes */}
                        <Link to="/informes" className="menu-card card-red">
                            <div className="icon-container"><i className="fa-solid fa-chart-simple"></i></div>
                            <div className="text-container"><p className="card-title">Gestión de Informes</p></div>
                        </Link>
                        {/* Enlace a la página de Novedades */}
                        <Link to="/novedades" className="menu-card card-teal">
                            <div className="icon-container"><i className="fa-solid fa-file-circle-plus"></i></div>
                            <div className="text-container"><p className="card-title">Registro de Novedades</p></div>
                        </Link>
                        {/* Enlace a la página de Alertas */}
                        <Link to="/visualizacion-alertas" className="menu-card card-orange">
                            <div className="icon-container"><i className="fa-solid fa-triangle-exclamation"></i></div>
                            <div className="text-container"><p className="card-title">Visualización de Alertas</p></div>
                        </Link>
                        {/* Enlace a la página de Mi Programación */}
                         <Link to="/mi-programacion" className="menu-card card-indigo">
                            <div className="icon-container"><i className="fa-solid fa-calendar-days"></i></div>
                            <div className="text-container"><p className="card-title">Mi Programación</p></div>
                        </Link>
                        {/* Enlace a la página de Pre-operacional */}
                        <Link to="/preoperacional-vehiculos" className="menu-card card-cyan">
                            <div className="icon-container"><i className="fa-solid fa-car-on"></i></div>
                            <div className="text-container"><p className="card-title">Pre-operacional Vehículos</p></div>
                        </Link>
                        {/* Enlace a la página de Visitas */}
                        <Link to="/visitas" className="menu-card card-grey">
                            <div className="icon-container"><i className="fa-solid fa-person-walking-luggage"></i></div>
                            <div className="text-container"><p className="card-title">Registrar Visita</p></div>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default PlataformaOperativaPage;