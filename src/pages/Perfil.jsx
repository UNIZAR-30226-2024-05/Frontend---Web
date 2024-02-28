import React from 'react'
import "./Perfil.css"
import { useNavigate } from 'react-router-dom'

export const Perfil = () => {
  const navigate = useNavigate()
  return (
    <div className='perfil'>
        <div className='Foto'>
          <button className='BotonFoto' type='button' onClick={() => {navigate("/changefoto")}}>Cambiar la foto</button>
        </div>
        <div className='Nombre'>
          <button className='BotonNombre' type='button' onClick={() => {navigate("/changenombre")}}>Cambiar el nombre</button>
        </div>
        <div className='Correo'>
          <button className='BotonCorreo' type='button' onClick={() => {navigate("/changecorreo")}}>Cambiar el correo</button>
        </div>
        <div className='Contrasegna'>
          <button className='BotonContrasegna' type='button' onClick={() => {navigate("/changepwd")}}>Cambiar la contraseña</button>
        </div>
    </div>
  )
}

export default Perfil