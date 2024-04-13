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




export const Changefoto = () => {

  const navigate = useNavigate();

  const handleClick = (url) => {
    navigate('/perfil', { state: { nuevaFotoPerfil: url } });
  };

  return (
    <div className='changefoto'>
        <div className='choose'>
          <h1>Elija la foto de perfil</h1>
        </div>
        <div className='rectangulo'>
            <button className='boton1' onClick={() => handleClick(perro)}>
              <img className='foto1'src={perro}/>
            </button>
            <button className='boton2' onClick={() => handleClick(gato)}>
              <img className='foto2'src={gato}/>
            </button>
            <button className='boton3' onClick={() => handleClick(rana)}>
              <img className='foto3'src={rana}/>
            </button>
            <button className='boton4' onClick={() => handleClick(leon)}>
              <img className='foto4'src={leon}/>
            </button>
            <button className='boton5' onClick={() => handleClick(pollo)}>
              <img className='foto5'src={pollo}/>
            </button>
            <button className='boton6' onClick={() => handleClick(vaca)}>
              <img className='foto6'src={vaca}/>
            </button>
            <button className='boton7' onClick={() => handleClick(buho)}>
              <img className='foto7'src={buho}/>
            </button>
            <button className='boton8' onClick={() => handleClick(perezoso)}>
              <img className='foto8'src={perezoso}/>
            </button>
            <button className='boton9' onClick={() => handleClick(doraemon)}>
              <img className='foto9'src={doraemon}/>
            </button>
            <button className='boton10' onClick={() => handleClick(pikachu)}>
              <img className='foto10'src={pikachu}/>
            </button>
        </div>
    </div>
  )
}

export default Changefoto