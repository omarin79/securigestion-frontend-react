// src/pages/InformesPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InformesPage = () => {
    const [formData, setFormData] = useState({
        tipo_informe: 'visitas',
        fecha_inicio: '',
        fecha_fin: '',
    });
    const [reportData, setReportData] = useState([]);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setStatus('');
        setReportData([]);

        try {
            const response = await fetch('http://localhost/securigestion/pages/generar-informe.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (result.success) {
                if (result.data && result.data.length > 0) {
                    setReportData(result.data);
                    setMessage('Informe generado con éxito.');
                } else {
                    setMessage(result.message);
                }
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
        <div id="informes-page" className="page-content active">
            <main className="registro-container">
                <section>
                    <h1>Gestión de Informes</h1>
                    <p>Seleccione los filtros para generar un nuevo informe.</p>
                </section>
                
                {message && <div className={status === 'success' ? 'success-message' : 'error-message'}>{message}</div>}

                <section className="form-section">
                    <h2>Informe de Visitas de Supervisión</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="tipo_informe" value="visitas" />

                        <label htmlFor="fecha_inicio">Fecha de Inicio:</label>
                        <input type="date" id="fecha_inicio" name="fecha_inicio" value={formData.fecha_inicio} onChange={handleFormChange} required />

                        <label htmlFor="fecha_fin">Fecha de Fin:</label>
                        <input type="date" id="fecha_fin" name="fecha_fin" value={formData.fecha_fin} onChange={handleFormChange} required />

                        <button type="submit" style={{ marginTop: '20px' }}>Generar Informe</button>
                    </form>
                </section>

                <hr style={{ margin: '40px 0' }} />

                <section className="form-section">
                    <h2>Resultados del Informe</h2>
                    {reportData.length > 0 ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                            <thead>
                                <tr>
                                    <th>ID Visita</th>
                                    <th>Fecha</th>
                                    <th>Supervisor</th>
                                    <th>Auditado</th>
                                    <th>Cliente</th>
                                    <th>Hallazgos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.map((fila) => (
                                    <tr key={fila.ID_Visita}>
                                        <td>{fila.ID_Visita}</td>
                                        <td>{fila.FechaVisita}</td>
                                        <td>{fila.Supervisor}</td>
                                        <td>{fila.Auditado}</td>
                                        <td>{fila.Cliente}</td>
                                        <td>{fila.Hallazgos}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay datos para mostrar. Genere un informe con los filtros de arriba.</p>
                    )}
                </section>
            </main>
        </div>
    );
};

export default InformesPage;