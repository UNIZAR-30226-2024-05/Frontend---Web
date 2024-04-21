import React, { useState, useEffect } from 'react';
import './Autor.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import harry1 from '../images/1.png';
import harry2 from '../images/2.jpg';
import harry3 from '../images/3.jpg';
import harry4 from '../images/4.jpg';
import harry5 from '../images/5.jpg';
import harry6 from '../images/6.jpg';
import harry7 from '../images/7.jpg';
import DropdownButton from '../components/DropdownButton/DropdownButton';


const Autor = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const id_autor = location.state?.id_autor;
    const [autor, setAutor] = useState([]);

    useEffect(() => {

        if (id_autor) {
            const URL_AUTOR = `/autores/${id_autor}`;
            console.log(URL_AUTOR);
            axios.get(URL_AUTOR)
            .then(response => {
                // Actualiza el estado de los libros con los datos de los audiolibros recibidos
                setAutor(response.data);
                console.log(response.data);
            })
            .catch(error => {
                // Maneja los errores si ocurrieron
                console.error('Hubo un error al obtener los datos del autor:', error);
            });
        }
        else {
            console.log('No se ha pasado ningún autor'); /* Habrá que mirarselo bien */
            navigate('/');
        }
    }, []); // La dependencia vacía [] asegura que este efecto se ejecute solo una vez al montar el componente

    const puntuacionMedia = 3.5;
    const estrellasLlenas = Math.floor(puntuacionMedia);
    const estrellasMedias = puntuacionMedia - estrellasLlenas >= 0.5 ? 1 : 0;
    const estrellasVacias = 5 - estrellasLlenas - estrellasMedias;
    const generoMasPublicado = 'Fantasía'
    const nombreAutor = 'J.K. Rowling'
    const textoInformacionAutor = 'J.K. Rowling es una aclamada autora británica conocida por su serie de libros Harry Potter. Nacida el 31 de julio de 1965 en Yate, Gloucestershire, Rowling alcanzó la fama mundial con la publicación del primer libro de la serie, Harry Potter y la piedra filosofal, en 1997. Desde entonces, ha escrito varios libros adicionales en la serie, convirtiéndola en una de las sagas literarias más populares de todos los tiempos. Además de su trabajo en la serie Harry Potter, Rowling ha escrito novelas para adultos y ha participado en varios proyectos filantrópicos. Su influencia en la literatura contemporánea es innegable, y su legado perdurará por generaciones.'
    const ciudadNacimientoAutor = 'Yate, Gloucestershire, Reino Unido'
    const audiolibros = [
        {
            id: 1,
            titulo: 'Harry Potter y la piedra filosofal',
            portada: harry1,
            puntuacion: 4.5
        },
        {
            id: 2,
            titulo: 'Harry Potter y la cámara secreta',
            portada: harry2,
            puntuacion: 4.0
        },
        {
            id: 3,
            titulo: 'Harry Potter y el prisionero de Azkaban',
            portada: harry3,
            puntuacion: 4.0
        },
        {
            id: 4,
            titulo: 'Harry Potter y el cáliz de fuego',
            portada: harry4,
            puntuacion: 4.5
        },
        {
            id: 5,
            titulo: 'Harry Potter y la orden del fénix',
            portada: harry5,
            puntuacion: 4.0
        },
        {
            id: 6,
            titulo: 'Harry Potter y el misterio del príncipe',
            portada: harry6,
            puntuacion: 4.0
        },
        {
            id: 7,
            titulo: 'Harry Potter y las reliquias de la muerte',
            portada: harry7,
            puntuacion: 4.5
        }
    ]

    return (
        <div className="autor-container">
            <div className="autor-arriba">
                <div className="autor-arriba-derecha">
                    <div className='autor-nombre'>
                        <h1>{nombreAutor}</h1>
                    </div>
                    <div className='autor-informacion'>
                        <p>{textoInformacionAutor}</p>
                    </div>
                    <div className='autor-ciudad-nacimiento'>
                        <p>Ciudad de nacimiento: {ciudadNacimientoAutor}</p>
                    </div>

                    {/* Estrellas de puntuación */}
                    <div className="autor-puntuacion">
                        <p>Puntuación media: {puntuacionMedia}</p>
                    </div>

                    <div className="autor-estrellas">
                        {[...Array(estrellasLlenas)].map((_, index) => (
                            <span key={index} className="autor-star-filled">&#9733;</span>
                        ))}
                        {estrellasMedias === 1 && <span className="autor-star-half">&#9733;</span>}
                        {[...Array(estrellasVacias)].map((_, index) => (
                            <span key={index} className="autor-star-empty">&#9733;</span>
                        ))}
                    </div>

                    <div>
                        <p className='autor-genero-mas-publicado'>Género más publicado:</p>
                        <p className='autor-genero'> <a href='/Biblioteca' className='autor-linkGenero'>{generoMasPublicado}</a></p> {/* añadir el enlace a la busqueda con filtro fantasia*/}
                    </div> 
                </div>
            </div>
            <div className='autor-abajo'>
                <div className='autor-publicaciones'>
                    <h1>Audiolibros de {nombreAutor}</h1>
                </div>
                <div className='autor-audiolibros'>
                    {audiolibros.map((audiolibro) => (
                        <div key={audiolibro.id} className='autor-audiolibro-concreto'>
                            <img className='autor-audiolibro-portada' src={audiolibro.portada} alt={audiolibro.titulo} />
                            <div className='autor-audiolibro-info'>
                                <p className='autor-audiolibro-titulo'><a className='autor-audiolibro-tituloLink' href='/libro'>{audiolibro.titulo}</a></p>
                                <p className='autor-audiolibro-autor'>por <a href='/autor' className='autor-linkAutor'>{nombreAutor}</a></p>
                                <div className='autor-audiolibro-estrellas'>
                                    {[...Array(Math.floor(audiolibro.puntuacion))].map((_, index) => (
                                        <span key={index} className="autor-star-filled">&#9733;</span>
                                    ))}
                                    {audiolibro.puntuacion - Math.floor(audiolibro.puntuacion) >= 0.5 && <span className="autor-star-half">&#9733;</span>}
                                    {[...Array(5 - Math.ceil(audiolibro.puntuacion))].map((_, index) => (
                                        <span key={index} className="autor-star-empty">&#9733;</span>
                                    ))}
                                    <div className='autor-audiolibro-puntuacion-numerito'>
                                        {audiolibro.puntuacion} de puntuacion media
                                    </div>
                                </div>
                            </div>
                            <div className='autor-audiolibro-dropdown'>
                            <DropdownButton options={['Reproducir', 'Añadir a favoritos', 'Añadir a escuchar más tarde']} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Autor;