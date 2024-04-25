import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './ListaAmigos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Cookie from 'js-cookie';


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

const ListaAmigos = ({usuarios}) => {
    
        const navigate = useNavigate();


        const [listaUsuarios, setListaUsuarios] = useState(usuarios);
        const [busqueda, setBusqueda] = useState('');
    
    
        const handleChangeBusqueda = (event) => {
            setBusqueda(event.target.value);
            filtrar(event.target.value);
        } 

        

        const filtrar = (terminoBusqueda) => {
            var resultado = listaUsuarios.filter((usuario) => {
                return usuario.username.toString().toLowerCase().includes(terminoBusqueda.toLowerCase());
            });
            setListaUsuarios(resultado);
        }

        const obtenerFotoPerfil = (numero) => {
            switch (numero) {
                case 0:
                    return perro;
                case 1:
                    return gato;
                case 2:
                    return rana;
                case 3:
                    return leon;
                case 4:
                    return pollo;
                case 5:
                    return vaca;
                case 6:
                    return buho;
                case 7:
                    return perezoso;
                case 8:
                    return doraemon;
                case 9:
                    return pikachu;
            }
        }

        const obtenerEstado = (numero) => {
            switch (numero) {
                case 0:
                    return 'Sois amigos'
                case 1:
                    return 'Enviar solicitud'
                case 2:
                    return 'Solictud enviada'
                case 3:
                    return 'Aceptar solicitud'
            }
        }

        const enviarSolicitud = async index => {
            try {
                const response = await axios.post(
                    '/amistad/send',
                    { other_id: usuarios[index].id },
                    { withCredentials: true } 
                );
                console.log(response.data.message); // Mensaje de éxito
                // Actualizar la lista después de enviar una solicitud
                const updatedAmigos = usuarios.map((amigo, i) => {
                    if (i === index) {
                        return { ...amigo, estado: 2 };
                    }
                    return amigo;
                });
                setListaUsuarios(updatedAmigos);
            } catch (error) {
                if (error.response) {
                    console.error(error.response.data.error); // Manejar errores específicos del servidor
                } else {
                    console.error('Error del servidor:', error.message); // Manejar otros errores
                }
            }
        };

        const eliminarAmigo = async index => {
            try {
                const response = await axios.post(
                    '/amistad/remove',
                    { other_id: usuarios[index].id },
                    { withCredentials: true }
                );
                console.log(response.data.message); // Mensaje de éxito
                // Actualizar la lista después de eliminar un amigo
                const updatedAmigos = usuarios.filter((amigo, i) => i !== index);
                setListaUsuarios(updatedAmigos);
            } catch (error) {
                if (error.response) {
                    console.error(error.response.data.error); // Manejar errores específicos del servidor
                } else {
                    console.error('Error del servidor:', error.message); // Manejar otros errores
                }
            }
        };

        const cancelarSolicitud = async index => {
            try {
                const response = await axios.post(
                    '/amistad/cancel',
                    { other_id: usuarios[index].id },
                    { withCredentials: true }
                );
                console.log(response.data.message); // Mensaje de éxito
                // Actualizar la lista después de cancelar una solicitud
                const updatedAmigos = usuarios.map((amigo, i) => {
                    if (i === index) {
                        return { ...amigo, estado: 1 };
                    }
                    return amigo;
                });
                setListaUsuarios(updatedAmigos);
            } catch (error) {
                if (error.response) {
                    console.error(error.response.data.error); // Manejar errores específicos del servidor
                } else {
                    console.error('Error del servidor:', error.message); // Manejar otros errores
                }
            }
        }

        const aceptarSolicitud = async index => {
            try {
                const response = await axios.post(
                    '/amistad/accept',
                    { other_id: usuarios[index].id },
                    { withCredentials: true }
                );
                console.log(response.data.message); // Mensaje de éxito
                // Actualizar la lista después de aceptar una solicitud
                const updatedAmigos = usuarios.map((amigo, i) => {
                    if (i === index) {
                        return { ...amigo, estado: 0 };
                    }
                    return amigo;
                });
                setListaUsuarios(updatedAmigos);
            } catch (error) {
                if (error.response) {
                    console.error(error.response.data.error); // Manejar errores específicos del servidor
                } else {
                    console.error('Error del servidor:', error.message); // Manejar otros errores
                }
            }
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
                    {listaUsuarios.map((usuario, index) => (
                        <div className='amigo' key={index}>
                            <div className='amigo-info'>
                                <a href='/perfilamigo' className='link-amigo'><img className='foto-amigo' src={obtenerFotoPerfil(usuario.img)} alt='Foto de perfil' /></a>
                                <h2 className='nombre-amigo'><a href='/perfilamigo' className='link-amigo'>{usuario.username}</a></h2>
                                {usuario.estado === 0 ? (
                                    <button onClick={() => eliminarAmigo(index)}>Eliminar amigo</button>
                                ) : null}
                                {usuario.estado === 1 ? (
                                    <button onClick={() => enviarSolicitud(index)}> {obtenerEstado(usuario.estado)} </button>
                                ) : null}
                                {usuario.estado === 2 ? (
                                    <button onClick={() => cancelarSolicitud(index)}> {obtenerEstado(usuario.estado)} </button>
                                ) : null}
                                {usuario.estado === 3 ? (
                                    <div>
                                        <button onClick={() => aceptarSolicitud(index)}>Aceptar solicitud</button>
                                        <button onClick={() => rechazarSolicitud(index)}>Rechazar solicitud</button>
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
