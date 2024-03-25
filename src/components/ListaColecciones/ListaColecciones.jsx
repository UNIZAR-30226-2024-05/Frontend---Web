import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import './ListaColecciones.css';
import DropdownButton from '../DropdownButton/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Lista = ({colecciones}) => {
    
    const [listaColecciones, setListaColecciones] = useState(colecciones)
    const [busqueda, setBusqueda] = useState('');

    const [opciones, setOpciones] = useState([
        'Eliminar coleccion',
    ]);

    /*
    URL_CONSULTA = '/audiolirbos/genre/:genero'

    const getPeticion = async () => {
        await axios.get(URL_CONSULTA)
        .then(response=>{
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect( () => {
        getPeticion();
    },[])
    */

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

    {/* En que se pueda, cambiar todo lo de colecciones por una consulta al servidor. */}

    return (
    <div className='contenedor-lista'>
        <div className='buscador-container'>
            <input className='buscador'
                placeholder='Búsqueda por nombre de la colección'
                value={busqueda}
                onChange={handleChangeBusqueda}
            />
            <button className='button-search'>
                <FontAwesomeIcon icon={faSearch} />
            </button>

        </div>

        <div className='lista'>
            {listaColecciones.map((coleccion, i) => (
                <div key={i}
                className='coleccion'>
                    <div className='contenido-colec'>
                        <a className='portadas' href='/player'>
                            <img src={coleccion.portada} alt={coleccion.nombre}></img>
                        </a>
                        <a className='nombre' href='/player'>
                            <h1>{coleccion.nombre}</h1>
                        </a>
                    </div>
                    <div className='boton-container'>
                        <DropdownButton className='boton-opciones' options={opciones} />
                    </div>
                </div>
              ))}
        </div>
        
    </div>
  )
}

export default Lista