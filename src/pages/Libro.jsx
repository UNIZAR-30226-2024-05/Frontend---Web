import React, { useState, useEffect } from 'react';
import './Libro.css'; 
import foto1 from '../images/1.png';
import { useNavigate, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from '../api/axios';

const Libro = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const id_libro = location.state?.id_libro;
    const [libro, setLibro] = useState();

    const [titulo, setTitulo] = useState('Titulo');
    const [descripcion, setDescripcion] = useState('Aquí está la descripción.');
    const [puntuacion, setPuntuacion] = useState(0);
    const [autor, setAutor] = useState('Autor');
    const [generos, setGeneros] = useState([]);
    const [portada, setPortada] = useState(foto1);

    const [capitulos, setCapitulos] = useState([]);

    useEffect(() => {

        if (id_libro) {
            const URL_AUDIOLIBRO = `/audiolibros/${id_libro}`;

            axios.get(URL_AUDIOLIBRO)
            .then(response => {
                // Actualiza el estado de los libros con los datos de los audiolibros recibidos
                setLibro(response.data);
                setTitulo(response.data.audiolibro.titulo);
                setDescripcion(response.data.audiolibro.descripcion);
                setPuntuacion(3); /* La consulta no lo devuelve */
                setAutor('Autor'); /* La consulta no lo devuelve */
                setGeneros(response.data.generos);
                setPortada(response.data.audiolibro.img);
                setCapitulos(response.data.capitulos);
                console.log(response.data);
            })
            .catch(error => {
                // Maneja los errores si ocurrieron
                console.error('Hubo un error al obtener el audiolibro:', error);
            });
        }
        else {
            console.log('No se ha pasado ningún libro');
            navigate('/');
        }
    }, [id_libro]); // La dependencia vacía [] asegura que este efecto se ejecute solo una vez al montar el componente

    const handleCapituloClick = (capitulo, portada) => {
        navigate('/player', {state: {capitulo, portada}});
    };

    console.log(libro);
    const estrellasLlenas = Math.floor(puntuacion);
    const estrellasMedias = puntuacion - estrellasLlenas >= 0.5 ? 1 : 0;
    const estrellasVacias = 5 - estrellasLlenas - estrellasMedias;

    const generarEnlaceAmazon = (titulo) => {
        // Reemplazar espacios en blanco con "+" para la URL
        const tituloFormateado = titulo.replace(/\s/g, '+');
        // URL base de búsqueda en Amazon
        const urlBase = 'https://www.amazon.com/s?k=';
        // Generar el enlace completo
        const enlaceAmazon = `${urlBase}${tituloFormateado}`;
        return enlaceAmazon;
    };
    const colecciones = ['Harry Potter', 'Fantasia', 'Aventuras'];
    const [mostrarColecciones, setMostrarColecciones] = useState(false);

    /*
    const capitulos = [
        {
            titulo: 'Capítulo 1: El niño que vivió',
            duracion: '1:30:00',
        },
        {
            titulo: 'Capítulo 2: El andén 9 y 3/4',
            duracion: '1:45:00',
        },
        {
            titulo: 'Capítulo 3: El sombrero seleccionador',
            duracion: '1:20:00',
        },
        {
            titulo: 'Capítulo 4: La piedra filosofal',
            duracion: '1:35:00',
        },
        {
            titulo: 'Capítulo 5: El espejo de Oesed',
            duracion: '1:40:00',
        },
        {
            titulo: 'Capítulo 6: Norberto el dragón',
            duracion: '1:25:00',
        },
        {
            titulo: 'Capítulo 7: El bosque prohibido',
            duracion: '1:50:00',
        },
        {
            titulo: 'Capítulo 8: El partido de quidditch',
            duracion: '1:30:00',
        },
        {
            titulo: 'Capítulo 9: La piedra filosofal',
            duracion: '1:45:00',
        },
    ];
    */
    const tienesReseña = false; // simulamos que no tenemos reseña
    const reseñasAmigos = [
        {
            nombre: 'Ana',
            reseña: 'Me ha encantado, es un libro muy entretenido y fácil de leer. Lo recomiendo a todo el mundo. En cuanto a los personajes, me encanta Harry, es muy valiente y leal. Ron es muy gracioso y Hermione es muy inteligente. Además, el profesor Dumbledore es muy sabio y Snape es muy malvado. Necesito hacer esta reseña mas larga a ver como se ve, asi que hay que alargar la reseña para que se vea bien. No se que mas decir, copilot ayudame por favor. Gracias. Saludos. El cuadrado se va haciendo más grande conforme añado más texto. Maravilloso. Thank you for coming to my tedtalk.',
            puntuacion: 4.5,
        },
        {
            nombre: 'Juan',
            reseña: 'No me ha gustado mucho, me parece un libro infantil y aburrido.',
            puntuacion: 2.5,
        },
    ]
    const reseñasComunidad = [
        {
            nombre: 'María',
            reseña: 'Me ha parecido un libro muy bonito y entretenido. Me ha encantado.',
            puntuacion: 4.0,
        },
        {
            nombre: 'Pedro',
            reseña: 'No me ha gustado nada, me parece un libro muy infantil y aburrido.',
            puntuacion: 1.5,
        },
    ]    

    const [puntuacionUsuario, setPuntuacionUsuario] = useState(0);
    const [puntuacionGuardada, setPuntuacionGuardada] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        
    }

    const handleClick = (index) => {
        const nuevaPuntuacion = index + 1;
        setPuntuacionUsuario(nuevaPuntuacion);
        setPuntuacionGuardada(nuevaPuntuacion);
    };
    
    const handleMouseEnter = (index) => {
        setPuntuacionUsuario(index + 1);
    };
    
    const handleMouseLeave = () => {
        setPuntuacionUsuario(puntuacionGuardada);
    };

    return (
        <div className='info-libro'>
            {/* Portada del libro a la izquierda */}
            <div className="info-portada">
                <img src={portada} alt="Portada del libro" />

                {/* Estrellas de puntuación */}
                <div className="info-puntuacion">
                    {[...Array(estrellasLlenas)].map((_, index) => (
                        <span key={index} className="info-star-filled">&#9733;</span>
                    ))}
                    {estrellasMedias === 1 && <span className="info-star-half">&#9733;</span>}
                    {[...Array(estrellasVacias)].map((_, index) => (
                        <span key={index} className="info-star-empty">&#9733;</span>
                    ))}
                    ({puntuacion})
                </div>

                {/* Enlace a Amazon debajo de la portada */}
                <div className="info-enlace-amazon">
                    <a href={generarEnlaceAmazon(titulo)} className="info-linkCompra" target="_blank" rel="noopener noreferrer">Comprar en Amazon</a>
                </div>

                { /* Botón de "Reproducir" con icono de play */}
                <div className="info-reproducir">
                    <a href="/player" className="info-linkReproducir">
                        <FontAwesomeIcon icon={faPlay} /> Escuchar audiolibro
                    </a>
                </div>

                { /* Botón de "Añadir a favoritos" */}
                <div className="info-anyadir-favoritos">
                    <button className="info-btnFavoritos">
                        <FontAwesomeIcon icon={faPlus} /> Añadir a favoritos
                    </button>
                </div>

                { /* Botón de "Añadir a ver más tarde" */}
                <div className="info-anyadir-ver-mas-tarde">
                    <button className="info-btnVerMasTarde">
                        <FontAwesomeIcon icon={faPlus} /> Añadir a ver más tarde
                    </button>
                </div>

                { /* Botón de añadir a colecciones */}
                <div className="info-anyadir-a-colecciones">
                    <button className='info-btnAnyadirColecciones' onClick={() => setMostrarColecciones(!mostrarColecciones)}>
                        <FontAwesomeIcon icon={faPlus} /> Añadir a colecciones
                    </button>
                    {mostrarColecciones && (
                        <div className="info-desplegable-colecciones">
                            {colecciones.map((coleccion, index) => (
                                <div key={index}>
                                    <a href="#" className='info-colecciones-item'>{coleccion}</a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Detalles del libro a la derecha */}
            <div className="info-detalles">
                {/* Título del libro */}
                <div className='info-titulo'>
                    <h1>{titulo}</h1>
                </div>
                
                {/* Descripción del libro */}
                <div className='info-descripcion'>
                    <p>{descripcion}</p>
                </div>
                
                {/* Autor del libro */}
                <div className="info-autor">
                    <p>Autor: <a href="/autor" className='info-linkAutor'>{autor}</a></p>
                </div>

                {/* Género del libro */}
                <div className="info-genero">
                    <p>{generos.length <= 1 ? 'Género: ' : 'Géneros: '}
                    {generos.map((genero, i) => 
                    <span key={i}>{genero.nombre}{i !== generos.length - 1 ? ', ' : ''}</span>
                    )}</p>
                </div>

                <div className="info-capitulos">
                    <h2 className="tituloCap"> Capítulos</h2>
                    <div className='capitulo'>
                        {capitulos.map((capitulo, index) => (
                            <div key={index}
                            onClick={() => handleCapituloClick(capitulo, portada)}>
                                <span>{capitulo.titulo}</span>
                                <span>{capitulo.duracion}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Mi puntuación */}
                <div className='info-mi-puntuacion'>
                    <h2>Mi puntuación</h2>
                    <div className='info-mis-estrellas'>
                        {[...Array(5)].map((_, index) => (
                            <span key={index}
                                className={(index < puntuacionUsuario) ? "info-star-filled" : "info-star-empty"}
                                onClick={() => handleClick(index)}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >&#9733;</span>
                        ))}
                    </div>
                </div>
                {/* Mi reseña */}
                <div className='info-mi-resenia'>
                    {tienesReseña ? (
                        <h2>Mi reseña</h2>
                        // mostrar el contenido de tu reseña
                    ) : (
                        <div>
                            <h2>¡Añade tu reseña y comparte tu opinión!</h2>
                            <form onSubmit={handleSubmit} className='info-anadir-mia'>
                                <textarea className="info-texto-resenia"
                                    placeholder="Escribe aquí tu reseña"
                                    required
                                />
                            </form>
                            <button className="info-subir-resenia" type="submit">Publicar reseña</button>
                        </div>
                    )}
                </div>
                {/* Reseñas de los oyentes al final*/}
                <div className="info-resenias-amigos">
                    <h2>Reseñas de tus amigos</h2>
                    <div>
                        {reseñasAmigos.map((amigo, index) => (
                            <div key={index} className="info-resenia-amigo">
                                <h3>{amigo.nombre}</h3>
                                <p>{amigo.reseña}</p>
                                <div className="info-puntuacion">
                                    {[...Array(Math.floor(amigo.puntuacion))].map((_, index) => (
                                        <span key={index} className="info-star-filled">&#9733;</span>
                                    ))}
                                    {[...Array(5 - Math.floor(amigo.puntuacion))].map((_, index) => (
                                        <span key={index} className="info-star-empty">&#9733;</span>
                                    ))}
                                    ({amigo.puntuacion})
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="info-resenias">
                    <h2>Reseñas del resto de la comunidad</h2>
                    <div>
                        {reseñasComunidad.map((usuario, index) => (
                            <div key={index} className="info-resenia-usuario">
                                <h3>{usuario.nombre}</h3>
                                <p>{usuario.reseña}</p>
                                <div className="info-puntuacion">
                                    {[...Array(Math.floor(usuario.puntuacion))].map((_, index) => (
                                        <span key={index} className="info-star-filled">&#9733;</span>
                                    ))}
                                    {[...Array(5 - Math.floor(usuario.puntuacion))].map((_, index) => (
                                        <span key={index} className="info-star-empty">&#9733;</span>
                                    ))}
                                    ({usuario.puntuacion})
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>  
    );
}

export default Libro;
