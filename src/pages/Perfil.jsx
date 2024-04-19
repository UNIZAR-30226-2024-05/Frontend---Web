import React from 'react'
import "./Perfil.css"
import { useNavigate } from 'react-router-dom'
//import perro from "../images/fotos-perfil/perro.jpg"
import axios from '../api/axios';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'

export const Perfil = () => {
  const URL_PERFIL = 'users/profile';
  const location = useLocation();
  const nuevaFotoPerfil = location.state?.nuevaFotoPerfil;

  
  const [perfil, setPerfil] = useState([]);

  useEffect(() => {
    axios.get(URL_PERFIL)
    .then(response => {
      setPerfil(response.data);
      console.log(response.data);
    }).catch(err => {
      console.log(err)
    });
  }, [])

  const navigate = useNavigate()
  return (
    <div className='perfil'>
        <div className='Botones'>
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
        <div className='Imagen'>
          <img className='Img' src={perfil.img}/>
        </div>
        <div className='Nombre'>
          {/*<text src={response.data.username}/>*/}
        </div>
    </div>
  )
}

export default Perfil