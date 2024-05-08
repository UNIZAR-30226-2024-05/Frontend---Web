import React, { useState, useEffect } from 'react';
import './PerfilAmigo.css';
import { useLocation, useNavigate } from 'react-router-dom';

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
                if (response.data.colecciones) {
                    setColecciones(response.data.colecciones);
                }
                if (response.data.estado) {
                    setEstado(response.data.estado);
                }
                if (response.data.ultimo) {
                    setUltimaActividad(response.data.ultimo);
                    setIdUltimaActividad(response.data.ultimo.id)
                    setPortadaUltimaActividad(response.data.ultimo.img);
                    setTituloUltimaActividad(response.data.ultimo.titulo);
                    setFechaUltimaActividad(response.data.ultimo.fecha);
                }
            } catch (error) {
                // Maneja los errores si ocurrieron
                console.error('Hubo un error al obtener los datos del perfil:', error);
            }
        };

        if (id_user) {
            fetchPerfil();
        } else {
            console.log('No se ha pasado ningún usuario');
            navigate('/');
        }
    }, []); // La dependencia vacía [] asegura que este efecto se ejecute solo una vez al montar el componente
    
    const obtenerFotoPerfil = (numero) => {
        console.log(numero);
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

    const esAmigo = (estado) => {
        if (estado === 0) {
            return true;
        }
        else {
            return false;
        }
    }

    const [solicitudEnviada, setSolicitudEnviada] = useState(false);

    const enviarSolicitud = () => {
        setSolicitudEnviada(prevState => !prevState);
        console.log('Solicitud enviada');
    };

    const handleClickLibro = () => {
        navigate(`/libro?id=${idUltimaActividad}`);
    }

    return (
        <div className="amigo-perfil-usuario">
            <div className="amigo-foto-perfil">
                <img src={obtenerFotoPerfil(img)} alt="Foto de perfil" />
            </div>
            <div className="amigo-info-usuario">
                <h2>{usuario}</h2>
                {esAmigo ? (
                    <button className="amigo-somos-amigos">Somos amigos</button>
                ) : (
                    <button className='amigo-boton-solicitud' onClick={enviarSolicitud}>
                        {solicitudEnviada ? 'Cancelar solicitud' : 'Añadir amigo'}
                    </button>
                )}
                {esAmigo && (
                    <div className="amigo-colecciones-y-actividad">
                        {colecciones &&
                            <div className="amigo-colecciones">
                                <h3 className="colecciones-usuario">Colecciones de {usuario}</h3>
                                <ListaColeccionesAmigo className='list' colecciones={colecciones}></ListaColeccionesAmigo>
                            </div>
                        }
                        {ultimaActividad ? (
                            <div className="amigo-ultima-actividad">
                                <h3>Última actividad</h3>
                                <div className="amigo-actividad">
                                    <img className='amigo-foto-link-libro' onClick={handleClickLibro} src={portadaUltimaActividad} alt="Portada" />
                                    <div className="amigo-actividad-info">
                                        <p className='amigo-click-libro' onClick={handleClickLibro}>{tituloUltimaActividad}</p>
                                        <p>{fechaUltimaActividad}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="amigo-ultima-actividad">
                                <h3>Última actividad</h3>
                                <p>No hay actividad reciente</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PerfilAmigo;
