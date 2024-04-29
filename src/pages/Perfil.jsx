import React from 'react'
import "./Perfil.css"
import { useNavigate } from 'react-router-dom'
//import perro from "../images/fotos-perfil/perro.jpg"
import axios from '../api/axios';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import perro from "../images/fotos-perfil/perro.jpg"
import gato from "../images/fotos-perfil/gato.jpg"
import rana from "../images/fotos-perfil/rana.jpg"
import leon from "../images/fotos-perfil/leon.jpg"
import pollo from "../images/fotos-perfil/pollo.jpg"
import vaca from "../images/fotos-perfil/vaca.jpg"
import buho from "../images/fotos-perfil/buho.jpg"
import perezoso from "../images/fotos-perfil/perezoso.jpg"
import doraemon from "../images/fotos-perfil/doraemon.jpg"
import pikachu from "../images/fotos-perfil/pikachu.jpg"

export const Perfil = () => {
  const URL_PERFIL = 'users/profile';
  const location = useLocation();
  const nuevaFotoPerfil = location.state?.nuevaFotoPerfil;

  
  const [perfil, setPerfil] = useState([]);

  useEffect(() => {
    axios.get(URL_PERFIL, {withCredentials: true})
    .then(response => {
      setPerfil(response.data);
      console.log(response.data);
    }).catch(err => {
      console.log(err)
    });
  }, [])

  const obtenerPerfil = () => {
    switch(perfil.img){
      case '0':
        return perro
        break;
      case '1':
        return gato
        break;
      case '2':
        return rana
        break;
      case '3':
        return leon;
        break;
      case '4':
        return pollo
        break;
      case '5':
        return vaca
        break;
      case '6':
        return buho
        break;
      case '7':
        return perezoso
        break;
      case '8':
        return doraemon
        break;
      case '9':
        return pikachu
        break;
    }
  }

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
          <img className='Img' src={obtenerPerfil()}/>
        </div>
        <div className='Nombre'>
          <h2>{reponse.data.username}</h2>
        </div>
    </div>
  )
}

export default Perfil