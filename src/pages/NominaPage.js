// src/pages/NominaPage.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const NominaPage = () => {
    const { user } = useContext(AuthContext);
    const [desprendibleData, setDesprendibleData] = useState({
        cedula: user?.user_doc || '',
        periodo: '',
    });
    const [certificadoData, setCertificadoData] = useState({
        cedula: user?.user_doc || '',
        anio: new Date().getFullYear() - 1,
    });
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const esAdmin = user?.rol_id && [1, 2, 3].includes(user.rol_id);

    const handleDesprendibleChange = (e) => {
        setDesprendibleData({ ...desprendibleData, [e.target.name]: e.target.value });
    };

    const handleCertificadoChange = (e) => {
        setCertificadoData({ ...certificadoData, [e.target.name]: e.target.value });
    };
    
    // Función para descargar el archivo PDF
    const downloadPdf = (base64Pdf, filename) => {
        const linkSource = `data:application/pdf;base64,${base64Pdf}`;
        const downloadLink = document.createElement('a');
        downloadLink.href = linkSource;
        downloadLink.download = filename;
        downloadLink.click();
    };

    const handleDesprendibleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setStatus('');
        
        const dataToSend = { ...desprendibleData, tipo_documento: 'desprendible' };

        try {
            const response = await fetch('http://localhost/securigestion/actions/nomina_action.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });
            const result = await response.json();

            if (result.success) {
                downloadPdf(result.pdf, result.filename);
                setMessage(result.message);
                setStatus('success');
            } else {
                setMessage(result.message);
                setStatus('error');
            }
        } catch (err) {
            setMessage('Error de conexión con el servidor.');
            setStatus('error');
        }
    };

    const handleCertificadoSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setStatus('');

        const dataToSend = { ...certificadoData, tipo_documento: 'certificado_ingresos' };

        try {
            const response = await fetch('http://localhost/securigestion/actions/nomina_action.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });
            const result = await response.json();

            if (result.success) {
                downloadPdf(result.pdf, result.filename);
                setMessage(result.message);
                setStatus('success');
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
        <div id="nomina-page" className="page-content active">
            <main className="registro-container">
                <section>
                    <h1>Módulo de Nómina</h1>
                    <p>Descarga de documentos y certificados de nómina.</p>
                </section>
                
                {message && <div className={status === 'success' ? 'success-message' : 'error-message'}>{message}</div>}

                <section className="form-section">
                    <h2>Descargar Desprendible de Pago</h2>
                    <form onSubmit={handleDesprendibleSubmit}>
                        {esAdmin ? (
                            <>
                                <label>Cédula del Empleado:</label>
                                <input type="text" name="cedula" value={desprendibleData.cedula} onChange={handleDesprendibleChange} required />
                                <label>Nombre del Empleado:</label>
                                <input type="text" id="nombre_empleado_nomina_1" name="nombre_empleado" readOnly />
                            </>
                        ) : (
                            <>
                                <label>Cédula del Empleado:</label>
                                <input type="text" name="cedula" value={desprendibleData.cedula} readOnly />
                                <label>Nombre del Empleado:</label>
                                <input type="text" name="nombre_empleado" value={user?.user_nombre || ''} readOnly />
                            </>
                        )}
                        <label>Periodo:</label>
                        <input type="month" name="periodo" value={desprendibleData.periodo} onChange={handleDesprendibleChange} required />
                        <button type="submit">Descargar Desprendible</button>
                    </form>
                </section>

                <hr />

                <section className="form-section">
                    <h2>Certificado de Ingresos y Retenciones</h2>
                    <form onSubmit={handleCertificadoSubmit}>
                        {esAdmin ? (
                            <>
                                <label>Cédula del Empleado:</label>
                                <input type="text" name="cedula" value={certificadoData.cedula} onChange={handleCertificadoChange} required />
                                <label>Nombre del Empleado:</label>
                                <input type="text" id="nombre_empleado_nomina_2" name="nombre_empleado" readOnly />
                            </>
                        ) : (
                            <>
                                <label>Cédula del Empleado:</label>
                                <input type="text" name="cedula" value={certificadoData.cedula} readOnly />
                                <label>Nombre del Empleado:</label>
                                <input type="text" name="nombre_empleado" value={user?.user_nombre || ''} readOnly />
                            </>
                        )}
                        <label>Año:</label>
                        <input type="number" name="anio" min="2020" max={new Date().getFullYear()} value={certificadoData.anio} onChange={handleCertificadoChange} required />
                        <button type="submit">Descargar Certificado</button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default NominaPage;