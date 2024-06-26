import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './ListaAmigos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import ErrorNoSesion from '../ErrorNoSesion/ErrorNoSesion';

import perro from '../../images/fotos-perfil/perro.jpg';
import gato from '../../images/fotos-perfil/gato.jpg';
import rana from '../../images/fotos-perfil/rana.jpg';
import leon from '../../images/fotos-perfil/leon.jpg';
import pollo from '../../images/fotos-perfil/pollo.jpg';
import vaca from '../../images/fotos-perfil/vaca.jpg';
import buho from '../../images/fotos-perfil/buho.jpg';
import perezoso from '../../images/fotos-perfil/perezoso.jpg';
import doraemon from '../../images/fotos-perfil/doraemon.jpg';
import pikachu from '../../images/fotos-perfil/pikachu.jpg';

const ListaAmigos = ({usuarios, setUsuarios}) => {
    
    const { setRefreshFriends } = useContext(AuthContext);

    const navigate = useNavigate();
    const [listaUsuarios, setListaUsuarios] = useState(usuarios);
    const [listaShow, setListaShow] = useState(usuarios);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        setListaUsuarios(usuarios);
        filtrar(busqueda);
      }, [usuarios]);

    useEffect(() => {
        setUsuarios(listaUsuarios);
        filtrar(busqueda);
      }, [listaUsuarios]);


    const handleChangeBusqueda = (event) => {
        setBusqueda(event.target.value);
        filtrar(event.target.value);
    } 

    const filtrar = (terminoBusqueda) => {
        var resultado = listaUsuarios.filter((usuario) => {
            return usuario.username.toString().toLowerCase().includes(terminoBusqueda.toLowerCase());
        });
        setListaShow(resultado);
    }

    const obtenerFotoPerfil = (numero) => {
        switch(numero) {
            case '0':
                return perro;
                break;
            case '1':
                return gato;
                break;
            case '2':
                return rana;
                break;
            case '3':
                return leon;
                break;
            case '4':
                return pollo;
                break;
            case '5':
                return vaca;
                break;
            case '6':
                return buho;
                break;
            case '7':
                return perezoso;
                break;
            case '8':
                return doraemon;
                break;
            case '9':
                return pikachu;
                break;
        }
    }

    const obtenerEstado = (numero) => {
        switch (numero) {
            case 0:
                return 'Sois amigos'
            case 1:
                return 'Enviar solicitud'
            case 2:
                return 'Cancelar solicitud'
            case 3:
                return 'Aceptar solicitud'
            default:
                return '';
        }
    }

    const enviarSolicitud = async (index) => {
        try {
            const response = await axios.post(
                '/amistad/send',
                { other_id: listaShow[index].id },
                { withCredentials: true } 
            );
            console.log(response.data.message); // Mensaje de éxito
            // Actualizar la lista después de enviar una solicitud
            const updatedAmigos = usuarios.map((amigo, i) => {
                if (usuarios[i] === listaShow[index]) {
                    return { ...amigo, estado: 2 };
                }
                return amigo;
            });
            setListaUsuarios(updatedAmigos);
            filtrar(busqueda);
        } catch (error) {
            if (error.response) {
                console.error(error.response.data.error);
                if (error.response.status === 401) {
                    console.log('No autorizado');
                    return <ErrorNoSesion />
                }
            } else {
                console.error('Error del servidor:', error.message); // Manejar otros errores
            }
        }
    };

    const eliminarAmigo = async (index) => {
        try {
            const response = await axios.post(
                '/amistad/remove',
                { other_id: listaShow[index].id },
                { withCredentials: true }
            );
            console.log(response.data.message); // Mensaje de éxito
            // Actualizar la lista después de eliminar un amigo
            const updatedAmigos = usuarios.map((amigo, i) => {
                if (usuarios[i] === listaShow[index]) {
                    return { ...amigo, estado: 1 };
                }
                return amigo;
            });
            setRefreshFriends(true);
            setListaUsuarios(updatedAmigos);
            filtrar(busqueda);
        } catch (error) {
            if (error.response) {
                console.error(error.response.data.error); // Manejar errores específicos del servidor
                if (error.response.status === 401) {
                    console.log('No autorizado');
                    return <ErrorNoSesion />
                }
            } else {
                console.error('Error del servidor:', error.message); // Manejar otros errores
            }
        }
    };

    const cancelarSolicitud = async (index) => {
        try {
            const response = await axios.post(
                '/amistad/cancel',
                { other_id: listaShow[index].id },
                { withCredentials: true }
            );
            console.log(response.data.message); // Mensaje de éxito
            // Actualizar la lista después de cancelar una solicitud
            const updatedAmigos = usuarios.map((amigo, i) => {
                if (usuarios[i] === listaShow[index]) {
                    return { ...amigo, estado: 1 };
                }
                return amigo;
            });
            setListaUsuarios(updatedAmigos);
            filtrar(busqueda);
        } catch (error) {
            if (error.response) {
                console.error(error.response.data.error); // Manejar errores específicos del servidor
                if (error.response.status === 401) {
                    console.log('No autorizado');
                    return <ErrorNoSesion />
                }
            } else {
                console.error('Error del servidor:', error.message); // Manejar otros errores
            }
        }
    }

    const aceptarSolicitud = async (index) => {
        try {
            const response = await axios.post(
                '/amistad/accept',
                { other_id: usuarios[index].id },
                { withCredentials: true }
            );
            console.log(response.data.message); // Mensaje de éxito
            // Actualizar la lista después de aceptar una solicitud
            const updatedAmigos = usuarios.map((amigo, i) => {
                if (usuarios[i] === listaShow[index]) {
                    return { ...amigo, estado: 0 };
                }
                return amigo;
            });
            setRefreshFriends(true);
            setListaUsuarios(updatedAmigos);
            filtrar(busqueda);
        } catch (error) {
            if (error.response) {
                console.error(error.response.data.error); // Manejar errores específicos del servidor
                if (error.response.status === 401) {
                    console.log('No autorizado');
                    return <ErrorNoSesion />
                }
            } else {
                console.error('Error del servidor:', error.message); // Manejar otros errores
            }
        }
    }

    const rechazarSolicitud = async (index) => {
        try {
            const response = await axios.post(
                '/amistad/reject',
                { other_id: listaShow[index].id },
                { withCredentials: true }
            );
            console.log(response.data.message); // Mensaje de éxito
            // Actualizar la lista después de rechazar una solicitud
            const updatedAmigos = usuarios.map((amigo, i) => {
                if (usuarios[i] === listaShow[index]) {
                    return { ...amigo, estado: 1 };
                }
                return amigo;
            });
            setListaUsuarios(updatedAmigos);
            filtrar(busqueda);
        } catch (error) {
            if (error.response) {
                console.error(error.response.data.error); // Manejar errores específicos del servidor
                if (error.response.status === 401) {
                    console.log('No autorizado');
                    return <ErrorNoSesion />
                }
            } else {
                console.error('Error del servidor:', error.message); // Manejar otros errores
            }
        }
    }

    const handleUsuarioClick = (id_user) => {
        navigate(`/perfilamigo?id=${id_user}`);
    }
    
    return (
        <div className='lista-amigos'>
            <div className='buscador-listaAmigos-container'>
                <input
                    className='buscador-listaAmigos-container-buscador'
                    placeholder='Buscar'
                    value={busqueda}
                    onChange={handleChangeBusqueda}
                />
                <button className='buscador-listaAmigos-container-button-search'>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            <div className='lista'>
                {listaShow.map((usuario, index) => (
                    <div className={'amigo ' + (usuario.estado === 0 ? 'amigo-activo' : '')} key={index}>
                        <div className='amigo-info'>
                            <img className='foto-amigo' onClick={() => handleUsuarioClick(usuario.id)} src={obtenerFotoPerfil(usuario.img)} alt='Foto de perfil'/>
                            <h2 className='nombre-amigo' onClick={() => handleUsuarioClick(usuario.id)}>{usuario.username}</h2>
                        </div>
                        <div className='contenedor-botones'>
                            {usuario.estado === 0 ? (
                                <button className='botonEliminar' onClick={() => eliminarAmigo(index)}>Eliminar amigo</button>
                            ) : null}
                            {usuario.estado === 1 ? (
                                <button className='botonEnviar' onClick={() => enviarSolicitud(index)}> {obtenerEstado(usuario.estado)} </button>
                            ) : null}
                            {usuario.estado === 2 ? (
                                <button className='botonCancelar' onClick={() => cancelarSolicitud(index)}> {obtenerEstado(usuario.estado)} </button>
                            ) : null}
                            {usuario.estado === 3 ? (
                                <div className='dos-botones'>
                                    <button className='botonAceptar' onClick={() => aceptarSolicitud(index)}>Aceptar solicitud</button>
                                    <button className='botonRechazar' onClick={() => rechazarSolicitud(index)}>Rechazar solicitud</button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );        
}

export default ListaAmigos;
