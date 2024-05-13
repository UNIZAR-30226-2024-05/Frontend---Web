import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MensajesClub.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';

const MensajesClub = ({ club, setClub }) => {

    const [listaMensajes, setListaMensajes] = useState(club.messages);
    const [nuevoMensaje, setNuevoMensaje] = useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [listaMensajes]);

    /* Actualiza info al actualizar la lista de mensajes */
    useEffect(() => {
        console.log(listaMensajes);
        setClub({...club, messages: listaMensajes});
        console.log({club});
    }, [listaMensajes]);
    
      const handleChangeNewMsg = event => {
        setNuevoMensaje([event.target.value]);
    } 

    async function enviarMensaje() {
        console.log({nuevoMensaje});
        setListaMensajes([...listaMensajes, nuevoMensaje]);
        setNuevoMensaje('');
    }

    const handleEnviarMensaje = () => {
        enviarMensaje();
        
    }

    {/* En que se pueda, cambiar todo lo de libros por una consulta al servidor. */}

    return (
    <div className='contenedor-mensajes'>
        <div className='lista'>
            {listaMensajes.map((msg, i) => (
                <div key={i}
                className='mensaje'>
                    <div className='contenido-msg'>
                        <div className='texto-msg'>
                            <span>{msg.mensaje}</span>
                        </div>
                    </div>
                </div>
              ))}
        </div>
        <div className='escribir-msg-container'>
            
            <input className='escribir-msg'
                placeholder='Escriba el mensaje'
                value={nuevoMensaje}
                onChange={handleChangeNewMsg}
            />
            <button className='button-send' onClick={handleEnviarMensaje}>
                <FontAwesomeIcon icon={faArrowRight} />
            </button>

        </div>
        
    </div>
  )
}

export default MensajesClub