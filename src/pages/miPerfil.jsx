import React from 'react';
import "./miPerfil.css"
import { useNavigate } from 'react-router-dom';




const miPerfil = () => {
    const navigate = useNavigate()

    return (
      <div className='miperfil'>
        <div className='Foto'>
            <button className='BotonFoto' type='button'>Foto de Perfil</button>
        </div>
        <div className='Nombre'>
            <button className='BotonNombre' type='button'>Nombre de Usuario</button>
        </div>
        <div className='Correo'>
            <button className='BotonCorreo' type='button'>Correo</button>
        </div>
        <div className='Contrasegna'>
            <button className='BotonContrasegna' type='button' onClick={() => {navigate("/changepwd")}}>Cambiar la contraseña</button>
        </div>
      </div>
    );
  }

export default miPerfil;