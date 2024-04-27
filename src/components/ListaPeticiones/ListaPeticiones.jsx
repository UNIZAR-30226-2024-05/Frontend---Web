import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaPeticiones.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'; // Importar los iconos necesarios
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Importa el icono faSearch


const ListaPeticiones = ({ peticiones, tipos }) => {

    const navigate = useNavigate();
    const [listaPeticiones, setListaPeticiones] = useState(peticiones);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        setListaPeticiones(peticiones);
        console.log(peticiones);
    }, [peticiones]);

    

    const handleChangeBusqueda = event => {
        setBusqueda(event.target.value);
    };

    const filtrar = () => {
        var resultado = listaPeticiones.filter((peticion) => {
            return peticion.username.toString().toLowerCase().includes(busqueda.toLowerCase());
        });
        setListaPeticiones(resultado);
    };


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
                <button className='buscador-listaPeticiones-container-button-search'>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <div className='lista'>
            {tiposOrdenados.map((tipo) => (
                <div key={tipo}>
                    <h2 className='listaPeticiones-tipo'>{tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase()}</h2>
                    {listaPeticiones.map((peticion, i) => (
                        peticion.tipo === tipo && (
                            <div key={i} className='peticion'>
                                <div className='contenido-peticion'>
                                    <div className='peticion-username'>
                                        <h1 onClick={handleUsuarioClick}>{peticion.username}</h1>
                                    </div>
                                    <div>
                                        <h2>{peticion.fecha}</h2>
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
