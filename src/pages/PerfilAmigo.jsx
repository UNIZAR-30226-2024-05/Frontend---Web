import React, { useState, useEffect } from 'react';
import './PerfilAmigo.css';
import { Link, useLocation } from 'react-router-dom';


import fotoPerfil from '../images/foto1.jpg';
import foto1 from '../images/1.png';
import foto2 from '../images/2.jpg';
import foto3 from '../images/3.jpg';
import foto4 from '../images/4.jpg';
import foto5 from '../images/5.jpg';
import ListaColecciones from '../components/ListaColecciones/ListaColecciones';
import axios from 'axios';

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

    
    const location = useLocation();
    const id_user = location.state?.id_user

    const [usuario, setUsuario] = useState();
    const [img, setImg] = useState();
    const [colecciones, setColecciones] = useState();
    const [estado, setEstado] = useState();
    const [ultimaActividad, setUltimaActividad] = useState();
    const [portadaUltimaActividad, setPortadaUltimaActividad] = useState();
    const [fechaUltimaActividad, setFechaUltimaActividad] = useState();

    useEffect(() => {

        if (id_user) {
            const URL_PERFIL = `/users/${id_user}`; 

            axios.get(URL_PERFIL, {withCredentials: true})
            .then(response => {
                // Actualiza el estado de los libros con los datos de los audiolibros recibidos
                setUsuario(response.data.username);
                setImg(response.data.img);
                setColecciones(response.data.colecciones);
                setEstado(response.data.estado);
                setUltimaActividad(response.data.ultimo);
                setPortadaUltimaActividad(response.data.ultimo.img);
                setFechaUltimaActividad(response.data.ultimo.fecha);
                console.log(response.data);
            })
            .catch(error => {
                // Maneja los errores si ocurrieron
                console.error('Hubo un error al obtener los datos del perfil:', error);
            });
        }
        else {
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

    /*const usuario = {
        nombre: 'Juan',
        foto: fotoPerfil,
    };
    
    const [colecciones, setColecciones] = useState([
        {portada: foto1, nombre: 'Favoritos'},
        {portada: foto2, nombre: 'Escuchalo más tarde'},
        {portada: foto3, nombre: 'Harry Potter'},
        {portada: foto4, nombre: 'Versos Perversos'},
        {portada: foto5, nombre: 'Otra coleccion más'}
    ]);

    const ultimaActividad = {
        tipo: 'Libro escuchado',
        portada: foto1,
        titulo: 'El principito',
        hora: 'Hace 2 horas'
    };*/

    const [solicitudEnviada, setSolicitudEnviada] = useState(false);

    const enviarSolicitud = () => {
        setSolicitudEnviada(prevState => !prevState);
        console.log('Solicitud enviada');
    };

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
                        <div className="amigo-colecciones">
                            <h3 className="colecciones-usuario">Colecciones de {usuario}</h3>
                            <ListaColecciones className='list' colecciones={colecciones}></ListaColecciones>
                        </div>
                        <div className="amigo-ultima-actividad">
                            <h3>Última actividad</h3>
                            <div className="amigo-actividad">
                                <Link to="/libro" className="amigo-foto-link-libro">
                                    <img src={portadaUltimaActividad} alt="Portada" />
                                </Link>
                                <div className="amigo-actividad-info">
                                    <p><Link to="/libro" className="amigo-link-libro">{ultimaActividad.titulo}</Link></p>
                                    <p>{fechaUltimaActividad}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PerfilAmigo;
