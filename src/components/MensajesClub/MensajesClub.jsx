import React, { useEffect, useState, useRef, useContext } from 'react';
import './MensajesClub.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/AuthProvider';

const MensajesClub = ({ club, setClub }) => {

    const [listaMensajes, setListaMensajes] = useState(club.messages);
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const messagesEndRef = useRef(null);

    const { auth, socket } = useContext(AuthContext);
    const { user_id } = auth;
    const [prevUser_id, setPrevUser_id] = useState(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        setListaMensajes(club.messages);
    }, [club]);

    useEffect(() => {
        scrollToBottom();
    }, [listaMensajes]);

    /* Actualiza info al actualizar la lista de mensajes */
    useEffect(() => {
        console.log(listaMensajes);
        setClub({...club, messages: listaMensajes});
        console.log(club);
    }, [listaMensajes]);
    
      const handleChangeNewMsg = event => {
        setNuevoMensaje(event.target.value);
    } 

    const enviarMensaje = () => {
        console.log('Por dios funciona');
        console.log(socket);
        console.log(auth);
        if (socket) {
            // Emitir el evento 'message' al servidor con los datos del mensaje y el ID del club
            socket.emit('message', { club_id: club.id, msg: nuevoMensaje });
            // Limpiar el campo del nuevo mensaje
            setNuevoMensaje('');
        }
    };

    const handleEnviarMensaje = () => {
        enviarMensaje();
    }

    const handleClickUsuario = (id_user) => {
        navigate(`/perfilamigo?id=${id_user}`);
    }

    {/* En que se pueda, cambiar todo lo de libros por una consulta al servidor. */}

    return (
    <div className='contenedor-mensajes'>
        <div className='lista'>
            {listaMensajes.map((msg, i) => {
                // Actualizar prevUser_id después de cada iteración
                setPrevUser_id(msg.user_id);
                return (
                <div key={i} className={msg.user_id === user_id ? 'mensaje-propio' : 'mensaje-ajeno'}>
                    {msg.user_id !== user_id && msg.user_id !== prevUser_id &&
                    <div className='username-msg'>
                        <span onClick={handleClickUsuario(msg.user_id)}>{msg.username}:</span>
                    </div>}
                    <div className='ajeno-msg'>
                        <span>{msg.mensaje}</span>
                    </div>
                </div>);
            })}
        </div>
        <div className='escribir-msg-container'>
            
            <input className='escribir-msg'
                placeholder='Escriba el mensaje'
                value={nuevoMensaje}
                onChange={handleChangeNewMsg}
            />
            <button className='button-send' disabled={!nuevoMensaje.trim()} onClick={handleEnviarMensaje}>
                <FontAwesomeIcon icon={faArrowRight} />
            </button>

        </div>
        
    </div>
  )
}

export default MensajesClub