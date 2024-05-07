import React, { useState, useEffect } from 'react';
import './Autor.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import DropdownButton from '../components/DropdownButton/DropdownButton';


const Autor = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const id_autor = new URLSearchParams(location.search).get('id');
    const [autor, setAutor] = useState([]);
    const [nombreAutor, setNombreAutor] = useState('Autor');
    const [textoInformacionAutor, setTextoInformacionAutor] = useState('Información del autor');
    const [ciudadNacimientoAutor, setCiudadNacimientoAutor] = useState('Tombuktu');
    const [puntuacionMedia, setPuntuacionMedia] = useState(3.5);
    const [generoMasPublicado, setGeneroMasPublicado] = useState('');
    const [audiolibros, setAudiolibros] = useState([]);
    useEffect(() => {

        if (id_autor) {
            const URL_AUTOR = `/autores/data/${id_autor}`;
            axios.get(URL_AUTOR)
            .then(response => {
                // Actualiza el estado de los libros con los datos de los audiolibros recibidos
                const data = response.data;
                setAutor(data);
                setNombreAutor(data.autor.nombre);
                setTextoInformacionAutor(data.autor.informacion);
                setCiudadNacimientoAutor(data.autor.ciudadnacimiento);
                setPuntuacionMedia(data.NotaMedia);
                setGeneroMasPublicado(data.generoMasEscrito);
                setAudiolibros(data.audiolibros);
                console.log(data);
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

    const estrellasLlenas = Math.floor(puntuacionMedia);
    const estrellasMedias = puntuacionMedia - estrellasLlenas >= 0.5 ? 1 : 0;
    const estrellasVacias = 5 - estrellasLlenas - estrellasMedias;

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
                            <img className='autor-audiolibro-portada' src={audiolibro.img} alt={audiolibro.titulo} />
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