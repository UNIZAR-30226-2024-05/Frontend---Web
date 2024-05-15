import React, {useContext} from 'react';
import AuthContext from '../../context/AuthProvider';
import './Mensaje.css';

const Mensaje = ({ mensaje }) => {

    const { auth } = useContext(AuthContext)
    const { user_id } = auth;

    return (
      <>
        {mensaje.user_id === user_id ? (
            <div className="msg-container-propio">
                <div className='texto-msg'>
                    <span>{mensaje.mensaje}</span>
                </div>
            </div>

        ) : (
            <div className="msg-container-ajeno">
                <div className='texto-msg'>
                    <span>{mensaje.user_id}</span><span>{mensaje.mensaje}</span>
                </div>
            </div>
        )}
      </>
    );
};

export default Mensaje;