import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaPeticiones.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'; // Importar los iconos necesarios
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Importa el icono faSearch


const ListaPeticiones = ({ enviadas, recibidas, aceptadas, rechazadas, tipos }) => {

    const navigate = useNavigate();
    const [listaPeticiones, setListaPeticiones] = useState(peticiones);
    const [listaEnviadas, setListaEnviadas] = useState(enviadas);
    const [listaRecibidas, setListaRecibidas] = useState(recibidas);
    const [listaAceptadas, setListaAceptadas] = useState(aceptadas);
    const [listaRechazadas, setListaRechazadas] = useState(rechazadas);

    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        if (Array.isArray(peticiones)) {
            setListaPeticiones(peticiones);
            console.log(peticiones);

        }
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

    const filtrarPeticiones = () => {
        return peticiones.filter(peticion =>
            peticion.username.toLowerCase().includes(busqueda.toLowerCase())
        );
    };

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
                    {tipo === 'enviadas' && enviadas.map((peticion, i) => (
                            <div key={i} className='peticion'>
                                <div className='contenido-peticion'>
                                    <div className='peticion-username'>
                                        <h1 onClick={() => handleUsuarioClick(enviadas.user_id)}>{peticion.username}</h1>
                                    </div>
                                    <div>
                                        <h2>{enviadas.fecha}</h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {tipo === 'recibidas' && recibidas.map((peticion, i) => (
                            <div key={i} className='peticion'>
                                <div className='contenido-peticion'>
                                    <div className='peticion-username'>
                                        <h1 onClick={() => handleUsuarioClick(recibidas.user_id)}>{peticion.username}</h1>
                                    </div>
                                    <div>
                                        <h2>{recibidas.fecha}</h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {tipo === 'aceptadas' && aceptadas.map((peticion, i) => (
                            <div key={i} className='peticion'>
                                <div className='contenido-peticion'>
                                    <div className='peticion-username'>
                                        <h1 onClick={() => handleUsuarioClick(aceptadas.user_id)}>{peticion.username}</h1>
                                    </div>
                                    <div>
                                        <h2>{aceptadas.fecha}</h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {tipo === 'rechazadas' && rechazadas.map((peticion, i) => (
                            <div key={i} className='peticion'>
                                <div className='contenido-peticion'>
                                    <div className='peticion-username'>
                                        <h1 onClick={() => handleUsuarioClick(rechazadas.user_id)}>{peticion.username}</h1>
                                    </div>
                                    <div>
                                        <h2>{rechazadas.fecha}</h2>
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
