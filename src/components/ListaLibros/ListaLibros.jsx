import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import './ListaLibros.css';
import DropdownButton from '../DropdownButton/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Cookie from 'js-cookie';

const ListaLibros = ({books, generos}) => {
    
    const [libros, setLibros] = useState(books);
    const [listaLibros, setListaLibros] = useState(libros);
    const [busqueda, setBusqueda] = useState('');
    const [generoSeleccionado, setGeneroSeleccionado] = useState('');

    const [opciones, setOpciones] = useState([
        'Añadir a favoritos',
        'Añadir a escuchar mas tarde',
        'Añadir a colecciones'
    ]);

    /*

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

    const handleGeneroChange = (event) => {
        setGeneroSeleccionado(event.target.value);
        console.log(libros);
        console.log(listaLibros);
    };

    const URL_CONSULTA = '/audiolibros/';

    const handleBusqueda = async () => {
        if (generoSeleccionado != ''){
            await axios.get(URL_CONSULTA + generoSeleccionado)
            .then(response=>{
                setLibros(response.data);
                setListaLibros(response.data);
                setBusqueda('');
                console.log(response.data);
            }).catch(error=>{
                console.log(error);
            })}
        else {
            await axios.get(URL_CONSULTA)
            .then(response=>{
                setLibros(response.data.audiolibros);
                setListaLibros(response.data.audiolibros);
                setBusqueda('');
                console.log(response.data);
            }).catch(error=>{
                console.log(error);
            })
        }
    }

    {/* En que se pueda, cambiar todo lo de libros por una consulta al servidor. */}

    return (
    <div className='contenedor-lista'>
        <div className='buscador-container'>
            <select className="selector-generos" onChange={handleGeneroChange} value={generoSeleccionado}>
                <option value="">Todos los géneros</option>
                {generos.map((genero) => (
                        <option key={genero.clave} value={genero.clave}>{genero.label}</option>
                ))}
                {/* Agrega más opciones de géneros según sea necesario */}
  </select>
            <input className='buscador'
                placeholder='Búsqueda por nombre de la obra o del autor'
                value={busqueda}
                onChange={handleChangeBusqueda}
            />
            <button className='button-search' onClick={handleBusqueda}>
                <FontAwesomeIcon icon={faSearch} />
            </button>

        </div>

        <div className='lista'>
            {listaLibros.map((libro, i) => (
                <div key={i}
                className='libro'>
                    <div className='contenido-libro'>
                        <a className='portadas' href='/libro'>
                            <img src={libro.img} alt={libro.titulo}></img>
                        </a>
                        <a className='titulo' href='/libro'>
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