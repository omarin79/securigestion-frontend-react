// src/pages/PreoperacionalVehiculosPage.js
import React, { useState } from 'react';

const PreoperacionalVehiculosPage = () => {
    const [tipoVehiculo, setTipoVehiculo] = useState('');
    const [checklistItems, setChecklistItems] = useState([]);
    const [observaciones, setObservaciones] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleTipoVehiculoChange = (e) => {
        const selectedType = e.target.value;
        setTipoVehiculo(selectedType);
        setChecklistItems([]);
    };

    const handleChecklistItemChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setChecklistItems([...checklistItems, value]);
        } else {
            setChecklistItems(checklistItems.filter(item => item !== value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setStatus('');
        
        const formData = new FormData();
        formData.append('tipo_vehiculo', tipoVehiculo);
        formData.append('observaciones', observaciones);
        checklistItems.forEach(item => {
            if (tipoVehiculo === 'carro') {
                formData.append('items_carro[]', item);
            } else if (tipoVehiculo === 'moto') {
                formData.append('items_moto[]', item);
            }
        });

        try {
            const response = await fetch('http://localhost/securigestion/actions/preoperacional_action.php', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();

            if (result.success) {
                setMessage(result.message);
                setStatus('success');
                setTipoVehiculo('');
                setChecklistItems([]);
                setObservaciones('');
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
        <div id="preoperacional-vehiculos-page" className="page-content active">
            <main>
                <section>
                    <h1>Registro Pre-operacional de Vehículos</h1>
                    <p>Complete el checklist según el tipo de vehículo asignado.</p>
                </section>

                {message && <div className={status === 'success' ? 'success-message' : 'error-message'}>{message}</div>}

                <form id="preoperacional-form" onSubmit={handleSubmit}>
                    <label htmlFor="tipo_vehiculo">1. Seleccione el Tipo de Vehículo:</label>
                    <select id="tipo_vehiculo" name="tipo_vehiculo" value={tipoVehiculo} onChange={handleTipoVehiculoChange} required>
                        <option value="">-- Seleccione --</option>
                        <option value="carro">Carro</option>
                        <option value="moto">Moto</option>
                    </select>

                    {tipoVehiculo === 'carro' && (
                        <fieldset id="checklist_carro">
                            <legend>Lista de Chequeo para Carro</legend>
                            <div><input type="checkbox" name="items_carro[]" value="luces_delanteras" onChange={handleChecklistItemChange} /> Luces delanteras (altas y bajas)</div>
                            <div><input type="checkbox" name="items_carro[]" value="luces_traseras" onChange={handleChecklistItemChange} /> Luces traseras (freno y direccionales)</div>
                            <div><input type="checkbox" name="items_carro[]" value="nivel_aceite" onChange={handleChecklistItemChange} /> Nivel de aceite</div>
                            <div><input type="checkbox" name="items_carro[]" value="nivel_refrigerante" onChange={handleChecklistItemChange} /> Nivel de líquido refrigerante</div>
                            <div><input type="checkbox" name="items_carro[]" value="presion_llantas" onChange={handleChecklistItemChange} /> Presión y estado de las llantas</div>
                            <div><input type="checkbox" name="items_carro[]" value="estado_frenos" onChange={handleChecklistItemChange} /> Estado de los frenos</div>
                            <div><input type="checkbox" name="items_carro[]" value="documentos_vehiculo" onChange={handleChecklistItemChange} /> Documentos del vehículo (SOAT, tecno)</div>
                        </fieldset>
                    )}

                    {tipoVehiculo === 'moto' && (
                        <fieldset id="checklist_moto">
                            <legend>Lista de Chequeo para Moto</legend>
                            <div><input type="checkbox" name="items_moto[]" value="luz_frontal" onChange={handleChecklistItemChange} /> Luz frontal</div>
                            <div><input type="checkbox" name="items_moto[]" value="luz_stop" onChange={handleChecklistItemChange} /> Luz de stop</div>
                            <div><input type="checkbox" name="items_moto[]" value="frenos" onChange={handleChecklistItemChange} /> Frenos (delantero y trasero)</div>
                            <div><input type="checkbox" name="items_moto[]" value="presion_llantas" onChange={handleChecklistItemChange} /> Presión y estado de las llantas</div>
                            <div><input type="checkbox" name="items_moto[]" value="cadena" onChange={handleChecklistItemChange} /> Tensión y lubricación de la cadena</div>
                            <div><input type="checkbox" name="items_moto[]" value="espejos" onChange={handleChecklistItemChange} /> Espejos retrovisores</div>
                            <div><input type="checkbox" name="items_moto[]" value="documentos_vehiculo" onChange={handleChecklistItemChange} /> Documentos de la moto (SOAT, tecno)</div>
                        </fieldset>
                    )}

                    {tipoVehiculo && (
                        <>
                            <label htmlFor="observaciones">Observaciones Adicionales:</label>
                            <textarea id="observaciones" name="observaciones" rows="4" value={observaciones} onChange={(e) => setObservaciones(e.target.value)}></textarea>
                            <button type="submit" id="submit_preoperacional" style={{ marginTop: '20px' }}>Guardar Registro</button>
                        </>
                    )}
                </form>
            </main>
        </div>
    );
};

export default PreoperacionalVehiculosPage;