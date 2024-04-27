import React, { useState, useContext, useEffect } from 'react';
import './ListaColecciones.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import AuthContext from '../../context/AuthProvider';
import DropdownButtonColecciones from './DropdownButtonColecciones';

const ListaColecciones = ({colecciones}) => {

    const navigate = useNavigate();

    const { auth } = useContext(AuthContext);
    const { user_id } = auth;

    const [crearColeccion, setCrearColeccion] = useState(false);
    const showCrearColeccion = () => setCrearColeccion(!crearColeccion);
    
    const [listaColecciones, setListaColecciones] = useState(colecciones);
    const [busqueda, setBusqueda] = useState('');

    const [nuevaColeccion, setNuevaColeccion] = useState('');
    
    const [coleccionesFavoritos, setColeccionesFavoritos] = useState(listaColecciones.filter(coleccion => coleccion.titulo === "Favoritos"));
    const [coleccionesEscucharMasTarde, setColeccionesEscucharMasTarde] = useState(listaColecciones.filter(coleccion => coleccion.titulo === "Escuchar mas tarde"));

    // Filtrar las demás colecciones
    const [otrasColecciones, setOtrasColecciones] = useState(listaColecciones.filter(coleccion => coleccion.titulo !== "Favoritos" && coleccion.titulo !== "Escuchar mas tarde"));

    useEffect(() => {
        setColeccionesFavoritos(listaColecciones.filter(coleccion => coleccion.titulo === "Favoritos"));
        setColeccionesEscucharMasTarde(listaColecciones.filter(coleccion => coleccion.titulo === "Escuchar mas tarde"));
        setOtrasColecciones(listaColecciones.filter(coleccion => coleccion.titulo !== "Favoritos" && coleccion.titulo !== "Escuchar mas tarde"));
      }, [listaColecciones]);
    

    const opciones_col_propia = [
        'Eliminar coleccion'
    ];

    const opciones_col_ajena = [
        'Dejar de seguir coleccion'
    ];

    const handleChangeBusqueda = (event) => {
        setBusqueda(event.target.value);
        filtrar(event.target.value);
    }

    const handleChangeNuevaColeccion = (event) => {
        setNuevaColeccion(event.target.value);
    } 

    const handleClickSubmitColeccion = async () => {
        const URL_CONSULTA = '/colecciones/create';
        console.log(URL_CONSULTA);
        console.log(nuevaColeccion);
        try {
            const respuesta = await axios.post(URL_CONSULTA, 
              JSON.stringify({title: nuevaColeccion}),
              {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
              }
            );
            console.log(respuesta); /* Solo desarrollo */
            setNuevaColeccion('');
        } catch (err) {
            if (!err.response) {
                console.log('No hay respuesta del servidor');
            } else if (err.response.status === 400) {
                console.log('Error: Titulo existente'); 
            } else if (err.response.status === 500){
                console.log('Server error');
            } else {
                console.log('Error');
            }
        }
    }

    const filtrar = (terminoBusqueda) => {
        var resultado = colecciones.filter((elemento) => {
            if (elemento.titulo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()))
            {return elemento;}
        });
        setListaColecciones(resultado);
    }

    const handleColeccionClick = (id_coleccion) => {
        navigate('/coleccion', {state: {id_coleccion}})
    }

    {/* En que se pueda, cambiar todo lo de colecciones por una consulta al servidor. */}

    return (
    <div className='contenedor-lista'>
        <div className='buscador-container'>
            <button className='crear-coleccion-btn' onClick={showCrearColeccion}>
                Crear nueva coleccion
            </button>
            <input className='buscador'
                placeholder='Búsqueda por nombre de la colección'
                value={busqueda}
                onChange={handleChangeBusqueda}
            />
        </div>

        {crearColeccion ? (
            <div className='crear-coleccion-container'>
                <input className='nombre-nueva-coleccion'
                placeholder='Cómo quiere llamar a su nueva colección'
                value={nuevaColeccion}
                onChange={handleChangeNuevaColeccion}/>

                <button className='submit-coleccion-button' onClick={handleClickSubmitColeccion}> Enter </button>
                
            </div>
        ) : null}

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
                            <DropdownButtonColecciones className='boton-opciones' options={opciones_col_propia} collectionId={coleccion.id} />
                        </div> : 
                        <div className='boton-container'>
                            <DropdownButtonColecciones className='boton-opciones' options={opciones_col_ajena} collectionId={coleccion.id} />
                        </div>
                    }
                </div>
            ))}
        </div>
        
    </div>
  )
}

export default ListaColecciones;