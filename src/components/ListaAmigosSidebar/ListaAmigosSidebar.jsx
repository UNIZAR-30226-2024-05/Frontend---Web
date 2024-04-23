import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './ListaAmigosSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Cookie from 'js-cookie';

const ListaAmigosSidebar = () => {
        
        const URL_CONSULTA = '/amistad/amigos';

        const listaAmigosFicticia = [
            { username: 'Juan' },
            { username: 'María' },
            { username: 'Pedro' },
            { username: 'Ana' },
            { username: 'Carlos' },
            { username: 'Juan' },
            { username: 'María' },
            { username: 'Pedro' },
            { username: 'Ana' },
            { username: 'Carlos' }
        ];
    
        const [amigos, setAmigos] = useState([]);
        const [listaAmigos, setListaAmigos] = useState(amigos);
        const [listaShow, setListaShow] = useState(amigos);
        const [busqueda, setBusqueda] = useState('');
    
        useEffect( () => {
            /*async function fetchAmigos(){
                await axios.get(URL_CONSULTA, { withCredentials: true })
                .then(response=>{
                    setAmigos(response.data.amigos);
                    setListaAmigos(response.data.amigos);
                    setListaShow(response.data.amigos);
                    console.log(response.data);
                }).catch(error=>{
                    console.log(error);
                })
            }
            fetchAmigos();*/
            setAmigos(listaAmigosFicticia);
            setListaAmigos(listaAmigosFicticia);
            setListaShow(listaAmigosFicticia);
        }, []);
    
        const handleChangeBusqueda = event => {
            setBusqueda(event.target.value);
        } 

        const handleBusqueda = () => {
            var resultado = listaAmigos.filter((elemento) => {
                if (elemento.username.toString().toLowerCase().includes(busqueda.toLowerCase()))
                {return elemento;}
            });
            setListaShow(resultado);
        }

        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                handleBusqueda();
            }
        }

        const eliminarAmigo = (index) => {
            try {
                const token = Cookie.get('token');
                const response = axios.post('/amistad/remove', { other_id: amigos[index].id }, { headers: { 'Authorization': `Bearer ${token}` } });
                console.log(response.data.message); // Mensaje de éxito
            }
            catch (error) {
                if (error.response) {
                    console.error(error.response.data.error); // Manejar errores específicos del servidor
                } else {
                    console.error('Error del servidor:', error.message); // Manejar otros errores
                }
            }
        };
    
        return (
            <div className='lista-amigos-sidebar'>
                <div className='buscador-listaAmigosSidebar-container'>
                    <input className='buscador-listaAmigosSidebar-container-buscador'
                        placeholder='Buscar amigos' 
                        value={busqueda} 
                        onChange={handleChangeBusqueda}
                        onKeyDown={handleKeyPress}/>
                </div>
                
                <div className='lista'>
                    {listaShow.map((amigo, index) => (
                        <div className='amigo' key={index}>
                            <div className='amigo-info'>
                                <h2 className='nombre-amigo'><a href='/perfilamigo' className='link-amigo'>{amigo.username}</a></h2>
                                <button className='eliminar-amigo' onClick={() => eliminarAmigo(index)}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

export default ListaAmigosSidebar;