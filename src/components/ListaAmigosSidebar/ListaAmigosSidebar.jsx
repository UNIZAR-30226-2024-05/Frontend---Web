import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaAmigosSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Cookie from 'js-cookie';

const ListaAmigosSidebar = ({amigos}) => {

        const navigate = useNavigate();
        
        const [listaShow, setListaShow] = useState(amigos);
        const [busqueda, setBusqueda] = useState('');
    
    
        const handleChangeBusqueda = event => {
            setBusqueda(event.target.value);
            filtrar();
        } 

        const filtrar = () => {
            var resultado = amigos.filter((elemento) => {
                if (elemento.username.toString().toLowerCase().includes(busqueda.toLowerCase()))
                {return elemento;}
            });
            setListaShow(resultado);
        }

        const handleNombreClick = (id_user) => {
            navigate('/perfilamigo', {state: {id_user}})
        }

        let timer;

        const handleMouseEnterName = (event) => {
            timer = setTimeout(() => {
                // Muestra el nombre completo cuando el temporizador se activa
                const nombreAmigo = event.target.textContent; // Obtén el nombre del amigo
                const tooltip = document.createElement('div'); // Crea un nuevo elemento para el tooltip
                tooltip.className = 'tooltip'; // Agrega una clase al tooltip para aplicar estilos CSS
                tooltip.textContent = nombreAmigo; // Agrega el nombre del amigo como texto al tooltip
                
                // Calcula la posición del tooltip en relación con la posición actual del ratón
                const posX = event.clientX;
                const posY = event.clientY - 20; // Mueve el tooltip un poco hacia arriba
                
                // Establece la posición del tooltip en la ventana
                tooltip.style.position = 'absolute';
                tooltip.style.left = `${posX}px`;
                tooltip.style.top = `${posY}px`;
                
                // Agrega el tooltip al DOM
                document.body.appendChild(tooltip);
                
            }, 1000); // 1000 milisegundos = 1 segundos
        };

        const handleMouseLeaveName = () => {
            clearTimeout(timer); // Cancela el temporizador cuando el ratón sale del elemento
            // Oculta el nombre completo al salir del elemento
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        };


        const handleMouseEnterUltimaLectura = (event, nombreLectura) => {
            timer = setTimeout(() => {
                // Muestra el nombre completo cuando el temporizador se activa
                const tooltip = document.createElement('div'); // Crea un nuevo elemento para el tooltip
                tooltip.className = 'tooltip'; // Agrega una clase al tooltip para aplicar estilos CSS
                tooltip.textContent = nombreLectura; // Agrega el nombre del amigo como texto al tooltip
                
                // Calcula la posición del tooltip en relación con la posición actual del ratón
                const posX = event.clientX;
                const posY = event.clientY - 20; // Mueve el tooltip un poco hacia arriba
                
                // Establece la posición del tooltip en la ventana
                tooltip.style.position = 'absolute';
                tooltip.style.left = `${posX}px`;
                tooltip.style.top = `${posY}px`;
                
                // Agrega el tooltip al DOM
                document.body.appendChild(tooltip);
                
            }, 1000); // 1000 milisegundos = 1 segundos
        };

        const handleMouseLeaveUltimaLectura = () => {
            clearTimeout(timer); // Cancela el temporizador cuando el ratón sale del elemento
            // Oculta el nombre completo al salir del elemento
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        };

        const handleIrUltimaLectura = () => {
            console.log('Ir a la ultima lectura') /* PROVISIONAL */
        }

        /*
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
        */

        return (
            <div className='lista-amigos-sidebar'>
                <div className='buscador-listaAmigosSidebar-container'>
                    <input className='buscador-listaAmigosSidebar-container-buscador'
                        placeholder='Buscar amigos' 
                        value={busqueda} 
                        onChange={handleChangeBusqueda}
                        />
                </div>
                
                <div className='lista'>
                    {listaShow.map((amigo, index) => (
                        <div className='amigo' key={index}>
                            <div className='amigo-info'>
                                <div 
                                className='nombre-amigo'
                                onClick={() => handleNombreClick(amigo.id)}
                                onMouseEnter={handleMouseEnterName}
                                onMouseLeave={handleMouseLeaveName}>
                                    {amigo.username}   
                                </div>
                                
                                <img 
                                className='ultima-lectura'
                                src={amigo.img}
                                onClick={() => handleIrUltimaLectura()}
                                onMouseEnter={(event) => handleMouseEnterUltimaLectura(event, 'Ultima Lectura')} /* CAMBIAR CUANDO TENGA LA CONSULTA */
                                onMouseLeave={handleMouseLeaveUltimaLectura} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

export default ListaAmigosSidebar;
