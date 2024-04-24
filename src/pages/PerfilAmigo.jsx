import React, { useState } from 'react';
import './PerfilAmigo.css';
import { Link, useLocation } from 'react-router-dom';


import fotoPerfil from '../images/foto1.jpg';
import foto1 from '../images/1.png';
import foto2 from '../images/2.jpg';
import foto3 from '../images/3.jpg';
import foto4 from '../images/4.jpg';
import foto5 from '../images/5.jpg';
import ListaColecciones from '../components/ListaColecciones/ListaColecciones';

const PerfilAmigo = () => {

    /*
    const location = useLocation();
    const id_user = location.state?.id_user

    const [usuario, setUsuario] = useState();

    useEffect(() => {

        if (id_user) {
            const URL_PERFIL = `/audiolibros/${id_user}`; /* AJUSTAR *//*

            axios.get(URL_PERFIL)
            .then(response => {
                // Actualiza el estado de los libros con los datos de los audiolibros recibidos
                setUsuario(response.data);
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
    */

    const usuario = {
        nombre: 'Juan',
        foto: fotoPerfil,
    };
    const esAmigo = true;
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
    };

    const [solicitudEnviada, setSolicitudEnviada] = useState(false);

    const enviarSolicitud = () => {
        setSolicitudEnviada(prevState => !prevState);
        console.log('Solicitud enviada');
    };

    return (
        <div className="amigo-perfil-usuario">
            <div className="amigo-foto-perfil">
                <img src={usuario.foto} alt="Foto de perfil" />
            </div>
            <div className="amigo-info-usuario">
                <h2>{usuario.nombre}</h2>
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
                            <h3 className="colecciones-usuario">Colecciones de {usuario.nombre}</h3>
                            <ListaColecciones className='list' colecciones={colecciones}></ListaColecciones>
                        </div>
                        <div className="amigo-ultima-actividad">
                            <h3>Última actividad</h3>
                            <div className="amigo-actividad">
                                <Link to="/libro" className="amigo-foto-link-libro">
                                    <img src={ultimaActividad.portada} alt="Portada" />
                                </Link>
                                <div className="amigo-actividad-info">
                                    <p>{ultimaActividad.tipo}</p>
                                    <p><Link to="/libro" className="amigo-link-libro">{ultimaActividad.titulo}</Link></p>
                                    <p>{ultimaActividad.hora}</p>
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
