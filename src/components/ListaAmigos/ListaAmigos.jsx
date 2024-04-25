import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './ListaAmigos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Cookie from 'js-cookie';

const ListaAmigos = () => {
    const URL_CONSULTA = '/amistad/lista';

    const [amigos, setAmigos] = useState([]);
    const [listaShow, setListaShow] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        fetchAmigos();
    }, []);

    const fetchAmigos = async () => {
        try {
            const response = await axios.get(URL_CONSULTA, { withCredentials: true });
            setAmigos(response.data.amigos);
            setListaShow(response.data.amigos);
        } catch (error) {
            console.error('Error del servidor:', error.message);
        }
    };

    const handleChangeBusqueda = event => {
        setBusqueda(event.target.value);
    };

    const handleBusqueda = () => {
        if (amigos.length === 0) {
            setListaShow([]);
        } else {
            const resultado = amigos.filter(amigo => {
                return amigo.username.toLowerCase().includes(busqueda.toLowerCase());
            });
            setListaShow(resultado);
        }
    };
    
    

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            handleBusqueda();
        }
    };

    const eliminarAmigo = async index => {
        try {
            const token = Cookie.get('token');
            const response = await axios.post(
                '/amistad/remove',
                { other_id: amigos[index].id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(response.data.message);
            fetchAmigos(); // Actualizar la lista después de eliminar un amigo
        } catch (error) {
            if (error.response) {
                console.error('Error del servidor:', error.response.data.error);
            } else {
                console.error('Error del servidor:', error.message);
            }
        }
    };

    return (
        <div className="lista-amigos">
            <div className="buscador-listaAmigos-container">
                <input
                    className="buscador-listaAmigos-container-buscador"
                    placeholder="Buscar"
                    value={busqueda}
                    onChange={handleChangeBusqueda}
                    onKeyDown={handleKeyPress}
                />
                <button className="buscador-listaAmigos-container-button-search" onClick={handleBusqueda}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            <div className="lista">
                {listaShow.map((amigo, index) => (
                    <div className="amigo" key={index}>
                        <div className="amigo-info">
                            <a href="/perfilamigo" className="link-amigo">
                                <img className="foto-amigo" src={amigo.img} alt="Foto de perfil" />
                            </a>
                            <h2 className="nombre-amigo">
                                <a href="/perfilamigo" className="link-amigo">
                                    {amigo.username}
                                </a>
                            </h2>
                            <button className="eliminar-amigo" onClick={() => eliminarAmigo(index)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListaAmigos;
