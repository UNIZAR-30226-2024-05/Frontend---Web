import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './ListaLibros.css';
import DropdownButton from '../DropdownButton/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Cookie from 'js-cookie';

const ListaLibros = ({generos}) => {
    
    const URL_CONSULTA = '/audiolibros';

    const [libros, setLibros] = useState([]);
    const [listaLibros, setListaLibros] = useState(libros);
    const [listaShow, setListaShow] = useState(libros);
    const [busqueda, setBusqueda] = useState('');
    const [generoSeleccionado, setGeneroSeleccionado] = useState('');

    const [opciones, setOpciones] = useState([
        'Añadir a favoritos',
        'Añadir a escuchar mas tarde',
        'Añadir a colecciones'
    ]);

    useEffect( () => {
        async function fetchLibros(){
            await axios.get(URL_CONSULTA)
            .then(response=>{
                setLibros(response.data.audiolibros);
                setListaLibros(response.data.audiolibros);
                setListaShow(response.data.audiolibros);
                console.log(response.data);
            }).catch(error=>{
                console.log(error);
            })
        }
        fetchLibros();
    }, []);

    const handleChangeBusqueda = event => {
        setBusqueda(event.target.value);
        filtrar(event.target.value);
    } 

    const filtrar = (terminoBusqueda) => {
        var resultado = listaLibros.filter((elemento) => {
            if (elemento.titulo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            || elemento.autor.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()))
            {return elemento;}
        });
        setListaShow(resultado);
    }

    const handleGeneroChange = (event) => {
        setGeneroSeleccionado(event.target.value);
        /* Solo para desarrollo, quitar mas adelante */
        console.log(libros);
        console.log(listaLibros);
    };

    const handleBusqueda = () => {
        if (generoSeleccionado === ''){
            setListaLibros(libros);
            setListaShow(libros);
            setBusqueda('');
        }
        else{
            var resultado = libros.filter((elemento) => {
                if (elemento.genero === generoSeleccionado)
                {return elemento;}
            });
            setListaLibros(resultado);
            setListaShow(resultado);
            setBusqueda('');
        }
    }

    const navigate = useNavigate();

    const handleLibroClick = (id_libro) => {
        navigate('/libro', {state: {id_libro}})
    }


    {/* En que se pueda, cambiar todo lo de libros por una consulta al servidor. */}

    return (
    <div className='contenedor-lista'>
        <div className='buscador-container'>
            <select className="selector-generos" onChange={handleGeneroChange} value={generoSeleccionado}>
                <option value="">Todos los géneros</option>
                {generos.map((genero) => (
                        <option key={genero} value={genero}>{genero}</option>
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
            {listaShow.map((libro, i) => (
                <div key={i}
                className='libro'>
                    <div className='contenido-libro'>
                        <div className='portadas' onClick={() => handleLibroClick(libro.id)}>
                            <img src={libro.img} alt={libro.titulo}></img>
                        </div>
                        <div className='titulo' onClick={() => handleLibroClick(libro.id)}>
                            <h1>{libro.titulo}</h1>
                        </div>
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