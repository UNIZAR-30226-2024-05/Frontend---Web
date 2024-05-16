import React, { useState } from "react";
import './AnyadirAutor.css';
import axios from '../../api/axios';
import Footer from '../../components/Footer/Footer';

const AnyadirAutor = () => {
    const [nombreDecidido, setnombreDecidido] = useState('');
    const [infoDecidida, setInfoDecidida] = useState('');
    const [ciudadDecidida, setCiudadDecidida] = useState('');

    const handleChangeNuevoNombre = (event) => {
        setnombreDecidido(event.target.value);
    }

    const handleChangeNuevaInfo = (event) => {
        setInfoDecidida(event.target.value);
    }

    const handleChangeNuevaCiudad = (event) => {
        setCiudadDecidida(event.target.value);
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/autores/create', 
            JSON.stringify({
                nombre: nombreDecidido,
                info: infoDecidida,
                ciudad: ciudadDecidida,
            }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
            console.log(response.data);
            
        } catch (error) {
            if (!error.response) {
                console.log('No hay respuesta del servidor');
            } else if (error.response.status === 409) {
                console.log('Ya existe ese autor (con ese nombre)');
            } else if (error.response.status === 500) {
                console.log('Error del servidor');
            } else {
                console.log('Error desconocido');
            }            
        }
    }

    return (
        <>
        <div className='anyadir-autor-container'>
            <h2 className='anyadir-autor-titulo'>Añadir un nuevo autor</h2>
            <h3>Introduce su nombre</h3>
            <input
                className='nombre-nuevo-autor'
                placeholder='Nombre del autor'
                value={nombreDecidido}
                onChange={handleChangeNuevoNombre}
            />
            <h3>Introduce su información</h3>
            <input
                className='info-nuevo-autor'
                placeholder='Información del autor'
                value={infoDecidida}
                onChange={handleChangeNuevaInfo}
            />
            <h3>Introduce su ciudad de nacimiento</h3>
            <textarea
                className='ciudad-nuevo-autor'
                placeholder='Ciudad de nacimiento del autor'
                value={ciudadDecidida}
                onChange={handleChangeNuevaCiudad}
            />

            <button
                className='submit-autor-button'
                onClick={handleSubmit}
            >
                Añadir autor
            </button>
        </div>
        <Footer />
        </>
    );
}

export default AnyadirAutor;
