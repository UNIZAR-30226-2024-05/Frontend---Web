import React, { useState, useContext } from 'react';
import './ListaColecciones.css';
import { useNavigate } from 'react-router-dom';
import DropdownButton from '../DropdownButton/DropdownButton';
import AuthContext from '../../context/AuthProvider';

const ListaColecciones = ({colecciones}) => {

    const navigate = useNavigate();

    const { auth } = useContext(AuthContext);
    const { user_id } = auth;

    const [crearColeccion, setCrearColeccion] = useState(false);
    const showCrearColeccion = () => setCrearColeccion(!crearColeccion);
    
    const [listaColecciones, setListaColecciones] = useState(colecciones);
    const [busqueda, setBusqueda] = useState('');

    const [nuevaColeccion, setNuevaColeccion] = useState('');

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

        try {
            const respuesta = await axios.post(URL_RM, 
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
                setErrMsg ('No hay respuesta del servidor');
            } else if (err.response.status === 400) {
                setErrMsg ('Error: Titulo existente'); 
            } else if (err.response.status === 500){
                setErrMsg ('Server error');
            } else {
                setErrMsg ('Error');
            }
        }
    }

    const filtrar = (terminoBusqueda) => {
        var resultado = colecciones.filter((elemento) => {
            if (elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()))
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
                
                <select className="selector-tipo-coleccion" onChange={handleTipoChange} value={tipoColeccion}>
                {tipoColeccion.map((tipo) => (
                        <option key={tipo} value={tipo}>{tipo}</option>
                ))}
                {/* Agrega más opciones de géneros según sea necesario */}
                </select>

                <button className='submit-coleccion-button' onClick={handleClickSubmitColeccion}> Enter </button>
                
            </div>
        ) : null}




        <div className='lista'>
            {listaColecciones.map((coleccion, i) => (
                <div key={i}
                className='coleccion'>
                    <div className='contenido-colec'>
                    <div className='nombre' onClick={() => handleColeccionClick(coleccion.id)}>
                            <h1>{coleccion.titulo}</h1>
                        </div>
                    </div>
                    {user_id === coleccion.propietario ? 
                        <div className='boton-container'>
                            <DropdownButton className='boton-opciones' options={opciones_col_propia} />
                        </div> : 
                        <div className='boton-container'>
                            <DropdownButton className='boton-opciones' options={opciones_col_ajena} />
                    </div>}
                </div>
              ))}
        </div>
        
    </div>
  )
}

export default ListaColecciones;