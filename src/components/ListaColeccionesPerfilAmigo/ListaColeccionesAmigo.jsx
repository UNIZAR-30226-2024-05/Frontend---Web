import React, { useState, useContext, useEffect } from 'react';
import './ListaColeccionesAmigo.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import AuthContext from '../../context/AuthProvider';
import DropdownButtonColeccionesAmigo from './DropdownButtonColeccionesAmigo';
import ErrorNoSesion from '../ErrorNoSesion/ErrorNoSesion';

const ListaColeccionesAmigo = ({colecciones, setColecciones}) => {

    const navigate = useNavigate();

    const { auth } = useContext(AuthContext);
    const { user_id } = auth;
    
    const [listaColecciones, setListaColecciones] = useState(colecciones);
    const [busqueda, setBusqueda] = useState('');
    
    const [coleccionesFavoritos, setColeccionesFavoritos] = useState(listaColecciones.filter(coleccion => coleccion.titulo === "Favoritos"));
    const [coleccionesEscucharMasTarde, setColeccionesEscucharMasTarde] = useState(listaColecciones.filter(coleccion => coleccion.titulo === "Escuchar mas tarde"));

    // Filtrar las demás colecciones
    const [otrasColecciones, setOtrasColecciones] = useState(listaColecciones.filter(coleccion => coleccion.titulo !== "Favoritos" && coleccion.titulo !== "Escuchar mas tarde"));

    useEffect(() => {
        setColeccionesFavoritos(listaColecciones.filter(coleccion => coleccion.titulo === "Favoritos"));
        setColeccionesEscucharMasTarde(listaColecciones.filter(coleccion => coleccion.titulo === "Escuchar mas tarde"));
        setOtrasColecciones(listaColecciones.filter(coleccion => coleccion.titulo !== "Favoritos" && coleccion.titulo !== "Escuchar mas tarde"));
      }, [listaColecciones]);
    
    useEffect(() => {
        setListaColecciones(colecciones);
      }, [colecciones]);

    const opcion_seguida = [
        'Dejar de seguir coleccion'
    ];

    const opcion_no_seguida = [
        'Seguir coleccion'
    ];

    const handleChangeBusqueda = (event) => {
        setBusqueda(event.target.value);
        filtrar(event.target.value);
    }

    const URL_COLECCION = '/colecciones';

    async function fetchColecciones(){
        await axios.get(URL_COLECCION, {withCredentials: true})
        .then(response=>{
            setColecciones(response.data.collections);
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
            setLoading(false);
            if (error.response && error.response.status === 401) { 
                console.log('No autorizado');
                return <ErrorNoSesion/>
            }
        })
    }

    const filtrar = (terminoBusqueda) => {
        var resultado = colecciones.filter((elemento) => {
            if (elemento.titulo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()))
            {return elemento;}
        });
        setListaColecciones(resultado);
    }

    const handleColeccionClick = (id_coleccion) => {
        navigate(`/coleccion?id=${id_coleccion}`);
    }

    {/* En que se pueda, cambiar todo lo de colecciones por una consulta al servidor. */}

    return (
    <div className='contenedor-lista-amigo'>
        <div className='buscador-container'>
            <input className='buscador'
                placeholder='Búsqueda por nombre de la colección'
                value={busqueda}
                onChange={handleChangeBusqueda}
            />
        </div>

        <div className='lista'>
            {coleccionesFavoritos.map((coleccion, i) => (
                <div key={i} className='coleccion'>
                    <div className='contenido-colec'>
                        <div className='nombre' onClick={() => handleColeccionClick(coleccion.id)}>
                            <h1>{coleccion.titulo}</h1>
                        </div>
                    </div>
                </div>
            ))}
            {coleccionesEscucharMasTarde.map((coleccion, i) => (
                <div key={i} className='coleccion'>
                    <div className='contenido-colec'>
                        <div className='nombre' onClick={() => handleColeccionClick(coleccion.id)}>
                            <h1>{coleccion.titulo}</h1>
                        </div>
                    </div>
                </div>
            ))}
            {otrasColecciones.map((coleccion, i) => (
                <div key={i} className='coleccion'>
                    <div className='contenido-colec'>
                        <div className='nombre' onClick={() => handleColeccionClick(coleccion.id)}>
                            <h1>{coleccion.titulo}</h1>
                        </div>
                    </div>
                    {user_id === coleccion.propietario ? 
                        <div className='boton-container'>
                            <DropdownButtonColeccionesAmigo 
                            className='boton-opciones' 
                            options={opcion_seguida} 
                            collectionId={coleccion.id}
                            setColecciones={setColecciones}/>
                        </div> : 
                        <div className='boton-container'>
                            <DropdownButtonColeccionesAmigo
                            className='boton-opciones'
                            options={opcion_no_seguida}
                            collectionId={coleccion.id}
                            setColecciones={setColecciones}/>
                        </div>
                    }
                </div>
            ))}
        </div>
        
    </div>
  )
}

export default ListaColeccionesAmigo;