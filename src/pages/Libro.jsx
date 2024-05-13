import React, { useState, useEffect, useContext } from 'react';
import './Libro.css'; 
import foto1 from '../images/1.png';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import Footer from '../components/Footer/Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faPlay, faEdit, faTrash, faCaretUp, faCaretDown, faHeart as solidHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import axios from '../api/axios';

const Libro = () => {

    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const { role } = auth;

    const location = useLocation();
    const id_libro = new URLSearchParams(location.search).get('id');
    const [libro, setLibro] = useState();

    const [titulo, setTitulo] = useState('Titulo');
    const [descripcion, setDescripcion] = useState('Aquí está la descripción.');
    const [puntuacion, setPuntuacion] = useState(0);
    const [autor, setAutor] = useState({nombre: 'Anónimo', id: 1});
    const [generos, setGeneros] = useState([]);
    const [portada, setPortada] = useState(foto1);
    const [colecciones, setColecciones] = useState([]);
    const [miResenia, setMiResenia] = useState([]);
    const [miReseniaId, setMiReseniaId] = useState('');
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
            setMiReseniaId(response.data.own_review.id);
            setReseniasAmigos(response.data.friends_reviews);
            setReseniasComunidad(response.data.public_reviews);
            console.log(response.data);
        })
        .catch(error => {
            // Maneja los errores si ocurrieron
            console.error('Hubo un error al obtener el audiolibro:', error);
        });
    };

    const handleCapituloClick = (capitulos, portada, numCap) => {
        const params = new URLSearchParams();
        params.append('capitulos', JSON.stringify(capitulos));
        params.append('portada', portada);
        params.append('cap', numCap);
        navigate(`/player?${params.toString()}`);
    };

    console.log(libro);
    const estrellasLlenas = Math.floor(puntuacion);
    const estrellasMedias = puntuacion - estrellasLlenas >= 0.5 ? 1 : 0;
    const estrellasVacias = 5 - estrellasLlenas - estrellasMedias;

    const generarEnlaceAmazon = (titulo) => {
        // Reemplazar espacios en blanco con "+" para la URL
        const tituloFormateado = titulo.replace(/\s/g, '+');
        const autorFormateado = autor.nombre.replace(/\s/g, '+');
        // URL base de búsqueda en Amazon
        const urlBase = 'https://www.amazon.es/s?k=';
        // Generar el enlace completo
        const enlaceAmazon = `${urlBase}${tituloFormateado}${autorFormateado}`;
        return enlaceAmazon;
    };

    const [mostrarColecciones, setMostrarColecciones] = useState(false);

    const tienesResenia = () => {
        return miResenia && Object.keys(miResenia).length > 0;
    }

    const handlePrivacidadChange = (event) => {
        if (event.target.value === '0') {
            setPrivacidad('0');
        }
        else if (event.target.value === '1') {
            setPrivacidad('1');
        }
        else if (event.target.value === '2') {
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
        navigate(`/libro?id=${id_libro}`);
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
        navigate(`/autor?id=${id_autor}`);
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
        navigate(`/perfilamigo?id=${id_user}`);
    }

    const handleBorrarResenia = async (navigate) => {
        console.log(miReseniaId);
        try {
            const respuesta = await axios.post(
                '/review/delete_review',
                JSON.stringify({ id_review: miReseniaId }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(respuesta);
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
        navigate(`/libro?id=${id_libro}`);
    }

    const [modoEdicion, setModoEdicion] = useState(false);

    const handleEditarResenia = () => {
        console.log({ id_libro, comentario, puntuacion: puntuacionGuardada, privacidad });
        try {
            const respuesta = axios.post(
                '/review/edit_review',
                JSON.stringify({ id_review: miResenia.id, comentario, puntuacion: puntuacionGuardada, visibilidad: privacidad }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(respuesta);
        }
        catch (error) {
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

    const [modoEdicionFoto, setModoEdicionFoto] = useState(false);
    const [nuevaPortada, setNuevaPortada] = useState('');
    const [modoEdicionTitulo, setModoEdicionTitulo] = useState(false);
    const [nuevoTitulo, setNuevoTitulo] = useState('');
    const [modoEdicionDescripcion, setModoEdicionDescripcion] = useState(false);
    const [nuevaDescripcion, setNuevaDescripcion] = useState('');
    const [modoEdicionAutor, setModoEdicionAutor] = useState(false);
    const [nuevoAutor, setNuevoAutor] = useState('');
    const [modoEdicionGenero, setModoEdicionGenero] = useState(false);
    const [nuevoGenero, setNuevoGenero] = useState('');
    const [modoEdicionCapitulos, setModoEdicionCapitulos] = useState(false);
    const [nuevosCapitulos, setNuevosCapitulos] = useState([]);

    const handleEditPhoto = () => {
        setModoEdicionFoto(!modoEdicionFoto);
    }

    const handleImagenChange = (event) => {
        const file = event.target.files[0];
        setNuevaPortada(file);
    }

    const handleEditTitulo = () => {
        setModoEdicionTitulo(!modoEdicionTitulo);
    }

    const handleEditDescripcion = () => {
        setModoEdicionDescripcion(!modoEdicionDescripcion);
    }

    const handleEditAutor = () => {
        setModoEdicionAutor(!modoEdicionAutor);
    }

    const handleEditGenero = () => {
        setModoEdicionGenero(!modoEdicionGenero);
    }

    const handleEditCapitulos = () => {
        setModoEdicionCapitulos(!modoEdicionCapitulos);
    }

    const handleAudiosChange = (event) => {
        console.log(event.target.files);
        setNuevosCapitulos(event.target.files);
    }

    const handleEliminarCapitulo = (capitulo) => {
        const nuevosCapitulosActualizados = capitulosExistentes.filter(c => c !== capitulo);
        setCapitulosExistentes(nuevosCapitulosActualizados);
    }
    

    const handleGuardarCambios = async () => {
        console.log({ id_libro, nuevoTitulo, nuevoAutor, nuevaDescripcion, nuevoGenero, nuevaPortada, nuevosCapitulos });
        
            const formData = new FormData();
            formData.append('audiolibroId', id_libro);

            if (!nuevoTitulo) {
                formData.append('titulo', titulo);
            }
            else {
                formData.append('titulo', nuevoTitulo);
            }

            if (!nuevoAutor) {
                formData.append('autor', autor.nombre);
            }
            else {          
                formData.append('autor', nuevoAutor);
            }

            if (!nuevaDescripcion) {
                formData.append('descripcion', descripcion);
            }
            else {            
                formData.append('descripcion', nuevaDescripcion);
            }

            if (!nuevoGenero) {
                formData.append('genero', generos[0].nombre);
            }
            else {
                formData.append('genero', nuevoGenero);
            }

            if (!nuevaPortada) {
                formData.append('image', portada);
            }
            else {
                formData.append('image', nuevaPortada);
            }

                   
            
            if (Array.isArray(nuevosCapitulos)) {
                nuevosCapitulos.forEach(audio => {
                    formData.append('audios', audio);
                });
            } else {
                console.log('nuevosCapitulos no es una matriz válida');
            }
            

            console.log({ formData });
        try {    
            const respuesta = await axios.post(
                '/audiolibros/actualizar', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true   
            });
            console.log(respuesta);
        } catch (error) {
            if (!error.response) {
                console.log('No hay respuesta del servidor');
            } else if (error.response.status === 409) {
                console.log('El audiolibro no existe');
            } else if (error.response.status === 500) {
                console.log('Error del servidor')
            } else {
                console.log('Error');
            }
        }
    }

    const handleBorrarLibro = async () => {
        try {
            const respuesta = await axios.post(
                '/audiolibros/eliminar',
                JSON.stringify({ audiolibroId: id_libro }),
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
                console.log('El audiolibro no existe')
            }else if (error.response.status === 500){
                console.log('Server error');
            } else {
                console.log('Error');
            }
        }
        navigate('/');
    }

    const estasSeguro = () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este libro? ')) {
            handleBorrarLibro();
        }
    }

    return (
        <>
        <div className='info-libro'>
            {/* Portada del libro a la izquierda */}
            <div className="info-portada">
                <img src={portada} alt="Portada del libro" />
                {role === 'admin' && (<FontAwesomeIcon icon={faEdit} onClick={() => handleEditPhoto()} className='libro-editButton'/>)}
                {role === 'admin' && modoEdicionFoto && (
                    <>
                    <h3>Introduce la imagen de la portada</h3>
                    <input
                        type="file"
                        className='libro-editar-imagen'
                        onChange={(event) => handleImagenChange(event)}    
                    />
                    </>
                )}
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

                {role === 'normal' && (
                    <>

                    {/* Enlace a Amazon debajo de la portada */}
                    <div className="info-enlace-amazon">
                        <a href={generarEnlaceAmazon(titulo)} className="info-linkCompra" target="_blank" rel="noopener noreferrer">Comprar en Amazon</a>
                    </div>

                    { /* Botón de "Reproducir" con icono de play */}
                    <div className="info-reproducir">
                        <div className="info-linkReproducir"
                        onClick={() => handleCapituloClick(capitulos, portada, 0)}>
                            <FontAwesomeIcon icon={faPlay} /> Escuchar audiolibro
                        </div>
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
                    </>
                )}
            </div>

            {/* Detalles del libro a la derecha */}
            <div className="info-detalles">
                {/* Título del libro */}
                <div className='info-titulo'>
                    <h1>{titulo} {role === 'admin' && (<FontAwesomeIcon icon={faEdit} onClick={() => handleEditTitulo()} className='libro-editButton'/>)}</h1>
                    {role === 'admin' && modoEdicionTitulo && (
                        <>
                        <h3>Introduce el nuevo título</h3>
                        <input
                            type="text"
                            className='libro-editar-titulo'
                            value={nuevoTitulo}
                            onChange={(event) => setNuevoTitulo(event.target.value)}
                        />
                        </>
                    )}
                </div>
                
                {/* Descripción del libro */}
                <div className='info-descripcion'>
                    <p>{descripcion} {role === 'admin' && (<FontAwesomeIcon icon={faEdit} onClick={() => handleEditDescripcion()} className='libro-editButton'/>)}</p>
                    {role === 'admin' && modoEdicionDescripcion && (
                        <>
                        <h3>Introduce la nueva descripción</h3>
                        <textarea
                            value={nuevaDescripcion}
                            className='libro-editar-descripcion'
                            onChange={(event) => setNuevaDescripcion(event.target.value)}
                        />
                        </>
                    )}
                </div>
                
                {/* Autor del libro */}
                <div className="info-autor">
                    <p>Autor: <span onClick={() => handleAutorClick(autor.id)} className='info-linkAutor'>{autor.nombre}</span> {role === 'admin' && (<FontAwesomeIcon icon={faEdit} onClick={() => handleEditAutor()} className='libro-editButton'/>)}</p>
                    {role === 'admin' && modoEdicionAutor && (
                        <>
                        <h3>Introduce el nuevo autor</h3>
                        <input
                            type="text"
                            className='libro-editar-autor'
                            value={nuevoAutor}
                            onChange={(event) => setNuevoAutor(event.target.value)}
                        />
                        </>
                    )}
                </div>

                {/* Género del libro */}
                <div className="info-genero">
                    <p>{generos.length <= 1 ? 'Género: ' : 'Géneros: '}
                    {role === 'admin' && modoEdicionGenero && (
                        <>
                        <h3>Introduce el nuevo género</h3>
                        <input
                            type="text"
                            className='libro-editar-genero'
                            value={nuevoGenero}
                            onChange={(event) => setNuevoGenero(event.target.value)}
                        />
                        </>
                    )}
                    {generos.map((genero, i) => 
                    <span key={i}>{genero.nombre}{i !== generos.length - 1 ? ', ' : ''}</span>
                    )}{role === 'admin' && (<FontAwesomeIcon icon={faEdit} onClick={() => handleEditGenero()} className='libro-editButton'/>)}</p>
                </div>

                {/* Capitulos del libro */ }
                <div className="info-capitulos">
                    <h2 className="tituloCap"> Capítulos {role === 'admin' && (<FontAwesomeIcon icon={faEdit} onClick={() => handleEditCapitulos()} className='libro-editButton'/>)}</h2>
                    {role === 'admin' && modoEdicionCapitulos && (
                        <>
                        <h3>Introduce los nuevos capítulos</h3>
                        <input
                            type="file"
                            className='libro-editar-capitulos'
                            multiple
                            onChange={handleAudiosChange}
                        />
                        </>
                    )}
                    <div className='capitulos'>
                        {capitulos.map((capitulo, i) => (
                            <div key={i}
                            className='capitulo'
                            onClick={() => handleCapituloClick(capitulos, portada, i)}>
                                <span>{capitulo.numero}</span>
                                <span>{capitulo.nombre}</span>
                                {role === 'admin' && modoEdicionCapitulos && (
                                    <button onClick={() => handleEliminarCapitulo(capitulo)}>Eliminar</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Mi puntuación */}
                {role === 'normal' && (

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
                )}
                {/* Mi reseña */}
                {role === 'normal' && (
                    <div>
                        {tienesResenia() ? (
                            !modoEdicion ? (
                                <div className='info-miReseniaExiste'>
                                    <h2 className='info-miResenia-titulo'>Mi reseña <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleBorrarResenia(navigate)} className='borrar-resenia'/></h2>
                                    <p className="info-texto-resenia">{miResenia.comentario}</p>
                                    <h2 className='info-miResenia-puntuacion'>Mi puntuación</h2>
                                    <div className='info-estrellas-en-resenias'>
                                        {[...Array(5)].map((_, index) => (
                                            <span key={index}
                                                className={(miResenia && typeof miResenia.puntuacion !== 'undefined' && index < miResenia.puntuacion) ? "info-star-filled" : "info-star-empty"}
                                            >&#9733;</span>
                                        ))}
                                    </div>
                                    <h3>{miResenia.fecha && new Date(miResenia.fecha).toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' })}</h3>
                                    <button onClick={() => setModoEdicion(true)} className='boton-editar-resenia'>Editar reseña</button>
                                </div>
                            ) : (
                                <div className='info-editarResenia'>
                                    <h2>Editar mi reseña</h2>
                                    <form onSubmit={handleSubmit} className='info-anadir-mia'>
                                        <select
                                            className='info-select-privacidad'
                                            value={privacidad}
                                            onChange={handlePrivacidadChange}
                                            required
                                        >
                                            <option value=''>Selecciona una opción</option>
                                            <option value='0'>Pública</option>
                                            <option value='1'>Solo amigos</option>
                                            <option value='2'>Privada</option>
                                        </select>
                                        <textarea
                                            className="info-texto-resenia"
                                            value={comentario}
                                            onChange={(event) => setComentario(event.target.value)}
                                            placeholder="Escribe aquí tu reseña"
                                            required
                                        />
                                        <button className="info-subir-resenia" type="submit" onClick={() => handleEditarResenia()}>Guardar cambios</button>
                                    </form>
                                </div>
                            )
                        ) : (
                            <div className='info-mi-resenia-noExiste'>
                                <h2 className='info-miResenia-titulo'>¡Añade tu reseña y comparte tu opinión!</h2>
                                <form onSubmit={handleSubmit} className='info-anadir-mia'>
                                    <select
                                        className='info-select-privacidad'
                                        value={privacidad}
                                        onChange={handlePrivacidadChange}
                                        required
                                    >
                                        <option value=''>Selecciona una opción</option>
                                        <option value='0'>Pública</option>
                                        <option value='1'>Solo amigos</option>
                                        <option value='2'>Privada</option>
                                    </select>
                                    <textarea
                                        className="info-texto-resenia"
                                        value={comentario}
                                        onChange={(event) => setComentario(event.target.value)}
                                        placeholder="Escribe aquí tu reseña"
                                        required
                                    />
                                </form>
                                <button className="info-subir-resenia" type="submit" onClick={() => handleEnviarResenia(navigate)}>Publicar reseña</button>
                            </div>
                        )}
                    </div>
                )}


                {/* Reseñas de tus amigos y publicas al final*/}
                {role === 'normal' && (
                    <div className="info-resenias-amigos">
                        <h2>Reseñas de tus amigos</h2>
                        {hayReseniasAmigos() ? (
                            <div>
                                {reseniasAmigos.map((amigo, index) => (
                                    <div key={index} className="info-resenia-amigo">
                                        <h3 onClick={() => handleUsuarioClick(amigo.user_id)} className='link-usuario'>{amigo.username}</h3>
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
                )}

                <div className="info-resenias">
                    <h2>Reseñas públicas de la comunidad</h2>
                    {hayReseniasComunidad() ? (
                        <div>
                            {reseniasComunidad.map((usuario, index) => (
                                <div key={index} className="info-resenia-usuario">
                                    <h3 onClick={() => handleUsuarioClick(usuario.user_id)} className='link-usuario'>{usuario.username}</h3>
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
                {role === 'admin' && (<button className='libro-admin-guardar-cambios' onClick={() => handleGuardarCambios()}> Guardar cambios</button> )}
                {role === 'admin' && (
                    <button className='libro-admin-eliminar-libro' onClick={() => estasSeguro()}>
                        <FontAwesomeIcon icon={faTrash} /> Eliminar libro
                    </button>
                )}
            </div>
        </div>  
        <Footer/>
        </>
    );
}

export default Libro;
