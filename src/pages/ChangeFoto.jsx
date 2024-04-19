import React from 'react'
import "./ChangeFoto.css"
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
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';




export const Changefoto = () => {

  const navigate = useNavigate();
  const URL_PERFIL = '/users/change_img'

  const handleClick = async (param) => {
    var respuesta;
    switch (param){
      case "perro":
        respuesta = await axios.post(URL_PERFIL, JSON.stringify('0'));
        break;
      case "gato":
        respuesta = await axios.post(URL_PERFIL, JSON.stringify('1'));
        break;
      case "rana":
        respuesta = await axios.post(URL_PERFIL, JSON.stringify('2'));
        break;
      case "leon":
        respuesta = await axios.post(URL_PERFIL, JSON.stringify('3'));
        break;
      case "pollo":
        respuesta = await axios.post(URL_PERFIL, JSON.stringify('4'));
        break;
      case "vaca":
        respuesta = await axios.post(URL_PERFIL, JSON.stringify('5'));
        break;
      case "buho":
        respuesta = await axios.post(URL_PERFIL, JSON.stringify('6'));
        break;
      case "perezoso":
        respuesta = await axios.post(URL_PERFIL, JSON.stringify('7'));
        break;
      case "doraemon":
        respuesta = await axios.post(URL_PERFIL, JSON.stringify('8'));
        break;
      case "pikachu":
        respuesta = await axios.post(URL_PERFIL, JSON.stringify('9'));
        break;
    }
    
    navigate('/perfil');
  };

  return (
    <div className='changefoto'>
        <div className='choose'>
          <h1>Elija la foto de perfil</h1>
        </div>
        <div className='rectangulo'>
            <button className='boton1' onClick={() => handleClick()}>
              <img className='foto1'src={perro}/>
            </button>
            <button className='boton2' onClick={() => handleClick()}>
              <img className='foto2'src={gato}/>
            </button>
            <button className='boton3' onClick={() => handleClick()}>
              <img className='foto3'src={rana}/>
            </button>
            <button className='boton4' onClick={() => handleClick()}>
              <img className='foto4'src={leon}/>
            </button>
            <button className='boton5' onClick={() => handleClick()}>
              <img className='foto5'src={pollo}/>
            </button>
            <button className='boton6' onClick={() => handleClick()}>
              <img className='foto6'src={vaca}/>
            </button>
            <button className='boton7' onClick={() => handleClick()}>
              <img className='foto7'src={buho}/>
            </button>
            <button className='boton8' onClick={() => handleClick()}>
              <img className='foto8'src={perezoso}/>
            </button>
            <button className='boton9' onClick={() => handleClick()}>
              <img className='foto9'src={doraemon}/>
            </button>
            <button className='boton10' onClick={() => handleClick()}>
              <img className='foto10'src={pikachu}/>
            </button>
        </div>
    </div>
  )
}

export default Changefoto