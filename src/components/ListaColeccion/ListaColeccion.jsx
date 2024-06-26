import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaColeccion.css';
import AuthContext from '../../context/AuthProvider';
import DropdownButtonColeccion from './DropdownButtonColeccion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const ListaColeccion = ({ coleccion, setColeccion }) => {

    const { auth } = useContext(AuthContext);
    const { user_id } = auth;

    const [listaLibros, setListaLibros] = useState(coleccion.audiolibros);
    const [listaShow, setListaShow] = useState(coleccion.audiolibros);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        setColeccion({...coleccion, audiolibros: listaLibros})
        filtrar(busqueda);
      }, [listaLibros]);

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
        navigate(`/libro?id=${id_libro}`);
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
                    {user_id === coleccion.propietario &&
                    <div className='boton-container'>
                        <DropdownButtonColeccion 
                        className='boton-opciones' 
                        libro={libro} 
                        coleccion={coleccion} 
                        setListaLibros={setListaLibros}/>
                    </div>
                    }
                </div>
              ))}
        </div>
        
    </div>
  )
}

export default ListaColeccion