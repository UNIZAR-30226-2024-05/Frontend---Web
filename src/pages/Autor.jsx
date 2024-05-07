import React, { useState, useEffect, useContext } from 'react';
import './Autor.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import DropdownButton from '../components/DropdownButton/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../context/AuthProvider';


const Autor = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const { role } = auth;
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

    const handleClickLibro = (id_libro) => {
        navigate(`/libro?id=${id_libro}`);
    }

    const [editNombre, setEditNombre] = useState(false);
    const [nombreNuevo, setNombreNuevo] = useState('');
    const [editInformacion, setEditInformacion] = useState(false);
    const [informacionNueva, setInformacionNueva] = useState('');
    const [editCiudad, setEditCiudad] = useState(false);
    const [ciudadNueva, setCiudadNueva] = useState('');

    const handleEditNombre = () => {
        setEditNombre(!editNombre);
    }

    const handleEditInformacion = () => {
        setEditInformacion(!editInformacion);
    }

    const handleEditCiudad = () => {
        setEditCiudad(!editCiudad);
    }

    const handleEditarDatos = async () => {
        console.log({nombreNuevo, informacionNueva, ciudadNueva});
        if (!nombreNuevo) {
            setNombreNuevo(nombreAutor);
        }
        if (!informacionNueva) {
            setInformacionNueva(textoInformacionAutor);
        }
        if (!ciudadNueva) {
            setCiudadNueva(ciudadNacimientoAutor);
        }
        console.log({nombreNuevo, informacionNueva, ciudadNueva});
        try {
            const response = await axios.post(
                `/autores/update`, 
                JSON.stringify({
                id: id_autor,
                nombre: nombreNuevo,
                informacion: informacionNueva,
                ciudadnacimiento: ciudadNueva
            }),
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log(response.data);
            setNombreAutor(nombreNuevo);
            setTextoInformacionAutor(informacionNueva);
            setCiudadNacimientoAutor(ciudadNueva);
            setEditNombre(false);
            setEditInformacion(false);
            setEditCiudad(false);
        }
        catch(error) {
            if (!error.response) {
                console.error('No hay respuesta del servidor');
            } else if (error.response.status === 404) {
                console.error('No existe el autor');
            } else if (error.response.status === 409) {
                console.error('Estas modificando el nombre a un autor ya existente');
            } else if (error.response.status === 500) {
                console.error('Error del servidor');
            }
            else {
                console.error('Error desconocido');
            }
        }
    }

    const estasSeguro = () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este autor? Se borrarán TODOS sus libros')) {
            handleEliminarAutor();
        }
    }

    const handleEliminarAutor = async () => {
        try {
            const response = await axios.post(
                'autores/delete', JSON.stringify({id: id_autor}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response.data);
            navigate('/');
        }
        catch(error) {
            if (!error.response) {
                console.error('No hay respuesta del servidor');
            } else if (error.response.status === 404) {
                console.error('No existe el autor');
            } else if (error.response.status === 500) {
                console.error('Error del servidor');
            }
            else {
                console.error('Error desconocido');
            }
        }
    }

    return (
        <div className="autor-container">
            <div className="autor-arriba">
                <div className="autor-arriba-derecha">
                    <div className='autor-nombre'>
                        <h1>{nombreAutor}{role === 'admin' && (<FontAwesomeIcon icon={faEdit} onClick={() => handleEditNombre()} className='libro-editButton'/>)}</h1>
                        {role === 'admin' && editNombre && (
                            <>
                                <h3>Introduzca el nuevo nombre</h3>
                                <input
                                    placeholder='Nuevo nombre'
                                    value={nombreNuevo}
                                    onChange={(event) => setNombreNuevo(event.target.value)}
                                />
                            </>
                        )}
                    </div>
                    <div className='autor-informacion'>
                        <p>{textoInformacionAutor} {role === 'admin' && (<FontAwesomeIcon icon={faEdit} onClick={() => handleEditInformacion()} className='libro-editButton'/>)}</p>
                        {role === 'admin' && editInformacion && (
                            <>
                                <h3>Introduzca la nueva información</h3>
                                <input
                                    placeholder='Nueva información'
                                    value={informacionNueva}
                                    onChange={(event) => setInformacionNueva(event.target.value)}
                                />
                            </>
                        
                        )}
                    </div>
                    <div className='autor-ciudad-nacimiento'>
                        <p>Ciudad de nacimiento: {ciudadNacimientoAutor}{role === 'admin' && (<FontAwesomeIcon icon={faEdit} onClick={() => handleEditCiudad()} className='libro-editButton'/>)}</p>
                        {role === 'admin' && editCiudad && (
                            <>
                                <h3>Introduzca la nueva ciudad de nacimiento</h3>
                                <input
                                    placeholder='Nueva ciudad de nacimiento'
                                    value={ciudadNueva}
                                    onChange={(event) => setCiudadNueva(event.target.value)}
                                />
                            </>
                        )}
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
                                <p className='autor-audiolibro-titulo' onClick={() => handleClickLibro(audiolibro.id)}>{audiolibro.titulo}</p>
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
                {role === 'admin' && (<button className='libro-admin-guardar-cambios' onClick={() => handleEditarDatos()}> Guardar cambios</button> )}
                {role === 'admin' && (<button className='libro-admin-eliminar-autor'onClick={() => estasSeguro()}></button> )}
            </div>
        </div>
    )
}

export default Autor;