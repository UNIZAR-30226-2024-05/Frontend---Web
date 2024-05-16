import React, { useState, useContext, useEffect } from 'react';
import './ListaColecciones.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import AuthContext from '../../context/AuthProvider';
import DropdownButtonColecciones from './DropdownButtonColecciones';
import ErrorNoSesion from '../ErrorNoSesion/ErrorNoSesion';

const ListaColecciones = ({colecciones, setColecciones}) => {

    const navigate = useNavigate();

    const { auth } = useContext(AuthContext);
    const { user_id } = auth;

    const [crearColeccion, setCrearColeccion] = useState(false);
    const showCrearColeccion = () => {
        setCrearColeccion(!crearColeccion)
        setErrMsg('');
    };
    
    const [listaColecciones, setListaColecciones] = useState(colecciones);
    const [busqueda, setBusqueda] = useState('');

    const [nuevaColeccion, setNuevaColeccion] = useState('');
    const [errMsg, setErrMsg] = useState('');
    
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

    const handleClickSubmitColeccion = async () => {

        const URL_CONSULTA = '/colecciones/create';

        if(nuevaColeccion.length > 4 && nuevaColeccion.length < 30 ){
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
                setCrearColeccion(false);
                setErrMsg('');
                fetchColecciones();
            } catch (err) {
                if (!err.response) {
                    setErrMsg('No hay respuesta del servidor');
                } else if (err.response.status === 400) {
                    setErrMsg('Error: Titulo existente'); 
                } else if (err.response.status === 500){
                    setErrMsg('Server error');
                } else {
                    setErrMsg('Error');
                }
            }
        }
        else {
            setErrMsg('La colección debe tener entre 5 y 30 caracteres');
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
        navigate(`/coleccion?id=${id_coleccion}`);
    }

    {/* En que se pueda, cambiar todo lo de colecciones por una consulta al servidor. */}

    return (
    <div className='contenedor-lista-colecciones'>
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
        {errMsg && <div className="sign-error-message"><p>{errMsg}</p></div>}

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
                            <DropdownButtonColecciones 
                            className='boton-opciones' 
                            options={opciones_col_propia} 
                            collectionId={coleccion.id}
                            colecciones={colecciones}
                            setColecciones={setColecciones}/>
                        </div> : 
                        <div className='boton-container'>
                            <DropdownButtonColecciones
                            className='boton-opciones'
                            options={opciones_col_ajena}
                            collectionId={coleccion.id} 
                            colecciones={colecciones}
                            setColecciones={setColecciones}/>
                        </div>
                    }
                </div>
            ))}
        </div>
        
    </div>
  )
}

export default ListaColecciones;