import React, {useEffect} from 'react'
import { Play, Pause, ChevronDoubleLeft, ChevronDoubleRight, CakeOutline } from "heroicons-react"
import { SpeakerWaveIcon } from "@heroicons/react/24/outline"
import { useState, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import "./Reproductor.css"
import { Howl } from "howler"
import {motion} from "framer-motion"
import Player from '../components/Player/Player'




const Reproductor = () => {
/*
  const location = useLocation();  
  const params = new URLSearchParams(location.search);
  const capitulos = JSON.parse(params.get('capitulos'));
  const portada = params.get('portada');
  



  const [numCap, setNumCap] = useState(params.get('cap'));
  const [play, setPlay] = useState(false)
  const [soundInstance, setSoundInstance] = useState(null)
  const [currentTime, setCurrentTime] = useState(null);
  const [duracion, setDuracion ] = useState(null);
  const MAX = 20;
  const [limitInf, setLimitInf ] = useState(null);
  const [limitSup, setLimitSup ] = useState(null);
  const sonidoRef = useRef<HTMLAudioElement>(null)



  useEffect(() => {
    setLimitInf(0);
    setLimitSup(capitulos.length-1);
    console.log(limitSup);
  
  },)

  useEffect(() => {
    console.log("Nuevo valor de numCap", numCap);
  
  },[numCap])


  function obtenerCapiulo(capitulos, numCap){
    if(numCap >= 0 && numCap < capitulos.length){
      return capitulos[numCap];
    }
  }
  

  //Función para cambiar el icono de play
  function toggleAudio(capitulo) {
    if (play) {
      // Pausa el audio y almacena la posición de reproducción actual
      if (soundInstance){
        soundInstance.pause();
        setCurrentTime(soundInstance.seek());
      }
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
            },
            onload: () => {
              setDuracion(newSoundInstance.duration())
            }
          });
          setSoundInstance(newSoundInstance); // Establece la nueva instancia de sonido
          //setDuracion(newSoundInstance.duration())
        } catch (error) {
          // Maneja cualquier excepción relacionada con la creación del contexto de audio
          console.error('Error al crear la instancia de sonido:', error);
          // Puedes realizar alguna acción adicional aquí si es necesario
        }
      }
      // Restablece la posición de reproducción almacenada a null
      setCurrentTime(null);
      setPlay(true);
      //requestAnimationFrame(updateProgress);
    }
  }

 
  
  

function skipCancion(capitulos, numCap) {
  //console.log(capitulos);
  //console.log(capitulos.length);
  //console.log(limitSup);
  console.log(numCap);
  if(numCap < limitSup){
    // Pausa el audio actual
    soundInstance.pause();
    setCurrentTime(soundInstance.seek());
    
    setPlay(false);

    // Crea una nueva instancia de sonido para el siguiente capítulo
    try {
      const newSoundInstance = new Howl({
        src: [obtenerCapiulo(capitulos,numCap+1).audio],
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
    setNumCap(numCap + 1);
    console.log(numCap);
  }
  else{
    console.log("Has llegado al fin del vector");
  }
  
} 


function skipCancion(capitulos, numCap) {
  // Actualiza el índice
  setNumCap(numCap + 1);
  if (numCap < limitSup) {
    
    // Descarga la instancia de sonido actual si está definida
    if (soundInstance) {
      soundInstance.unload();
    }

    // Crea una nueva instancia de sonido para el siguiente capítulo
    try {
      console.log("Antes de crear audio", numCap);
      const newSoundInstance = new Howl({
        src: [obtenerCapiulo(capitulos, numCap).audio],
        autoplay: false, // No autoplay
        onend: () => {
          setPlay(false);
        }
      });
      setSoundInstance(newSoundInstance);
    } catch (error) {
      console.error('Error al crear la instancia de sonido:', error);
    }
    console.log("Despues de crear audio", numCap);
  } else {
    console.log("Has llegado al fin del vector");
  }
}



// Función para crear el audio basado en el nuevo numCap
function crearNuevoAudio(numCap) {
  try {
    console.log("Antes de crear audio", numCap);
    const newSoundInstance = new Howl({
      src: [obtenerCapiulo(capitulos, numCap).audio],
      autoplay: false, // No autoplay
      onend: () => {
        setPlay(false);
      }
    });
    setSoundInstance(newSoundInstance);
  } catch (error) {
    console.error('Error al crear la instancia de sonido:', error);
  }
}

// useEffect para ejecutar la función de creación de audio cuando numCap se actualice
useEffect(() => {
  crearNuevoAudio(numCap);
}, [numCap]);

// Función skipCancion que actualiza numCap y espera a que numCap se actualice antes de crear el audio
function skipCancion(capitulos, numCap) {
  console.log("Para ver que se la pasa a skip", numCap);
  console.log("Para ver que limite es el superior", limitSup);
  // Actualiza el índice
  if (numCap < limitSup) {
      // Actualiza el índice
      setNumCap(prevNumCap => {
        const newNumCap = prevNumCap + 1;
        console.log("newNumCap", newNumCap);
        if (newNumCap <= limitSup) {
          console.log("Actualizado + 1", newNumCap);
          return newNumCap;
        } else {
          console.log("Error");
          return prevNumCap; // No actualices numCap si has alcanzado el límite superior
        }
      });
    console.log("Después de actualizar numCap en skipCancion", numCap);
  } else {
    console.log("Has llegado al fin del vector por arriba");
  }
}


function prevCancion(capitulos, numCap) {
  // Actualiza el índice
  console.log("Para ver que se la pasa a prev", numCap);
  console.log("Para ver que limite es el inferior", limitInf);
  if (numCap > limitInf) {
    setNumCap(numCap - 1);
    console.log("Después de actualizar numCap en prevCancion", numCap);
  } else {
    console.log("Has llegado al fin del vector por abajo");
  }
}


  function prevCancion(capitulos,numCap){
    if(numCap > limitInf){
      // Pausa el audio actual
      soundInstance.pause();
      setCurrentTime(soundInstance.seek());
      setPlay(false);

      // Crea una nueva instancia de sonido para el siguiente capítulo
      try {
        const newSoundInstance = new Howl({
          src: [obtenerCapiulo(capitulos,numCap-1).audio],
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
      setNumCap(numCap - 1);  
    }
    else{
      console.log("Has llegado al principio del vector.")
    }
    
  }
  
  

  //Función para subir o bajar el volumen
  function handleVolume(e){
    const { value } = e.target
    const volume = Number(value) / MAX
    soundInstance.volume(volume)
  }

  //Funcion para calcular el progreso de la barra
  function progreso(currentTime, duracion){
    //console.log(currentTime)
    //console.log(duracion)
    if(duracion == 0){
      return 0;
    }
    else{
      const calcular = (currentTime / duracion) * 100;
      //console.log(calcular)
      return calcular
    }
  } 

  */
  
  const [params, setParams] = useState(new URLSearchParams(location.search));
  const [numCap, setNumCap] = useState(params.get('cap'));
  const [capitulos, setCapitulos] = useState(JSON.parse(params.get('capitulos')));
  const [tiempoInicial, setTiempoInicial] = useState(params.get('time'));
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(capitulos[numCap]);
  const [portada, setPortada] = useState(params.get('portada'));

  //console.log("Audio", currentSong.audio);

  const audioElem = useRef();

  useEffect(() => {
    if(isplaying){
      //console.log("Tiempo inicial", tiempoInicial);
      //audioElem.current.currentTime = tiempoInicial;
      audioElem.current.play();
    }
    else{
      audioElem.current.pause();
    }
  }, [isplaying, currentSong])


  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({ ...currentSong, "progress":ct / duration * 100, "length":duration })
    //console.log(duration, ct);
  }

  return (
    <main>
      <div className='reproductor'>
        <audio src={currentSong.audio} ref={audioElem} onTimeUpdate={onPlaying}/>
        <Player capitulos={capitulos} setCapitulos={setCapitulos} isplaying={isplaying} setisplaying={setisplaying} 
        audioElem={audioElem} currentSong={currentSong} portada={portada} setCurrentSong={setCurrentSong}/>
      </div>
    </main>
    
  );
}

export default Reproductor