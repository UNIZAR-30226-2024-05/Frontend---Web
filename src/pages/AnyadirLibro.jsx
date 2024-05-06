import React, { useState } from "react";
import './AnyadirLibro.css';
import axios from '../api/axios';

const AnyadirLibro = () => {
    const [tituloDecidido, setTituloDecidido] = useState('');
    const [autorDecidido, setAutorDecidido] = useState('');
    const [descripcionDecidida, setDescripcionDecidida] = useState('');
    const [imagenDecidida, setImagenDecidida] = useState(null);
    const [audioCapitulo, setAudioCapitulo] = useState([]);

    const handleChangeNuevoTitulo = (event) => {
        setTituloDecidido(event.target.value);
    }

    const handleChangeNuevoAutor = (event) => {
        setAutorDecidido(event.target.value);
    }

    const handleChangeNuevaDescripcion = (event) => {
        setDescripcionDecidida(event.target.value);
    }

    const handleChangeNuevaImagen = (event) => {
        // Obtener la primera imagen seleccionada
        const file = event.target.files[0];
        // Establecer la imagen seleccionada como una variable de estado
        setImagenDecidida(file);
    }
    

    const handleAgregarAudioCapitulo = (event) => {
        setAudioCapitulo(event.target.files[0]);
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/audiolibros/anadir', 
            JSON.stringify({
                titulo: tituloDecidido,
                nombreAutor: autorDecidido,
                descripcion: descripcionDecidida,
            }), {image: imagenDecidida}, {audios: audioCapitulo},
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
            console.log(response.data);
            
        } catch (error) {
            if (!error.response) {
                console.log('No hay respuesta del servidor');
            } else if (error.response.status === 409) {
                console.log('Ya existe ese audiolibro');
            } else if (error.response.status === 500) {
                console.log('Error del servidor');
            } else {
                console.log('Error desconocido');
            }            
        }
    }

    return (
        <div className='anyadir-libro-container'>
            <h2>Añadir un nuevo libro</h2>
            <h3>Introduce su título</h3>
            <input
                className='titulo-nuevo-libro'
                placeholder='Título del libro'
                value={tituloDecidido}
                onChange={handleChangeNuevoTitulo}
            />
            <h3>Introduce el autor</h3>
            <input
                className='autor-nuevo-libro'
                placeholder='Autor del libro'
                value={autorDecidido}
                onChange={handleChangeNuevoAutor}
            />
            <h3>Introduce la descripción</h3>
            <textarea
                className='descripcion-nuevo-libro'
                placeholder='Descripción del libro'
                value={descripcionDecidida}
                onChange={handleChangeNuevaDescripcion}
            />
            <h3>Introduce la imagen de la portada</h3>
            <input
                type="file"
                className='imagen-nuevo-libro'
                onChange={handleChangeNuevaImagen}
            />
            {imagenDecidida && (
                <img src={URL.createObjectURL(imagenDecidida)} alt="Vista previa de la imagen" />
            )}
            <h3>Introduce los audios de cada capítulo</h3>
            <input
                type="file"
                accept="audio/*"
                className='audio-capitulo-libro'
                
                onChange={handleAgregarAudioCapitulo}
            />

            <button
                className='submit-libro-button'
                onClick={handleSubmit}
            >
                Añadir Libro
            </button>
        </div>
    );
}

export default AnyadirLibro;
