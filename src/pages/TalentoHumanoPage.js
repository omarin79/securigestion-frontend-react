// src/pages/TalentoHumanoPage.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const TalentoHumanoPage = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        cedula: '',
        tipo_documento: 'certificacion_laboral' // Valor por defecto
    });
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    
    // Función para descargar el archivo PDF
    const downloadPdf = (base64Pdf, filename) => {
        const linkSource = `data:application/pdf;base64,${base64Pdf}`;
        const downloadLink = document.createElement('a');
        downloadLink.href = linkSource;
        downloadLink.download = filename;
        downloadLink.click();
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setStatus('');

        try {
            const response = await fetch('http://localhost/securigestion/actions/talento_humano_action.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (response.ok && result.success) {
                downloadPdf(result.pdf, result.filename);
                setMessage(result.message);
                setStatus('success');
            } else {
                setMessage(result.message || 'Ocurrió un error inesperado.');
                setStatus('error');
            }
        } catch (err) {
            setMessage('Error de conexión con el servidor.');
            setStatus('error');
        }
    };

    return (
        <div id="talento-humano-page" className="page-content active">
            <main className="registro-container">
                <section>
                    <h1>Módulo de Talento Humano</h1>
                    <p>Generación de certificados laborales y otros documentos de personal.</p>
                </section>
                
                {message && <div className={status === 'success' ? 'success-message' : 'error-message'}>{message}</div>}

                <section className="form-section">
                    <h2>Generar Certificado Laboral</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="cedula-th">Cédula del Empleado:</label>
                        <input type="text" id="cedula-th" name="cedula" value={formData.cedula} onChange={handleFormChange} required />
                        
                        <input type="hidden" name="tipo_documento" value="certificacion_laboral" />
                        
                        <button type="submit">Generar Certificado</button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default TalentoHumanoPage;