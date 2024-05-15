import React from 'react';
import AuthContext from '../../context/AuthProvider';

const Mensaje = ({ mensaje }) => {

    const { auth } = useContext(AuthContext)
    const { user_id } = auth;

    return (
      <div>
        {mensaje.user_id === user_id ? (
            <div className="msg-container-propio">
                <div className='texto-msg'>
                    <span>{msg.mensaje}</span>
                </div>
            </div>

        ) : (
            <div className="msg-container-ajeno">
                <div className='texto-msg'>
                    <span>{msg.user_id}</span><span>{msg.mensaje}</span>
                </div>
            </div>
        )}
      </div>
    );
};

export default Mensaje;