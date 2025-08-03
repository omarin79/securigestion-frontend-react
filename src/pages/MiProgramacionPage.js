// src/pages/MiProgramacionPage.js
import React, { useState, useEffect, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AuthContext } from '../context/AuthContext';

const MiProgramacionPage = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            if (!user?.id) {
                setMessage('Error: Usuario no autenticado.');
                setStatus('error');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost/securigestion/actions/consulta_programacion_action.php');
                const data = await response.json();

                if (response.ok) {
                    if (data.error) {
                        setMessage(data.error);
                        setStatus('error');
                    } else {
                        // Formato de eventos de la API es compatible con FullCalendar
                        setEvents(data);
                    }
                } else {
                    setMessage('Error al cargar la programación.');
                    setStatus('error');
                }
            } catch (error) {
                setMessage('Error de conexión con el servidor.');
                setStatus('error');
            }
            setLoading(false);
        };
        
        fetchEvents();
    }, [user]);

    if (loading) {
        return <p>Cargando tu programación...</p>;
    }

    return (
        <div id="mi-programacion-page" className="page-content active">
            <main className="registro-container">
                <section>
                    <h1>Mi Programación</h1>
                    <p>Aquí puedes consultar tu horario de trabajo asignado para el mes actual.</p>
                </section>
                
                {message && <div className={status === 'success' ? 'success-message' : 'error-message'}>{message}</div>}

                <section className="form-section">
                    <h2>Horario del Mes</h2>
                    <div id="calendario-container" style={{ marginTop: '20px' }}>
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            locale="es"
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth'
                            }}
                            events={events}
                            eventContent={({ event }) => (
                                <>
                                    <b>{event.title}</b>
                                    {event.extendedProps.cliente && <p>{event.extendedProps.cliente}</p>}
                                </>
                            )}
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default MiProgramacionPage;