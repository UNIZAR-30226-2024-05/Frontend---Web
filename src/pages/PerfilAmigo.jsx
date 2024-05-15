import React, { useState, useEffect } from 'react';
import './PerfilAmigo.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer.jsx';
import ErrorNoSesion from '../components/ErrorNoSesion/ErrorNoSesion.jsx';

import ListaColeccionesAmigo from '../components/ListaColeccionesPerfilAmigo/ListaColeccionesAmigo.jsx';
import axios from '../api/axios.jsx';

import perro from '../images/fotos-perfil/perro.jpg';
import gato from '../images/fotos-perfil/gato.jpg';
import rana from '../images/fotos-perfil/rana.jpg';
import leon from '../images/fotos-perfil/leon.jpg';
import pollo from '../images/fotos-perfil/pollo.jpg';
import vaca from '../images/fotos-perfil/vaca.jpg';
import buho from '../images/fotos-perfil/buho.jpg';
import perezoso from '../images/fotos-perfil/perezoso.jpg';
import doraemon from '../images/fotos-perfil/doraemon.jpg';
import pikachu from '../images/fotos-perfil/pikachu.jpg';

const PerfilAmigo = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const id_user = new URLSearchParams(location.search).get('id');

    const [perfil, setPerfil] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [img, setImg] = useState(null);
    const [colecciones, setColecciones] = useState([]);
    const [estado, setEstado] = useState([]);
    const [ultimaActividad, setUltimaActividad] = useState('');
    const [idUltimaActividad, setIdUltimaActividad] = useState(0);
    const [portadaUltimaActividad, setPortadaUltimaActividad] = useState(null);
    const [tituloUltimaActividad, setTituloUltimaActividad] = useState('');
    const [fechaUltimaActividad, setFechaUltimaActividad] = useState(null);
    const [solicitudEnviada, setSolicitudEnviada] = useState(false);

    useEffect(() => {

        const URL_PERFIL = `/users/${id_user}`; 
        async function fetchPerfil(){
            try {
                const response = await axios.get(URL_PERFIL, {withCredentials: true});
                console.log('Respuesta del servidor:', response.data);
                console.log('Colecciones:', response.data.colecciones);
                console.log('Última actividad:', response.data.ultimo);
                // Actualiza el estado de los libros con los datos de los audiolibros recibidos
                setPerfil(response.data);
                setUsuario(response.data.username);
                setImg(response.data.img);
                setColecciones(response.data.colecciones);
                setEstado(response.data.estado);

                if (response.data.ultimo) {
                    setUltimaActividad(response.data.ultimo);
                    setIdUltimaActividad(response.data.ultimo.id)
                    setPortadaUltimaActividad(response.data.ultimo.img);
                    setTituloUltimaActividad(response.data.ultimo.titulo);
                    setFechaUltimaActividad(response.data.ultimo.fecha);
                }
            } catch (err) {
                if (err.response.status === 401) {
                    console.log('No autorizado');
                    return <ErrorNoSesion/>
                } else if (err.response.status === 500) {
                    console.log('Server Error');
                } else {
                    console.log('Fallo en la carga del perfil del usuario');
                }
            }
        };

        if (id_user) {
            fetchPerfil();
        } else {
            console.log('No se ha pasado ningún usuario');
            navigate('/');
        }
    }, []); // La dependencia vacía [] asegura que este efecto se ejecute solo una vez al montar el componente
    
    const botonSolicitud = () => {
        if (estado === 0) {
            return (
                <button className="amigo-somos-amigos" onClick={eliminarAmistad}>
                    {solicitudEnviada ? 'Añadir amigo' : 'Somos amigos'}
                </button>
            );
        } else if (estado === 1) {
            return (
                <button className='amigo-boton-solicitud' onClick={enviarSolicitud}>
                    {solicitudEnviada ? 'Cancelar solicitud' : 'Añadir amigo'}
                </button>
            );
        } else if (estado === 2) {
            return (
                <button className='amigo-boton-solicitud' onClick={enviarSolicitud}>
                    {solicitudEnviada ? 'Cancelar solicitud' : 'Añadir amigo'}
                </button>
            );
        } else if (estado === 3) {
            return (
                <button className='amigo-boton-solicitud' onClick={enviarSolicitud}>
                    {solicitudEnviada ? 'Cancelar solicitud' : 'Añadir amigo'}
                </button>
            );
        }
    }

    const obtenerFotoPerfil = (numero) => {
        console.log(numero);
        switch(numero) {
            case '0':
                return perro;
            case '1':
                return gato;
            case '2':
                return rana;
            case '3':
                return leon;
            case '4':
                return pollo;
            case '5':
                return vaca;
            case '6':
                return buho;
            case '7':
                return perezoso;
            case '8':
                return doraemon;
            case '9':
                return pikachu;
            default:
                return '';
        }
    }

    const enviarSolicitud = async () => {
        try {
            // Si la solicitud está enviada, se cancela, de lo contrario se envía una solicitud nueva
            if (solicitudEnviada) {
                // Lógica para cancelar la solicitud
                const response = await axios.post(
                    '/amistad/cancel',
                    { other_id: id_user }, 
                    { withCredentials: true }
                );
                console.log(response.data.message); // Mensaje de éxito al cancelar la solicitud
                setSolicitudEnviada(false);
            } else {
                // Lógica para enviar la solicitud
                const response = await axios.post(
                    '/amistad/send',
                    { other_id: id_user },
                    { withCredentials: true } 
                );
                console.log(response.data.message); // Mensaje de éxito al enviar la solicitud
                setSolicitudEnviada(true);
            }
            // Actualiza el estado de la solicitud enviada

        } catch (error) {
            if (error.response) {
                console.error(error.response.data.error); // Manejar errores específicos del servidor
            } else {
                console.error('Error del servidor:', error.message); // Manejar otros errores
            }
        }
    };

    const handleClickLibro = (id_libro) => {
        navigate(`/libro?id=${id_libro}`);
    }

    const eliminarAmistad = async () => {
        try {
            // Lógica para cancelar la amistad
            const response = await axios.post(
                '/amistad/remove',
                { other_id: id_user }, 
                { withCredentials: true }
            );
            console.log(response.data.message); // Mensaje de éxito al cancelar la amistad
            // Actualiza el estado de la solicitud enviada
            setSolicitudEnviada(false);
        } catch (error) {
            if (error.response) {
                console.error(error.response.data.error); // Manejar errores específicos del servidor
            } else if (error.response.data.error === 409) {
                console.error('No puedes eliminar una amistad con un usuario al que no sigues');
            }
            else {
                console.error('Error del servidor:', error.message); // Manejar otros errores
            }
        }
    };
    

    return (
        <>
        <div className="amigo-perfil-usuario">
            <div className="amigo-foto-perfil">
                <img src={obtenerFotoPerfil(img)} alt="Foto de perfil" />
            </div>
            <div className="amigo-info-usuario">
                <h2>{usuario}</h2>
                {botonSolicitud()}                
                <div className="amigo-colecciones-y-actividad">
                    {colecciones && (
                        <div className="amigo-colecciones">
                            <h3 className="colecciones-usuario">Colecciones de {usuario}</h3>
                            <ListaColeccionesAmigo className='list' colecciones={colecciones}></ListaColeccionesAmigo>
                        </div>
                    )}
                    {estado === 0 ? (
                        ultimaActividad ? (
                            <div className="amigo-ultima-actividad">
                                <h3>Última actividad</h3>
                                <div className="amigo-actividad">
                                    <img className='amigo-foto-link-libro' onClick={handleClickLibro(idUltimaActividad)} src={portadaUltimaActividad} alt="Portada" />
                                    <div className="amigo-actividad-info">
                                        <p className='amigo-click-libro' onClick={handleClickLibro(idUltimaActividad)}>{tituloUltimaActividad}</p>
                                        <p>{fechaUltimaActividad}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="amigo-ultima-actividad">
                                <h3>Última actividad</h3>
                                <p>No hay actividad reciente</p>
                            </div>
                        )
                    ) : (
                        <div className="amigo-ultima-actividad">
                            <h3>Última actividad</h3>
                            <p>No puedes ver la actividad de un usuario al que no sigues</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default PerfilAmigo;
