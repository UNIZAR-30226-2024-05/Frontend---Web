import React from 'react';
import "./miPerfil.css"
import { useNavigate } from 'react-router-dom';




const miPerfil = () => {
    const navigate = useNavigate()

    return (
      <div className='miperfil'>
        <div className='Foto'>
            <button className='BotonFoto' type='button' onClick={() => {navigate("/changefoto")}}>Foto de Perfil</button>
        </div>
        <div className='Nombre'>
            <button className='BotonNombre' type='button' onClick={() => {navigate("/changenombre")}}>Nombre de Usuario</button>
        </div>
        <div className='Correo'>
            <button className='BotonCorreo' type='button' onClick={() => {navigate("/changecorreo")}}>Correo</button>
        </div>
        <div className='Contrasegna'>
            <button className='BotonContrasegna' type='button' onClick={() => {navigate("/changepwd")}}>Cambiar la contraseña</button>
        </div>
      </div>
    );
  }

export default miPerfil;