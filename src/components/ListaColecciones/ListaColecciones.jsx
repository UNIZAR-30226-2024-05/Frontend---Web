import React, { useState, useContext } from 'react';
import './ListaColecciones.css';
import { useNavigate } from 'react-router-dom';
import DropdownButton from '../DropdownButton/DropdownButton';
import AuthContext from '../../context/AuthProvider';

const ListaColecciones = ({colecciones}) => {

    const navigate = useNavigate();

    const { auth } = useContext(AuthContext);
    const { user_id } = auth;
    
    const [listaColecciones, setListaColecciones] = useState(colecciones);
    const [busqueda, setBusqueda] = useState('');

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
            <input className='buscador'
                placeholder='Búsqueda por nombre de la colección'
                value={busqueda}
                onChange={handleChangeBusqueda}
            />
        </div>

        <div className='lista'>
            {listaColecciones.map((coleccion, i) => (
                <div key={i}
                className='coleccion'>
                    <div className='contenido-colec'>
                    <div className='nombre' onClick={() => handleColeccionClick(coleccion.id)}>
                            <h1>{coleccion.nombre}</h1>
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