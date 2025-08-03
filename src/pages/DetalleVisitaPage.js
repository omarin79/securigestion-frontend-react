// src/pages/DetalleVisitaPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const DetalleVisitaPage = () => {
    const { id_visita } = useParams();
    const [visita, setVisita] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVisita = async () => {
            try {
                // Endpoint para obtener detalles de una visita específica
                const response = await fetch(`http://localhost/securigestion/actions/get_detalle_visita_action.php?id_visita=${id_visita}`);
                const data = await response.json();
                
                if (response.ok && data.success) {
                    setVisita(data.data);
                } else {
                    setError(data.message || 'Error al cargar los detalles de la visita.');
                }
            } catch (err) {
                setError('Error de conexión con el servidor.');
            }
            setLoading(false);
        };
        fetchVisita();
    }, [id_visita]);

    if (loading) return <p>Cargando detalles de la visita...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!visita) return <p>Visita no encontrada.</p>;

    return (
        <div id="detalle-visita-page" className="page-content active">
            <main>
                <h1>Detalles de la Visita #{visita.ID_Visita}</h1>
                <section className="detalle-visita-container">
                    <p><strong>Fecha de Visita:</strong> {visita.FechaVisita}</p>
                    <p><strong>Supervisor:</strong> {visita.Supervisor}</p>
                    <p><strong>Vigilante Auditado:</strong> {visita.Auditado}</p>
                    <p><strong>Cliente:</strong> {visita.Cliente}</p>
                    <hr />
                    <h3>Checklist</h3>
                    {/* Renderiza el checklist */}
                    {visita.checklist_items && visita.checklist_items.map((item, index) => (
                        <div key={index}>
                            <p><strong>{item.Pregunta}</strong>: {item.Respuesta}</p>
                            {item.RutaEvidencia && (
                                <img src={`http://localhost/securigestion/${item.RutaEvidencia}`} alt="Evidencia" style={{ maxWidth: '200px' }} />
                            )}
                        </div>
                    ))}
                    <hr />
                    <h3>Hallazgos y Recomendaciones</h3>
                    <p><strong>Hallazgos:</strong> {visita.Hallazgos}</p>
                    <p><strong>Recomendaciones:</strong> {visita.Recomendaciones}</p>
                    <Link to="/visitas">Volver al Historial de Visitas</Link>
                </section>
            </main>
        </div>
    );
};

export default DetalleVisitaPage;