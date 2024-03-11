import React from 'react'
import portada from "../images/LOTR1.jpg"
import { Play, Pause } from "heroicons-react"
import { SpeakerWaveIcon } from "@heroicons/react/24/outline"
import { useState, useRef, useContext } from 'react';
import "./Reproductor.css"
import { Howl } from "howler"

const sound = {
    title: "Capitulo",
    waveType: "/Cancion.mp3",
    imageUrl: portada
};

const Reproductor = () => {
  const [play, setPlay] = useState(false)
  const [soundInstance, setSoundInstance] = useState(null)
  const MAX = 20;
  const sonidoRef = useRef<HTMLAudioElement>(null)

  //Función para cambiar el icono de play y pause además del estado del audio
  function toggleAudio(){
    if (play) {
        soundInstance.pause()
        setPlay(false)
    } else{
      const newSoundInstance = new Howl({
        src: [sound.waveType],
        autoplay: true,
        onend: () => {
          setPlay(false);
        }
      });
      setSoundInstance(newSoundInstance);
      setPlay(true);
    }
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
        <img className='portada'src={sound.imageUrl} />
        <button className='boton' type='button'
        onClick={toggleAudio}>
            {!play ? (
                <Play  margin-top='10px' size={40}/>
            ) : (
                <Pause margin-top='10px' size={40}/>
            )}
        </button>
        {/*Barra e icono para cambiar el volumen */}
        <div className='volumen'>
          <input className='barraVol' type='range' min={0} max={MAX} onChange={(e) => handleVolume(e)}/>
          <SpeakerWaveIcon className='altavoz' color='grey' height="20px"/>
        </div>
      </div>
    </main>
    
  );
}

export default Reproductor