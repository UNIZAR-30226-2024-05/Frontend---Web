import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import './ListaLibros.css';
import DropdownButton from '../DropdownButton/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const ListaLibros = ({libros}) => {
    
    const [listaLibros, setListaLibros] = useState(libros)
    const [busqueda, setBusqueda] = useState('');

    const [opciones, setOpciones] = useState([
        'Añadir a favoritos',
        'Añadir a colecciones',
        'Ver al artista'
    ]);

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
        filtrar(event.target.value);
    } 

    const filtrar = (terminoBusqueda) => {
        var resultado = libros.filter((elemento) => {
            if (elemento.titulo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            || elemento.autor.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()))
            {return elemento;}
        });
        setListaLibros(resultado);
    }

    {/* En que se pueda, cambiar todo lo de libros por una consulta al servidor. */}

    return (
    <div className='contenedor-lista'>
        <div className='buscador-container'>
            <input className='buscador'
                placeholder='Búsqueda por nombre de la obra o del autor'
                value={busqueda}
                onChange={handleChangeBusqueda}
            />
            <button className='button-search'>
                <FontAwesomeIcon icon={faSearch} />
            </button>

        </div>

        <div className='lista'>
            {listaLibros.map((libro, i) => (
                <div key={i}
                className='libro'>
                    <div className='contenido-libro'>
                        <a className='portadas' href='/player'>
                            <img src={libro.portada} alt={libro.titulo}></img>
                        </a>
                        <a className='titulo' href='/player'>
                            <h1>{libro.titulo}</h1>
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

export default ListaLibros