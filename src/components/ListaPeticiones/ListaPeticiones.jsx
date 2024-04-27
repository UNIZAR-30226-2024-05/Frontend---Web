import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaPeticiones.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'; // Importar los iconos necesarios
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Importa el icono faSearch
import axios from 'axios';


const ListaPeticiones = ({ peticiones, tipos }) => {

    const navigate = useNavigate();
    const [listaPeticiones, setListaPeticiones] = useState(peticiones);
    const [busqueda, setBusqueda] = useState('');

    

    const handleChangeBusqueda = event => {
        setBusqueda(event.target.value);
    };

    const filtrar = () => {
        var resultado = listaPeticiones.filter((peticion) => {
            return peticion.username.toString().toLowerCase().includes(busqueda.toLowerCase());
        });
        setListaPeticiones(resultado);
    };

    const obtenerFotoPerfil = (numero) => {
        console.log(numero);
        switch(numero) {
            case '0':
                return perro;
                break;
            case '1':
                return gato;
                break;
            case '2':
                return rana;
                break;
            case '3':
                return leon;
                break;
            case '4':
                return pollo;
                break;
            case '5':
                return vaca;
                break;
            case '6':
                return buho;
                break;
            case '7':
                return perezoso;
                break;
            case '8':
                return doraemon;
                break;
            case '9':
                return pikachu;
                break;
        }
    }

    const handleUsuarioClick = (id_user) => {
        navigate('/perfilamigo', { state: { id_user } });
    };

    const tiposOrdenados = ['recibidas', 'enviadas', 'aceptadas', 'rechazadas'];


    return (
        <div className='contenedor-lista'>
            <div className='buscador-listaPeticiones-container'>
                <input
                    className='buscador'
                    placeholder='Búsqueda por nombre de usuario'
                    value={busqueda}
                    onChange={handleChangeBusqueda}
                />
                <button className='buscador-listaPeticiones-container-button-search' onClick={handleBusqueda}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <div className='lista'>
            {tiposOrdenados.map((tipo) => (
                <div key={tipo}>
                    <h2 className='listaPeticiones-tipo'>{tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase()}</h2>
                    {listaShow.map((peticion, i) => (
                        peticion.tipo === tipo && (
                            <div key={i} className='peticion'>
                                <div className='contenido-peticion'>
                                    <div className='peticion-username'>
                                        <h1 onClick={handleUsuarioClick}>{peticion.username}</h1>
                                    </div>
                                </div>

                            </div>
                        )
                    ))}
                </div>
            ))}

            </div>
        </div>
    );
};
export default ListaPeticiones;
