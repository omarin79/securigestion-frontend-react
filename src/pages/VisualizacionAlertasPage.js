// src/pages/VisualizacionAlertasPage.js
import React, { useState, useEffect } from 'react';

const VisualizacionAlertasPage = () => {
    const [alertas, setAlertas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAlertas = async () => {
            try {
                const response = await fetch('http://localhost/securigestion/actions/alertas_action.php');
                const data = await response.json();
                
                if (response.ok && data.success) {
                    setAlertas(data.data);
                } else {
                    setError(data.message || 'Error al cargar las alertas.');
                }
            } catch (err) {
                setError('Error de conexión con el servidor.');
            }
            setLoading(false);
        };
        fetchAlertas();
    }, []);

    if (loading) return <p>Cargando alertas...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div id="visualizacion-alertas-page" className="page-content active">
            <main>
                <h1>Visualización de Alertas</h1>
                <section>
                    <h2>Alertas Recientes</h2>
                    {alertas.length > 0 ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tipo de Alerta</th>
                                    <th>Descripción</th>
                                    <th>Detalles</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alertas.map((alerta) => (
                                    <tr key={alerta.ID_Alerta}>
                                        <td>{alerta.ID_Alerta}</td>
                                        <td>{alerta.TipoAlerta}</td>
                                        <td>{alerta.Descripcion}</td>
                                        <td>{alerta.Detalles}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No se encontraron alertas.</p>
                    )}
                </section>
            </main>
        </div>
    );
};

export default VisualizacionAlertasPage;