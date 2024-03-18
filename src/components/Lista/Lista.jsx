import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import './Lista.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Lista = ({libros}) => {
    
    const [busqueda, setBusqueda] = useState('');
    /*
    URL_CONSULTA = '/audiolibros/genre/:genero'

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
    const handleChangeBusqueda = event => {
        setBusqueda(event.target.value);
        console.log('Busqueda: ' + event.target.value);
    } 

    return (
    <div className='contenedor-lista'>
        <div className='buscador-container'>
            <input className='buscador'
                placeholder='Búsqueda por nombre de la obra'
                value={busqueda}
                onChange={handleChangeBusqueda}
            />
            <button className='buttonSearch'>
                <FontAwesomeIcon icon={faSearch} />
            </button>

        </div>

        <div className='lista'>
            {libros.map((libro, i) => (
                <div key={i}
                className='libro'>
                    <a className='portadas' href='#'>
                        <img src={libro.portada} alt={libro.titulo}></img>
                    </a>
                    <a className='titulo' href='#'>
                        <h1>{libro.titulo}</h1>
                    </a>
                </div>
              ))}
        </div>
        
    </div>
  )
}

export default Lista