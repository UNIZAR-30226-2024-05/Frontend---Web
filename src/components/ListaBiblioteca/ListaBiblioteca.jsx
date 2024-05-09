import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaBiblioteca.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Cookie from 'js-cookie';

const ListaBiblioteca = ({generos, libros}) => {
    const [listaLibros, setListaLibros] = useState(libros);
    const [listaShow, setListaShow] = useState(libros);
    const [busqueda, setBusqueda] = useState('');
    const [generoSeleccionado, setGeneroSeleccionado] = useState('');

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
        navigate(`/libro?id=${id_libro}`);
    }
    
    const handleAutorClick = (id_autor) => {
        navigate(`/autor?id=${id_autor}`);
    }


    return (
    <div className='contenedor-lista-biblioteca'>
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

        <div className='lista-biblio'>
            {listaShow.map((libro, i) => (
                <div key={i}
                className='libro-biblio'>
                    <div className='contenido-libro'>
                        <div className='portada-libro' onClick={() => handleLibroClick(libro.id)}>
                            <img src={libro.img} alt={libro.titulo}></img>
                        </div>
                        
                    </div>
                </div>
              ))}
        </div>
        
    </div>
  )
}

export default ListaBiblioteca