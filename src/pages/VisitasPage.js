// src/pages/VisitasPage.js
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const VisitasPage = () => {
    const { user } = useContext(AuthContext);
    const [clientes, setClientes] = useState([]);
    const [checklists, setChecklists] = useState([]);
    const [visitasList, setVisitasList] = useState([]);
    
    // Estados del formulario
    const [formDetails, setFormDetails] = useState({
        id_cliente: '',
        cedula_auditado: '',
        id_checklist: '',
        hallazgos_generales: '',
        recomendaciones: '',
    });
    const [checklistItems, setChecklistItems] = useState([]);
    const [respuestas, setRespuestas] = useState({});
    const [evidencias, setEvidencias] = useState({});

    // Estados de la UI
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await fetchClientes();
            await fetchChecklists();
            await fetchVisitas();
            setLoading(false);
        };
        fetchData();
    }, []);
    
    const fetchClientes = async () => {
        // En un escenario real, harías una llamada a una API para obtener los clientes
        const mockClientes = [
            { ID_Cliente: 1, NombreEmpresa: 'Cliente A' },
            { ID_Cliente: 2, NombreEmpresa: 'Cliente B' },
        ];
        setClientes(mockClientes);
    };

    const fetchChecklists = async () => {
        // Llama a la API para obtener los checklists disponibles para el rol del usuario
        try {
            const response = await fetch(`http://localhost/securigestion/actions/get_checklists_by_role.php?id_rol=${user.rol_id}`);
            const data = await response.json();
            if (data.error) {
                console.error(data.error);
            } else {
                setChecklists(data);
            }
        } catch (error) {
            console.error("Error fetching checklists:", error);
        }
    };
    
    const fetchVisitas = async () => {
        try {
            const response = await fetch('http://localhost/securigestion/actions/consulta_visitas_action.php');
            const data = await response.json();
            if (data.error) {
                setMessage(data.error);
                setStatus('error');
            } else {
                setVisitasList(data);
            }
        } catch (error) {
            setMessage('Error al cargar el historial de visitas.');
            setStatus('error');
        }
    };

    const handleFormDetailsChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({ ...formDetails, [name]: value });
    };

    const handleChecklistSelect = async (e) => {
        const id_checklist = e.target.value;
        setFormDetails({ ...formDetails, id_checklist });
        
        if (id_checklist) {
            try {
                const response = await fetch(`http://localhost/securigestion/actions/get_checklist_items_action.php?id_checklist=${id_checklist}`);
                const data = await response.json();
                if (data.error) {
                    setMessage(data.error);
                    setChecklistItems([]);
                } else {
                    setChecklistItems(data);
                }
            } catch (error) {
                setMessage('Error al cargar los ítems del checklist.');
                setStatus('error');
            }
        } else {
            setChecklistItems([]);
        }
    };

    const handleRespuestaChange = (id_item, respuesta) => {
        setRespuestas({ ...respuestas, [id_item]: respuesta });
    };

    const handleEvidenciaChange = (id_item, file) => {
        setEvidencias({ ...evidencias, [id_item]: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setStatus('');
        
        const formDataToSend = new FormData();
        formDataToSend.append('id_cliente', formDetails.id_cliente);
        formDataToSend.append('cedula_auditado', formDetails.cedula_auditado);
        formDataToSend.append('id_checklist', formDetails.id_checklist);
        formDataToSend.append('hallazgos_generales', formDetails.hallazgos_generales);
        formDataToSend.append('recomendaciones', formDetails.recomendaciones);
        
        for (const id_item in respuestas) {
            formDataToSend.append(`respuestas[${id_item}]`, respuestas[id_item]);
        }
        
        for (const id_item in evidencias) {
            formDataToSend.append(`evidencias[${id_item}]`, evidencias[id_item]);
        }
        
        try {
            const response = await fetch('http://localhost/securigestion/actions/visita_action.php', {
                method: 'POST',
                body: formDataToSend,
            });
            const result = await response.json();

            if (result.success) {
                setMessage(result.message);
                setStatus('success');
                // Limpiar el formulario y recargar las visitas
                setFormDetails({ id_cliente: '', cedula_auditado: '', id_checklist: '', hallazgos_generales: '', recomendaciones: '' });
                setRespuestas({});
                setEvidencias({});
                setChecklistItems([]);
                fetchVisitas();
            } else {
                setMessage(result.message);
                setStatus('error');
            }
        } catch (err) {
            setMessage('Error de conexión con el servidor.');
            setStatus('error');
        }
    };

    if (loading) {
        return <p>Cargando módulo de visitas...</p>;
    }

    return (
        <div id="visitas-page" className="page-content active">
            <main className="registro-container">
                <section>
                    <h1>Registro de Visita de Supervisión</h1>
                    <p>Complete el siguiente formulario para registrar una nueva visita y su checklist asociado.</p>
                </section>
                
                {message && <div className={status === 'success' ? 'success-message' : 'error-message'}>{message}</div>}

                <form id="form-visita-supervision" onSubmit={handleSubmit}>
                    <h2>1. Detalles de la Visita</h2>
                    <label htmlFor="visita-cliente">Cliente Visitado:</label>
                    <select id="visita-cliente" name="id_cliente" value={formDetails.id_cliente} onChange={handleFormDetailsChange} required>
                        <option value="">-- Seleccione un Cliente --</option>
                        {clientes.map(cliente => (
                            <option key={cliente.ID_Cliente} value={cliente.ID_Cliente}>{cliente.NombreEmpresa}</option>
                        ))}
                    </select>

                    <label htmlFor="visita-vigilante-cedula">Cédula del Vigilante Auditado:</label>
                    <input type="text" id="visita-vigilante-cedula" name="cedula_auditado" value={formDetails.cedula_auditado} onChange={handleFormDetailsChange} required />

                    <hr />
                    
                    <h2>2. Checklist de la Visita</h2>
                    <label htmlFor="visita-checklist-tipo">Tipo de Checklist a Realizar:</label>
                    <select id="visita-checklist-tipo" name="id_checklist" value={formDetails.id_checklist} onChange={handleChecklistSelect} required>
                        <option value="">-- Seleccione un Checklist --</option>
                        {checklists.map(checklist => (
                             <option key={checklist.ID_Checklist} value={checklist.ID_Checklist}>{checklist.NombreChecklist}</option>
                        ))}
                    </select>

                    <div id="checklist-container" style={{ marginTop: '20px' }}>
                        {checklistItems.map(item => (
                            <div key={item.ID_Item} className="checklist-item" style={{ marginBottom: '15px' }}>
                                <p><strong>{item.Pregunta}</strong></p>
                                <div className="respuesta-options">
                                    <label><input type="radio" name={`respuestas[${item.ID_Item}]`} value="Si" onChange={() => handleRespuestaChange(item.ID_Item, 'Si')} required /> Sí</label>
                                    <label><input type="radio" name={`respuestas[${item.ID_Item}]`} value="No" onChange={() => handleRespuestaChange(item.ID_Item, 'No')} /> No</label>
                                    <label><input type="radio" name={`respuestas[${item.ID_Item}]`} value="NA" onChange={() => handleRespuestaChange(item.ID_Item, 'NA')} /> N/A</label>
                                </div>
                                <div className="evidencia-upload">
                                    <label>Adjuntar Foto (Opcional):</label>
                                    <input type="file" name={`evidencias[${item.ID_Item}]`} accept="image/*" onChange={(e) => handleEvidenciaChange(item.ID_Item, e.target.files[0])} />
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <hr />

                    <h2>3. Hallazgos y Recomendaciones</h2>
                    <label htmlFor="visita-hallazgos">Hallazgos (Positivos y Negativos):</label>
                    <textarea id="visita-hallazgos" name="hallazgos_generales" rows="5" value={formDetails.hallazgos_generales} onChange={handleFormDetailsChange}></textarea>

                    <label htmlFor="visita-recomendaciones">Recomendaciones (Acciones Correctivas y Preventivas):</label>
                    <textarea id="visita-recomendaciones" name="recomendaciones" rows="5" value={formDetails.recomendaciones} onChange={handleFormDetailsChange}></textarea>

                    <button type="submit" style={{ marginTop: '20px' }}>Guardar Visita y Checklist</button>
                </form>
                
                <hr style={{ margin: '40px 0' }} />
                
                <section id="consultar-visitas">
                    <h2>Consultar Visitas de Supervisión</h2>
                    <p>Historial de las últimas visitas registradas.</p>
                    
                    <button type="button" onClick={fetchVisitas}>Recargar Visitas</button>
                    
                    <div id="resultados-visitas-container" style={{ marginTop: '20px' }}>
                        {visitasList.length > 0 ? (
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Fecha</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Supervisor</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Auditado</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Cliente</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visitasList.map(visita => (
                                        <tr key={visita.ID_Visita}>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{visita.ID_Visita}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{visita.FechaVisita}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{visita.Supervisor}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{visita.Auditado}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{visita.Cliente}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                                                <Link to={`/detalle-visita/${visita.ID_Visita}`} style={{ textDecoration: 'none', padding: '5px 10px', backgroundColor: '#007bff', color: 'white', borderRadius: '4px' }}>Ver Detalles</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No se encontraron visitas registradas.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default VisitasPage;