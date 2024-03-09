import React from 'react'
import portada from "../images/LOTR1.jpg"
import { PlayIcon, PauseIcon } from "@heroicons/react/20/solid"
import { SpeakerWaveIcon } from "@heroicons/react/24/outline"
import { useState, useRef, useContext } from 'react';


const sound = {
    title: "Capitulo",
    waveType: "Cancion.mp3",
    imageUrl: portada
};

const Reproductor = () => {
  const [play, setPlay] = useState(false)
  const MAX = 20;
  const sonidoRef = useRef<HTMLAudioElement>(null)

  function toggleAudio(){
    if (play) {
        sonidoRef.current?.pause()
        setPlay(false)
    } else{
        sonidoRef.current?.play()
        setPlay(true)
    }
  }

  function handleVolume(e){
    const { value } = e.target
    const volume = Number(value) / MAX
    sonidoRef.current.volume = volume
  }

  return (
    <div className='player'>
        <img className='portada'src={sound.imageUrl} />
        
    </div>
  );
}

export default Reproductor