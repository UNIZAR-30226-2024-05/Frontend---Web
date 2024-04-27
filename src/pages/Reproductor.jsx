import React from 'react'
import { Play, Pause, ChevronDoubleLeft, ChevronDoubleRight, CakeOutline } from "heroicons-react"
import { SpeakerWaveIcon } from "@heroicons/react/24/outline"
import { useState, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import "./Reproductor.css"
import { Howl } from "howler"
import {motion} from "framer-motion"


/*
const sound = {
    title: "Capitulo",
    waveType: "/Cancion.mp3",
    imageUrl: portada
};

const sound2 = {
  title: "Capitulo",
  waveType: "/Cancion2.mp3",
  imageUrl: portada2
}*/

const Reproductor = () => {

  const location = useLocation();  

  const capitulos = location.state?.capitulos;
  //console.log(capitulos)
  const portada = location.state?.portada;

  const [play, setPlay] = useState(false)
  const [soundInstance, setSoundInstance] = useState(null)
  const [currentTime, setCurrentTime] = useState(null);
  const [duracion, setDuracion ] = useState(null);
  const MAX = 20;
  const [indice, setIndice] = useState(0)
  const sonidoRef = useRef<HTMLAudioElement>(null)


  function obtenerCapiulo(capitulos, indice){
    if(indice >= 0 && indice < capitulos.length){
      return capitulos[indice];
    }
  }
  //console.log(obtenerCapiulo(capitulos, 0));

  //Función para cambiar el icono de play
  function toggleAudio(capitulo) {
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
        try {
          // Intenta crear la instancia de sonido
          const newSoundInstance = new Howl({
            src: [capitulo.audio],
            autoplay: true,
            onend: () => {
              setPlay(false);
            }
          });
          setSoundInstance(newSoundInstance); // Establece la nueva instancia de sonido
          setDuracion(newSoundInstance.duration())
        } catch (error) {
          // Maneja cualquier excepción relacionada con la creación del contexto de audio
          console.error('Error al crear la instancia de sonido:', error);
          // Puedes realizar alguna acción adicional aquí si es necesario
        }
      }
      // Restablece la posición de reproducción almacenada a null
      setCurrentTime(null);
      setPlay(true);
    }
  }
  
  
  
function skipCancion(capitulo, indice) {
  // Pausa el audio actual
  soundInstance.pause();
  setCurrentTime(soundInstance.seek());
  setPlay(false);
  
  // Crea una nueva instancia de sonido para el siguiente capítulo
  try {
    const newSoundInstance = new Howl({
      src: [obtenerCapiulo(capitulos,indice+1).audio],
      autoplay: false, // No autoplay
      onend: () => {
        setPlay(false);
      }
    });
    setSoundInstance(newSoundInstance);
  } catch (error) {
    console.error('Error al crear la instancia de sonido:', error);
  }
  
  // Actualiza el índice
  setIndice(indice + 1);
}

  
  function prevCancion(capitulos,indice){
    // Pausa el audio actual
  soundInstance.pause();
  setCurrentTime(soundInstance.seek());
  setPlay(false);
  
  // Crea una nueva instancia de sonido para el siguiente capítulo
  try {
    const newSoundInstance = new Howl({
      src: [obtenerCapiulo(capitulos,indice-1).audio],
      autoplay: false, // No autoplay
      onend: () => {
        setPlay(false);
      }
    });
    setSoundInstance(newSoundInstance);
  } catch (error) {
    console.error('Error al crear la instancia de sonido:', error);
  }
  
  // Actualiza el índice
  setIndice(indice - 1);
  }
  

  //Función para subir o bajar el volumen
  function handleVolume(e){
    const { value } = e.target
    const volume = Number(value) / MAX
    soundInstance.volume(volume)
  }


  //Funcion para calcular el progreso de la barra
  function progreso(currentTime, duracion){
    console.log(currentTime)
    console.log(duracion)
    if(duracion == 0){
      return 0;
    }
    else{
      const calcular = (currentTime / duracion) * 100;
      //console.log(calcular)
      return calcular
    }
  }

  return (
    <main>
      <div className='player'>
        <img className='portada'src={portada} />
        <h2 margin-top='5%' className='cap'>{capitulos[indice].nombre}</h2>
        {/*Botones para el control de la cancion*/}
        <div className='botones'>
          <button className='anteriorCancion' type='button' onClick={() => prevCancion(capitulos, indice)}>
            <ChevronDoubleLeft margin-top='2%' size={40}/>
          </button>
          <button className='boton' type='button' onClick={() => toggleAudio(obtenerCapiulo(capitulos, indice))}>
              {!play ? (
                  <Play  margin-top='2%' size={40}/>
              ) : (
                  <Pause margin-top='2%' size={40}/>
              )}
          </button>
          <button className='siguienteCancion' type='button' onClick={() => skipCancion(capitulos, indice)}>
            <ChevronDoubleRight margin-top='2%' size={40}/>
          </button>
        </div>
        <div className='progressbar-container'>
          <div className='progressbar'>
            <motion.div className='bar'
            animate={{width: `${progreso(currentTime, duracion)}%`}}
            transition={{duration: 0.1}}
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