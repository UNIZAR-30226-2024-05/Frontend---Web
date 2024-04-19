import React from 'react'
import portada from "../images/LOTR1.jpg"
import portada2 from "../images/LOTR2.jpg"
import { Play, Pause, ChevronDoubleLeft, ChevronDoubleRight } from "heroicons-react"
import { SpeakerWaveIcon } from "@heroicons/react/24/outline"
import { useState, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import "./Reproductor.css"
import { Howl } from "howler"
import {motion} from "framer-motion"


const sound = {
    title: "Capitulo",
    waveType: "/Cancion.mp3",
    imageUrl: portada
};

const sound2 = {
  title: "Capitulo",
  waveType: "/Cancion2.mp3",
  imageUrl: portada2
}

const Reproductor = () => {
  const [play, setPlay] = useState(false)
  const [soundInstance, setSoundInstance] = useState(null)
  const [currentTime, setCurrentTime] = useState(null);
  const MAX = 20;
  const sonidoRef = useRef<HTMLAudioElement>(null)

  const location = useLocation();

  const capitulo = location.state?.capitulo;
  const portada = location.state?.portada;
  console.log(capitulo);
  console.log(portada);

  //Función para cambiar el icono de play y pause además del estado del audio
  function toggleAudio(){
    if (play) {
      // Pausa el audio y almacena la posición de reproducción actual
      soundInstance.pause();
      setCurrentTime(soundInstance.seek());
      setPlay(false);
    } else {
      // Comprueba si hay una posición de reproducción almacenada
      if (currentTime !== null) {
        // Si hay una posición almacenada, reanuda la reproducción desde esa posición
        soundInstance.play();
        soundInstance.seek(currentTime);
      } else {
        // Si no hay una posición almacenada, inicia la reproducción desde el principio
        const newSoundInstance = new Howl({
          src: [sound.waveType],
          autoplay: true,
          onend: () => {
            setPlay(false);
          }
        });
        setSoundInstance(newSoundInstance); // Establece la nueva instancia de sonido
      }
      // Restablece la posición de reproducción almacenada a null
      setCurrentTime(null);
      setPlay(true);
    }
  }
  
  function skipCancion(){
    if (currentTime !== null) {
      // Si hay una posición almacenada, reanuda la reproducción desde esa posición
      soundInstance.play();
      soundInstance.seek(currentTime);
    } else {
      // Si no hay una posición almacenada, inicia la reproducción desde el principio
      const newSoundInstance = new Howl({
        src: [sound2.waveType],
        autoplay: true,
        onend: () => {
          setPlay(false);
        }
      });
      setSoundInstance(newSoundInstance); // Establece la nueva instancia de sonido
    }
    // Restablece la posición de reproducción almacenada a null
    setCurrentTime(null);
    setPlay(true);
  }
  
  

  //Función para subir o bajar el volumen
  function handleVolume(e){
    const { value } = e.target
    const volume = Number(value) / MAX
    soundInstance.volume(volume)
  }

  return (
    <main>
      <div className='player'>
        <img className='portada'src={portada} />
        {/*Botones para el control de la cancion*/}
        <div className='botones'>
          <button className='anteriorCancion' type='button'>
            <ChevronDoubleLeft margin-top='10px' size={40}/>
          </button>
          <button className='boton' type='button'
          onClick={toggleAudio}>
              {!play ? (
                  <Play  margin-top='10px' size={40}/>
              ) : (
                  <Pause margin-top='10px' size={40}/>
              )}
          </button>
          <button className='siguienteCancion' type='button' onClick={skipCancion}>
            <ChevronDoubleRight margin-top='10px' size={40}/>
          </button>
        </div>
        <div className='progressbar-container'>
          <div className='progressbar'>
            <motion.div className='bar'
            animate={{width: "75%"}}
            transition={{duration: 2}}
                />
          </div>
        </div>
        {/*Barra e icono para cambiar el volumen */}
        <div className='volumen'>
          <input className='barraVol' type='range' min={0} max={MAX} onChange={(e) => handleVolume(e)}/>
          <SpeakerWaveIcon className='altavoz' color='black' height="20px"/>
        </div>
      </div>
    </main>
    
  );
}

export default Reproductor