import React, { useEffect, useState, useRef } from 'react';
import './MensajesClub.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/AuthProvider';

const MensajesClub = ({ club, setClub }) => {

    const [listaMensajes, setListaMensajes] = useState(club.messages);
    const [nuevoMensaje, setNuevoMensaje] = useState([]);
    const messagesEndRef = useRef(null);

    const { auth } = useContext(AuthContext)
    const { user_id, socket } = auth;

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
        setNuevoMensaje(event.target.value);
    } 

    const enviarMensaje = () => {
        if (socket) {
            // Emitir el evento 'message' al servidor con los datos del mensaje y el ID del club
            socket.emit('message', { club_id: club.id, msg: nuevoMensaje });
            // Actualizar la lista de mensajes localmente
            setListaMensajes([...listaMensajes, { mensaje: nuevoMensaje, user_id }]);
            // Limpiar el campo del nuevo mensaje
            setNuevoMensaje('');
        }
    };

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
                        <span>{msg.user_id}</span><span>{msg.mensaje}</span>
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