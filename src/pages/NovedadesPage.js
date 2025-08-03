import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NovedadesPage = () => {
    const [selectedForm, setSelectedForm] = useState('');
    const [novedadesList, setNovedadesList] = useState([]);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null);

    // Simulación de la lista de clientes que vendría de una API
    const listaClientes = [
        { ID_Cliente: 1, NombreEmpresa: 'Recepción Principal Edificio ABC' },
        { ID_Cliente: 2, NombreEmpresa: 'Portería Vehicular La Floresta' },
    ];
    
    useEffect(() => {
        // Cargar las novedades al montar el componente
        fetchNovedades();
    }, []);

    const fetchNovedades = async () => {
        try {
            const response = await fetch('http://localhost/securigestion/actions/consulta_novedades_action.php');
            const data = await response.json();
            if (data.error) {
                setMessage(data.error);
                setStatus('error');
            } else {
                setNovedadesList(data);
            }
        } catch (error) {
            setMessage('Error al cargar las novedades.');
            setStatus('error');
        }
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setStatus('');

        const data = new FormData();
        data.append('tipo_novedad', selectedForm);
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        if (file) {
            data.append('evidencia_ausencia', file); // Asume que el nombre del campo de archivo es 'evidencia_ausencia'
        }

        try {
            const response = await fetch('http://localhost/securigestion/actions/novedad_action.php', {
                method: 'POST',
                body: data,
            });
            const result = await response.json();

            if (result.success) {
                setMessage(result.message);
                setStatus('success');
                // Volver a cargar la lista de novedades después de un registro exitoso
                fetchNovedades();
            } else {
                setMessage(result.message);
                setStatus('error');
            }
        } catch (err) {
            setMessage('Error de conexión con el servidor.');
            setStatus('error');
        }
    };
    
    const renderForm = () => {
        const clientesOptions = listaClientes.map(cliente => (
            <option key={cliente.ID_Cliente} value={cliente.ID_Cliente}>
                {cliente.NombreEmpresa}
            </option>
        ));

        switch (selectedForm) {
            case 'ausencia':
                return (
                    <form onSubmit={handleFormSubmit}>
                        <h3>Registrar Ausencia de Unidad</h3>
                        <label>Cédula de la Unidad Ausente:</label>
                        <input type="text" name="cedula" onChange={handleFormChange} required />
                        <label>Nombre de la Unidad:</label>
                        <input type="text" name="nombre_unidad" readOnly />
                        <label>Puesto de Trabajo Afectado:</label>
                        <select name="puesto_afectado" onChange={handleFormChange} required>
                            <option value="">Seleccione un Puesto...</option>
                            {clientesOptions}
                        </select>
                        <label>Turno Afectado:</label>
                        <select name="turno_afectado" onChange={handleFormChange} required>
                            <option value="">Seleccione...</option>
                            <option value="diurno">Diurno</option>
                            <option value="noche">Noche</option>
                        </select>
                        <label>Fecha y Hora de la Ausencia:</label>
                        <input type="datetime-local" name="fecha_inicio" onChange={handleFormChange} required />
                        <label>Observaciones Adicionales:</label>
                        <textarea name="observaciones" rows="3" onChange={handleFormChange}></textarea>
                        <label>Evidencia (Opcional):</label>
                        <input type="file" name="evidencia_ausencia" accept="image/*,application/pdf" onChange={handleFileChange} />
                        <div className="form-buttons" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <button type="submit">Registrar Ausencia</button>
                        </div>
                    </form>
                );
            // Puedes añadir más casos para cada formulario aquí, siguiendo el mismo patrón
            case 'incapacidad':
                return (
                    <form onSubmit={handleFormSubmit}>
                        <h3>Registrar Incapacidad</h3>
                        <label>Cédula del Empleado:</label>
                        <input type="text" name="cedula" onChange={handleFormChange} required />
                        <label>Nombre del Empleado:</label>
                        <input type="text" name="nombre_empleado" readOnly />
                        <label>Tipo de Incapacidad:</label>
                        <select name="tipo_incapacidad" onChange={handleFormChange} required>
                            <option value="">Seleccione...</option>
                            <option value="general">Enfermedad General</option>
                            <option value="laboral">Accidente Laboral</option>
                            <option value="maternidad">Maternidad/Paternidad</option>
                        </select>
                        <label>Fecha de Inicio de Incapacidad:</label>
                        <input type="date" name="fecha_inicio_incapacidad" onChange={handleFormChange} required />
                        <label>Número de Días Incapacidad:</label>
                        <input type="number" name="dias_incapacidad" min="1" onChange={handleFormChange} required />
                        <label>Soporte Médico (Certificado):</label>
                        <input type="file" name="soporte_incapacidad" accept="image/*,application/pdf" onChange={handleFileChange} required />
                        <div className="form-buttons" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <button type="submit">Registrar Incapacidad</button>
                        </div>
                    </form>
                );
            // ... (otros formularios)
            default:
                return <p>Seleccione un tipo de novedad para ver el formulario.</p>;
        }
    };

    return (
        <div id="novedades-page" className="page-content active">
            <main className="registro-container">
                <section>
                    <h1>Registro de Novedades</h1>
                    <p>Seleccione el tipo de novedad que desea registrar y complete el formulario correspondiente.</p>
                </section>
                
                {message && <div className={status === 'success' ? 'success-message' : 'error-message'}>{message}</div>}

                <label htmlFor="tipo-novedad-registro">Tipo de Novedad:</label>
                <select id="tipo-novedad-registro" onChange={(e) => setSelectedForm(e.target.value)}>
                    <option value="">-- Seleccione una opción --</option>
                    <option value="ausencia">Ausencia de Unidad</option>
                    <option value="incapacidad">Incapacidad</option>
                    <option value="licencia-remunerada">Licencia Remunerada</option>
                    <option value="permiso-remunerado">Permiso Remunerado</option>
                    <option value="licencia-no-remunerada">Licencia No Remunerada</option>
                    <option value="permiso-no-remunerado">Permiso No Remunerado</option>
                    <option value="unidad-evadida">Unidad Evadida</option>
                    <option value="condicion-insegura">Condición Insegura</option>
                </select>
                
                <div id="novedad-form-container" style={{ marginTop: '20px' }}>
                    {renderForm()}
                </div>
                
                <hr style={{ margin: '40px 0' }} />

                <section id="consultar-novedades-section">
                    <h2>Consultar Últimas Novedades</h2>
                    <button type="button" onClick={fetchNovedades}>Cargar Novedades</button>
                    
                    <div id="resultados-novedades" style={{ marginTop: '20px' }}>
                        {novedadesList.length > 0 ? (
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tipo</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Afectado</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Fecha</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Reporta</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Estado</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {novedadesList.map(novedad => (
                                        <tr key={novedad.ID_Novedad}>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{novedad.ID_Novedad}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{novedad.TipoNovedad}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{novedad.PersonalAfectado}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{novedad.FechaHoraRegistro}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{novedad.UsuarioReporta}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{novedad.EstadoNovedad}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                                                <Link to={`/detalle-novedad/${novedad.ID_Novedad}`} style={{ textDecoration: 'none', padding: '5px 10px', backgroundColor: '#28a745', color: 'white', borderRadius: '4px' }}>Ver Detalles</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No se encontraron novedades registradas.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default NovedadesPage;