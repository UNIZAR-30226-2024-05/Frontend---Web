import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaPeticiones.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'; // Importar los iconos necesarios
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Importa el icono faSearch
import axios from 'axios';


const ListaPeticiones = ({ tipos }) => {
    const peticionesFicticias = [
        { username: 'Juan', tipo: 'recibidas' },
        { username: 'María', tipo: 'enviadas' },
        { username: 'Pedro', tipo: 'aceptadas' },
        { username: 'Ana', tipo: 'rechazadas' },
        { username: 'Carlos', tipo: 'recibidas' }
    ];

    const [peticiones, setPeticiones] = useState([]);
    const [listaPeticiones, setListaPeticiones] = useState([]);
    const [listaShow, setListaShow] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [tipoSeleccionado, setTipoSeleccionado] = useState('');

    useEffect(() => {
        /*async function fetchPeticiones() {
            await axios.get(URL_CONSULTA, { withCredentials: true })
                 .then(response => {
                     setPeticiones(response.data.peticiones);
                     setListaPeticiones(response.data.peticiones);
                     setListaShow(response.data.peticiones);
                     console.log(response.data);
                 }).catch(error => {
                     console.log(error);
                 })
        }
        fetchPeticiones();*/
        setPeticiones(peticionesFicticias);
        setListaPeticiones(peticionesFicticias);
        setListaShow(peticionesFicticias);
    }, []);

    const handleChangeBusqueda = event => {
        setBusqueda(event.target.value);
    };

    const handleBusqueda = () => {
        var resultado = listaPeticiones.filter((elemento) => {
            return elemento.username.toString().toLowerCase().includes(busqueda.toLowerCase());
        });
        setListaShow(resultado);
    };
    
    const navigate = useNavigate();

    const handlePeticionClick = (peticion) => {
        navigate('/perfilamigo', { state: { username: peticion.username } });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleBusqueda();
        }
    }

    const tiposOrdenados = ['recibidas', 'enviadas', 'aceptadas', 'rechazadas'];

    const aceptarSolicitud = async () => {
        try {
            const response = await axios.post('/amistad/accept', { other_id });
            console.log(response.data.message); // Mensaje de éxito
        } catch (error) {
            if (error.response) {
                console.error(error.response.data.error); // Manejar errores específicos del servidor
            } else {
                console.error('Error del servidor:', error.message); // Manejar otros errores
            }
        }

    }

    const denegarSolicitud = async () => {
        try {
            const response = await axios.post('/amistad/reject', { other_id });
            console.log(response.data.message); // Mensaje de éxito
        } catch (error) {
            if (error.response) {
                console.error(error.response.data.error); // Manejar errores específicos del servidor
            } else {
                console.error('Error del servidor:', error.message); // Manejar otros errores
            }
        }
    }

    return (
        <div className='contenedor-lista'>
            <div className='buscador-listaPeticiones-container'>
                <input
                    className='buscador'
                    placeholder='Búsqueda por nombre de usuario'
                    value={busqueda}
                    onChange={handleChangeBusqueda}
                    onKeyDown={handleKeyPress}
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
                                        <a href='/perfilamigo' className='peticion-usernameLink'>
                                            <h1>{peticion.username}</h1>
                                        </a>
                                    </div>
                                    {tipo === 'recibidas' && (
                                        <div className='accion-peticion'>
                                            <FontAwesomeIcon icon={faCheck} className='icono-aceptar' onClick={aceptarSolicitud}/>
                                            <FontAwesomeIcon icon={faTimes} className='icono-rechazar' onClick={denegarSolicitud}/>
                                        </div>
                                    )}
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
