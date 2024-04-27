import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaPeticiones.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'; // Importar los iconos necesarios
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Importa el icono faSearch


const ListaPeticiones = ({ peticiones, enviadas, recibidas, aceptadas, rechazadas }) => {

    const navigate = useNavigate();
    const [listaPeticiones, setListaPeticiones] = useState(peticiones);
    const [listaEnviadas, setListaEnviadas] = useState(enviadas);
    const [listaRecibidas, setListaRecibidas] = useState(recibidas);
    const [listaAceptadas, setListaAceptadas] = useState(aceptadas);
    const [listaRechazadas, setListaRechazadas] = useState(rechazadas);

    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        if (peticiones) {
            setListaPeticiones(peticiones);
            if (enviadas) {
                setListaEnviadas(enviadas);
            }
            if (recibidas) {
                setListaRecibidas(recibidas);
            }
            if (aceptadas) {
                setListaAceptadas(aceptadas);
            }
            if (echazadas) {
                setListaRechazadas(rechazadas);
            }
        }
        /*if (Array.isArray(peticiones)) {
            setListaPeticiones(peticiones);
            console.log(peticiones);
            setListaEnviadas(enviadas);
            console.log(enviadas);
            setListaRecibidas(recibidas);
            console.log(recibidas);
            setListaAceptadas(aceptadas);
            console.log(aceptadas);
            setListaRechazadas(rechazadas);
            console.log(rechazadas);
        }*/
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

    const tiposOrdenados = ['enviadas', 'recibidas', 'aceptadas', 'rechazadas'];


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
                    {tipo === 'enviadas' && listaEnviadas.map((peticion, i) => (
                            <div key={i} className='peticion'>
                                <div className='contenido-peticion'>
                                    <div className='peticion-username'>
                                        <h1 onClick={() => handleUsuarioClick(peticion.user_id)}>{peticion.username}</h1>
                                    </div>
                                    <div>
                                        <h2>{peticion.fecha}</h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {tipo === 'recibidas' && listaRecibidas.map((peticion, i) => (
                            <div key={i} className='peticion'>
                                <div className='contenido-peticion'>
                                    <div className='peticion-username'>
                                        <h1 onClick={() => handleUsuarioClick(peticion.user_id)}>{peticion.username}</h1>
                                    </div>
                                    <div>
                                        <h2>{peticion.fecha}</h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {tipo === 'aceptadas' && listaAceptadas.map((peticion, i) => (
                            <div key={i} className='peticion'>
                                <div className='contenido-peticion'>
                                    <div className='peticion-username'>
                                        <h1 onClick={() => handleUsuarioClick(peticion.user_id)}>{peticion.username}</h1>
                                    </div>
                                    <div>
                                        <h2>{peticion.fecha}</h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {tipo === 'rechazadas' && listaRechazadas.map((peticion, i) => (
                            <div key={i} className='peticion'>
                                <div className='contenido-peticion'>
                                    <div className='peticion-username'>
                                        <h1 onClick={() => handleUsuarioClick(peticion.user_id)}>{peticion.username}</h1>
                                    </div>
                                    <div>
                                        <h2>{peticion.fecha}</h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            ))}

            </div>
        </div>
    );
};
export default ListaPeticiones;
