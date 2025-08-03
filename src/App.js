// src/App.js (Corregido)
import './style.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Importa los componentes de diseño principales
import Header from './components/Header';
import Footer from './components/Footer';

// Importa todas las páginas públicas de la aplicación
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import OlvidoContrasenaPage from './pages/OlvidoContrasenaPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

// Importa todas las páginas protegidas
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import VisitasPage from './pages/VisitasPage'; 
import DetalleVisitaPage from './pages/DetalleVisitaPage'; 
import NominaPage from './pages/NominaPage';
import TalentoHumanoPage from './pages/TalentoHumanoPage';
import PlataformaOperativaPage from './pages/PlataformaOperativaPage';
import InformesPage from './pages/InformesPage';
import MiProgramacionPage from './pages/MiProgramacionPage';
import PreoperacionalVehiculosPage from './pages/PreoperacionalVehiculosPage';
import VisualizacionAlertasPage from './pages/VisualizacionAlertasPage';

// Componente para proteger las rutas que requieren autenticación
const PrivateRoute = ({ children }) => {
    const { user } = React.useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <div id="content-wrapper">
                    <Routes>
                        {/* Rutas Públicas */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/registro" element={<RegistroPage />} />
                        <Route path="/olvido-contrasena" element={<OlvidoContrasenaPage />} />
                        <Route path="/reset-password" element={<ResetPasswordPage />} />
                        
                        {/* Rutas Protegidas */}
                        <Route path="/inicio" element={
                            <PrivateRoute>
                                <HomePage />
                            </PrivateRoute>
                        } />
                        <Route path="/mi-perfil" element={
                            <PrivateRoute>
                                <ProfilePage />
                            </PrivateRoute>
                        } />
                        <Route path="/editar-perfil" element={
                            <PrivateRoute>
                                <EditProfilePage />
                            </PrivateRoute>
                        } />
                        <Route path="/plataforma_operativa" element={
                            <PrivateRoute>
                                <PlataformaOperativaPage />
                            </PrivateRoute>
                        } />
                        <Route path="/informes" element={
                            <PrivateRoute>
                                <InformesPage />
                            </PrivateRoute>
                        } />
                        <Route path="/visitas" element={
                            <PrivateRoute>
                                <VisitasPage />
                            </PrivateRoute>
                        } />
                        <Route path="/detalle-visita/:id_visita" element={
                            <PrivateRoute>
                                <DetalleVisitaPage />
                            </PrivateRoute>
                        } />
                        <Route path="/nomina" element={
                            <PrivateRoute>
                                <NominaPage />
                            </PrivateRoute>
                        } />
                        <Route path="/talento-humano" element={
                            <PrivateRoute>
                                <TalentoHumanoPage />
                            </PrivateRoute>
                        } />
                        <Route path="/preoperacional-vehiculos" element={
                            <PrivateRoute>
                                <PreoperacionalVehiculosPage />
                            </PrivateRoute>
                        } />
                        <Route path="/visualizacion-alertas" element={
                            <PrivateRoute>
                                <VisualizacionAlertasPage />
                            </PrivateRoute>
                        } />
                        <Route path="/mi-programacion" element={
                            <PrivateRoute>
                                <MiProgramacionPage />
                            </PrivateRoute>
                        } />
                        
                        {/* Redirección predeterminada: si el usuario está logueado, va a /inicio, si no, a /login */}
                        <Route 
                            path="/" 
                            element={<Navigate to="/inicio" />} 
                        />
                         {/* Ruta comodín para manejar cualquier URL no definida */}
                        <Route 
                            path="*" 
                            element={<Navigate to="/inicio" />} 
                        />
                    </Routes>
                </div>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;