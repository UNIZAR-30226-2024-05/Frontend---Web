import React, { useState } from "react";
import './AnyadirLibro.css';
import axios from '../../api/axios';

const AnyadirLibro = () => {
    const [tituloDecidido, setTituloDecidido] = useState('');
    const [autorDecidido, setAutorDecidido] = useState('');
    const [descripcionDecidida, setDescripcionDecidida] = useState('');
    const [generoDecidido, setGeneroDecidido] = useState('');
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

    const handleChangeNuevoGenero = (event) => {
        setGeneroDecidido(event.target.value);
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
        console.log(tituloDecidido);
        console.log(autorDecidido);
        console.log(descripcionDecidida);
        console.log(generoDecidido);
        console.log(imagenDecidida);
        console.log(audioCapitulo);
        try {
            const formData = new FormData();
            formData.append('titulo', tituloDecidido);
            formData.append('nombreAutor', autorDecidido);
            formData.append('descripcion', descripcionDecidida);
            formData.append('genero', generoDecidido);
            formData.append('image', imagenDecidida);
            formData.append('audios', audioCapitulo);

            console.log(formData);
    
            const response = await axios.post('/audiolibros/anadir', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            console.log(response.data);
            
        } catch (error) {
            if (!error.response) {
                console.log('No hay respuesta del servidor');
            } else if (error.response.status === 400) {
                console.log('Titulo obligatorio');
            } else if (error.response.status === 404) {
                console.log('Autor no existente');
            } else if(error.response.status === 405) {
                console.log('Genero no existente');
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
            <h2 className='anyadir-libro-titulo'>Añadir un nuevo libro</h2>
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
            <h3>Introduce el género</h3>
            <input
                className='genero-nuevo-libro'
                placeholder='Género del libro'
                value={generoDecidido}
                onChange={handleChangeNuevoGenero}
            />
            <h3>Introduce la imagen de la portada</h3>
            <input type="file" id="imagen-upload" className="input-file" onChange={handleChangeNuevaImagen} />

            {imagenDecidida && (
                <img src={URL.createObjectURL(imagenDecidida)} alt="Vista previa de la imagen" className='vista-previa-portadas'/>
            )}

            <h3>Introduce los audios de cada capítulo</h3>
            <input type="file" id="audio-upload" className="input-file" onChange={handleAgregarAudioCapitulo} />

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
