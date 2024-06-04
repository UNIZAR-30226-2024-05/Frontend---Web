import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaAmigosSidebar.css';
import foto1 from '../../images/1.png';

const ListaAmigosSidebar = ({amigos, setSidebar}) => {

        const navigate = useNavigate();
        
        const [listaShow, setListaShow] = useState(amigos);
        const [busqueda, setBusqueda] = useState('');
    
        useEffect(() => {
            setListaShow(amigos);
          }, [amigos]);
    
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
            if (location.pathname === '/perfilamigo') {
                navigate(`/perfilamigo?id=${id_user}`);
                window.location.reload();
              }
              else{
                navigate(`/perfilamigo?id=${id_user}`);
                setSidebar(false);
              }
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

        const handleIrUltimaLectura = (id_audiolibro) => {
            console.log('Ir a la ultima lectura') /* PROVISIONAL */
            if (location.pathname === '/libro') {
                navigate(`/libro?id=${id_audiolibro}`)
                window.location.reload();
              }
              else{
                navigate(`/libro?id=${id_audiolibro}`);
                setSidebar(false);
              }
        };

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
                                {amigo.ultimo !== null &&
                                <img 
                                className='ultima-lectura'
                                src={amigo.ultimo.img} /* FALTA LA PORTADA DE LA ULTIMA */
                                onClick={() => handleIrUltimaLectura(amigo.ultimo.id_audiolibro)}
                                onMouseEnter={(event) => handleMouseEnterUltimaLectura(event, amigo.ultimo.titulo)} /* CAMBIAR CUANDO TENGA LA CONSULTA */
                                onMouseLeave={handleMouseLeaveUltimaLectura} />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

export default ListaAmigosSidebar;
