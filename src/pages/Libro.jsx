import React, { useState, useEffect } from 'react';
import './Libro.css'; 
import foto1 from '../images/1.png';
import { useNavigate, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faPlay, faCaretUp, faCaretDown, faHeart as solidHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import axios from '../api/axios';

const Libro = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const id_libro = location.state?.id_libro;
    const [libro, setLibro] = useState();

    const [titulo, setTitulo] = useState('Titulo');
    const [descripcion, setDescripcion] = useState('Aquí está la descripción.');
    const [puntuacion, setPuntuacion] = useState(0);
    const [autor, setAutor] = useState({nombre: 'Anónimo', id: 1});
    const [generos, setGeneros] = useState([]);
    const [portada, setPortada] = useState(foto1);
    const [colecciones, setColecciones] = useState([]);
    const [miResenia, setMiResenia] = useState([]);
    const [reseniasAmigos, setReseniasAmigos] = useState([]);
    const [reseniasComunidad, setReseniasComunidad] = useState([]);
    const [privacidad, setPrivacidad] = useState('');
    const [comentario, setComentario] = useState('');

    const [capitulos, setCapitulos] = useState([]);

    useEffect(() => {

        if (id_libro) {
            obtenerDatosLibro();
        }
        else {
            console.log('No se ha pasado ningún libro');
            navigate('/');
        }
    }, []); // La dependencia vacía [] asegura que este efecto se ejecute solo una vez al montar el componente

    const obtenerDatosLibro = () => {
        const URL_AUDIOLIBRO = `/audiolibros/${id_libro}`;

        axios.get(URL_AUDIOLIBRO, {withCredentials: true})
        .then(response => {
            // Actualiza el estado de los libros con los datos de los audiolibros recibidos
            setLibro(response.data);
            setTitulo(response.data.audiolibro.titulo);
            setDescripcion(response.data.audiolibro.descripcion);
            setPuntuacion(3); /* La consulta no lo devuelve */
            setAutor(response.data.autor);
            setGeneros(response.data.generos);
            setPortada(response.data.audiolibro.img);
            setCapitulos(response.data.capitulos);
            setColecciones(response.data.colecciones);
            setMiResenia(response.data.own_review);
            setReseniasAmigos(response.data.friends_reviews);
            setReseniasComunidad(response.data.public_reviews);
            console.log(response.data);
        })
        .catch(error => {
            // Maneja los errores si ocurrieron
            console.error('Hubo un error al obtener el audiolibro:', error);
        });
    };

    const handleCapituloClick = (capitulos, portada) => {
        navigate('/player', {state: {capitulos, portada}});
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

    const [mostrarColecciones, setMostrarColecciones] = useState(false);

    const tienesResenia = () => {
        return miResenia && Object.keys(miResenia).length > 0;
    }

    const handlePrivacidadChange = (event) => {
        if (event.target.value === 'publica') {
            setPrivacidad('0');
        }
        else if (event.target.value === 'amigos') {
            setPrivacidad('1');
        }
        else if (event.target.value === 'privada') {
            setPrivacidad('2');
        }
    }

    const handleEnviarResenia = async (navigate) => {
        try {
            console.log({ id_libro, comentario, puntuacion: puntuacionGuardada, privacidad });
            const respuesta = await axios.post(
                '/review/post_review',
                JSON.stringify({ id_audiolibro: id_libro, comentario, puntuacion: puntuacionGuardada, visibilidad: privacidad }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(respuesta);
        } catch (error) {
            if (!error.response) {
                console.log('No hay respuesta del servidor');
            } else if (error.response.status === 409) {
                console.log('Ya hay una reseña tuya en este libro');
            } else if (error.response.status === 500) {
                console.log('Error en el servidor');
            } else {
                console.log('Error desconocido');
            }
        }
        navigate('/libro', { state: { id_libro } });
    }
    
    const hayReseniasAmigos = () => {
        return reseniasAmigos && Object.keys(reseniasAmigos).length > 0;
    }

    const hayReseniasComunidad = () => {
        return reseniasComunidad && Object.keys(reseniasComunidad).length > 0;
    }  

    const [puntuacionUsuario, setPuntuacionUsuario] = useState(0);
    const [puntuacionGuardada, setPuntuacionGuardada] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        
    }

    const handleClickPuntuacion = (index) => {
        const nuevaPuntuacion = index + 1;
        setPuntuacionUsuario(nuevaPuntuacion);
        setPuntuacionGuardada(nuevaPuntuacion);
    };

    const handleAutorClick = (id_autor) => {
        navigate('/autor', {state: {id_autor}});
    }
    
    const handleMouseEnter = (index) => {
        setPuntuacionUsuario(index + 1);
    };
    
    const handleMouseLeave = () => {
        setPuntuacionUsuario(puntuacionGuardada);
    };

    const URL_ADD = '/colecciones/anadirAudiolibro';
    const URL_RM = '/colecciones/eliminarAudiolibro';

    const handleClickColeccion = async (coleccion) => {
        const audiolibroId = libro.audiolibro?.id;
        const coleccionId = coleccion.id;
        console.log(coleccion.pertenece);
        if (coleccion.pertenece === false) {
            try {
                const respuesta = await axios.post(URL_ADD, 
                  JSON.stringify({audiolibroId, coleccionId}),
                  {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                  }
                );
                console.log(respuesta); /* Solo desarrollo */
                obtenerDatosLibro();
            } catch (err) {
                if (!err.response) {
                  setErrMsg ('No hay respuesta del servidor');
                } else if (err.response.status === 400) {
                  setErrMsg ('No propietario'); 
                } else {
                  setErrMsg ('Error');
                }
            }
        }
        else {
            try {
                const respuesta = await axios.post(URL_RM, 
                  JSON.stringify({audiolibroId, coleccionId}),
                  {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                  }
                );
                console.log(respuesta); /* Solo desarrollo */
                obtenerDatosLibro();
            } catch (err) {
                if (!err.response) {
                  console.log('No hay respuesta del servidor');
                } else if (err.response.status === 400) {
                  console.log('No propietario'); 
                } else {
                  console.log('Error');
                }
            }
        }
    }

    const [coleccionesFavoritos, setColeccionesFavoritos] = useState([]);
    const [coleccionesEscucharMasTarde, setColeccionesEscucharMasTarde] = useState([]);
    const [otrasColecciones, setOtrasColecciones] = useState([]);

    useEffect(() => {
        setColeccionesFavoritos(colecciones.filter(coleccion => coleccion.titulo === 'Favoritos'));
        setColeccionesEscucharMasTarde(colecciones.filter(coleccion => coleccion.titulo === 'Escuchar mas tarde'));
        setOtrasColecciones(colecciones.filter(coleccion => coleccion.titulo !== 'Favoritos' && coleccion.titulo !== 'Escuchar mas tarde'));
    }, [colecciones]);

    const handleUsuarioClick = (id_user) => {
        navigate('/perfilamigo', { state: { id_user } });
    }

    const handleBorrarResenia = async () => {
        //console.log(id_resenia);
        try {
            const respuesta = await axios.post(
                '/review/delete_review',
                JSON.stringify({ id_review: miResenia.id_resenia }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(respuesta.data);
        } catch (error) {
            if (!error.response) {
                console.log('No hay respuesta del servidor');
            } else if (error.response.status === 403) {
                console.log('No propietario');
            } else if (error.response.status === 404) {
                console.log('La reseña no existe')
            }else if (error.response.status === 500){
                console.log('Server error');
            } else {
                console.log('Error');
            }
        }
    }

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
                <div className="info-anyadir-favoritos" >
                    <button className="info-btnFavoritos"
                        onClick={() => handleClickColeccion(coleccionesFavoritos[0])}>
                        {coleccionesFavoritos[0]?.pertenece ? <>
                            <FontAwesomeIcon icon={solidHeart} />
                            <span>Favoritos</span> 
                        </> : <>
                            <FontAwesomeIcon icon={regularHeart} />
                            <span>Favoritos</span> 
                        </>
                        }
                    </button>
                </div>

                { /* Botón de "Añadir a ver más tarde" */}
                <div className="info-anyadir-ver-mas-tarde">
                    <button className="info-btnVerMasTarde"
                        onClick={() => handleClickColeccion(coleccionesEscucharMasTarde[0])}>
                        {coleccionesEscucharMasTarde[0]?.pertenece ? <>
                            <FontAwesomeIcon icon={faMinus} />
                            <span>Ver mas tarde</span> 
                        </> : <>
                            <FontAwesomeIcon icon={faPlus} />
                            <span>Ver mas tarde</span> 
                        </>}
                    </button>
                </div>

                { /* Botón de añadir a colecciones */}
                <div className="info-anyadir-a-colecciones">
                    <button className='info-btnAnyadirColecciones' onClick={() => setMostrarColecciones(!mostrarColecciones)}>
                        {mostrarColecciones ? 
                            <FontAwesomeIcon icon={faCaretUp} /> : 
                            <FontAwesomeIcon icon={faCaretDown} />
                        }
                        <span>Añadir a colecciones</span>
                    </button>
                    {mostrarColecciones && (
                        <div className="info-desplegable-colecciones">
                            {otrasColecciones?.map((coleccion, index) => (

                                <button className="info-colecciones-item"
                                    key={index}
                                    onClick={() => handleClickColeccion(coleccion)}>
                                    {coleccion?.pertenece ? 
                                        <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />
                                    }
                                    <span>{coleccion.titulo}</span>
                                </button>

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
                    <p>Autor: <span onClick={() => handleAutorClick(autor.id)} className='info-linkAutor'>{autor.nombre}</span></p>
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
                    <div className='capitulos'>
                        {capitulos.map((capitulo, i) => (
                            <div key={i}
                            className='capitulo'
                            onClick={() => handleCapituloClick(capitulos, portada)}>
                                <span>{capitulo.numero}</span>
                                <span>{capitulo.nombre}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Mi puntuación */}
                <div className='info-mi-puntuacion'>
                    <h2>¡Puntúa el libro!</h2>
                    <div className='info-mis-estrellas'>
                        {[...Array(5)].map((_, index) => (
                            <span key={index}
                                className={(index < puntuacionUsuario) ? "info-star-filled" : "info-star-empty"}
                                onClick={() => handleClickPuntuacion(index)}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >&#9733;</span>
                        ))}
                    </div>
                </div>
                {/* Mi reseña */}
                <div>
                    {tienesResenia() ? (
                        <div className='info-miReseniaExiste'>
                            <h2 className='info-miResenia-titulo'>Mi reseña</h2>
                            <h3>
                                <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleBorrarResenia()}/>
                            </h3>
                            <p className="info-texto-resenia">{miResenia.comentario}</p>
                            <h2 className='info-miResenia-puntuacion'>Mi puntuación</h2>
                            <div className='info-estrellas-en-resenias'>
                                {[...Array(5)].map((_, index) => (
                                    <span key={index}
                                        className={(miResenia && typeof miResenia.puntuacion !== 'undefined' &&index < miResenia.puntuacion) ? "info-star-filled" : "info-star-empty"}
                                    >&#9733;</span>
                                ))}
                            </div>
                            <h3>{miResenia.fecha && new Date(miResenia.fecha).toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' })}</h3>
                            <button>Editar reseña</button>
                        </div>
                    ) : (
                        <div className='info-mi-resenia-noExiste'>
                            <h2 className='info-miResenia-titulo'>¡Añade tu reseña y comparte tu opinión!</h2>
                            <form onSubmit={handleSubmit} className='info-anadir-mia'>
                                <select 
                                    className='info-select-privacidad' 
                                    value={privacidad}
                                    onChange={handlePrivacidadChange}
                                    required>
                                    <h3>Selecciona quién quieres que vea tus reseñas.</h3>
                                    <option value=''>Selecciona una opción</option>
                                    <option value='publica'>Pública</option>
                                    <option value='amigos'>Solo amigos</option>
                                    <option value='privada'>Privada</option>
                                </select>
                                <textarea 
                                    className="info-texto-resenia"
                                    value={comentario}
                                    onChange={(event) => setComentario(event.target.value)}
                                    placeholder="Escribe aquí tu reseña"
                                    required
                                />
                            </form>
                            <button className="info-subir-resenia" type="submit" onClick={()=> handleEnviarResenia(navigate)}>Publicar reseña</button>
                        </div>
                    )}
                </div>
                {/* Reseñas de tus amigos y publicas al final*/}
                <div className="info-resenias-amigos">
                    <h2>Reseñas de tus amigos</h2>
                    {hayReseniasAmigos() ? (
                        <div>
                            {reseniasAmigos.map((amigo, index) => (
                                <div key={index} className="info-resenia-amigo">
                                    <h3 onClick={() => handleUsuarioClick(amigo.user_id)}>{amigo.username}</h3>
                                    <p>{amigo.comentario}</p>
                                    <div className='info-estrellas-en-resenias'>
                                        {[...Array(5)].map((_, index) => (
                                            <span key={index}
                                                className={(amigo && typeof amigo.puntuacion !== 'undefined' && index < amigo.puntuacion) ? "info-star-filled" : "info-star-empty"}
                                            >&#9733;</span>
                                        ))}
                                    </div>
                                    <h3>{amigo.fecha &&new Date(amigo.fecha).toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' })}</h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>¡Ninguno de tus amigos ha subido una reseña de este libro todavía!</p>
                    )}
                </div>

                <div className="info-resenias">
                    <h2>Reseñas públicas de la comunidad</h2>
                    {hayReseniasComunidad() ? (
                        <div>
                            {reseniasComunidad.map((usuario, index) => (
                                <div key={index} className="info-resenia-usuario">
                                    <h3 onClick={() => handleUsuarioClick(usuario.user_id)}>{usuario.username}</h3>
                                    <p>{usuario.comentario}</p>
                                    <div className='info-estrellas-en-resenias'>
                                        {[...Array(5)].map((_, index) => (
                                            <span key={index}
                                                className={(usuario && typeof usuario.puntuacion !== 'undefined' &&index < usuario.puntuacion) ? "info-star-filled" : "info-star-empty"}
                                            >&#9733;</span>
                                        ))}
                                    </div>
                                    <h3>{usuario.fecha &&new Date(usuario.fecha).toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' })}</h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>¡Nadie ha subido una reseña de este libro todavía!</p>
                    )}
                </div>
            </div>
            
        </div>  
    );
}

export default Libro;
