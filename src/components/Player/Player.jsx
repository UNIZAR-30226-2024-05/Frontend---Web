import { Play, Pause, ChevronDoubleLeft, ChevronDoubleRight, CakeOutline } from "heroicons-react"
import { SpeakerWaveIcon } from "@heroicons/react/24/outline"
import { useState, useRef, useContext, useEffect } from 'react';
import axios from "../../api/axios";
import "./Player.css"

const Player = ({audioElem, isplaying, setisplaying, currentSong, portada, setCurrentSong, capitulos}) => {

    const clickRef = useRef();

    const [crearMarcapaginas, setCrearMarcapaginas] = useState(false);
    const showCrearMarcapaginas = () => {
        setCrearMarcapaginas(!crearMarcapaginas)
    };
    
    const params = new URLSearchParams(location.search);
    const time = JSON.parse(params.get('time'));
    const dist = JSON.parse(params.get('dist'));

    const [intervalId, setIntervalId] = useState(null);

    const [nuevoMarcapaginas, setNuevoMarcapaginas] = useState('');

    const PlayPause = () => {
        if(dist == 1){
            console.log("Ha entrado");
            audioElem.current.currentTime = time;
        }
        else if (!isplaying) {
            // Iniciar intervalo de posteo cada 10 segundos
            const id = setInterval(postFunction, 10000);
            setIntervalId(id);
        } else {
            // Detener intervalo al pausar la reproducción
            clearInterval(intervalId);
        }
        ultimaActividad();
        setisplaying(!isplaying);
    };

    const URL_ULTIMA = '/marcapaginas/listening';
    async function ultimaActividad(){
        const capitulo = currentSong.id;
        const horas = parseInt(audioElem.current.currentTime / 3600);
        const minutos = parseInt((audioElem.current.currentTime - horas * 3600) / 60);
        const segundos = parseInt(audioElem.current.currentTime - horas * 3600 - minutos * 60);
        const tiempo = `${horas}:${minutos}:${segundos}`;
        console.log(capitulo);
        console.log(tiempo);
        await axios.post(URL_ULTIMA,
            JSON.stringify({capitulo, tiempo}),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then(response=>{
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const postFunction = () => {
        ultimaActividad();
        console.log("Post enviado");
    };

    useEffect(() => {
        // Limpiar intervalo cuando se desmonta el componente
        return () => {
            clearInterval(intervalId);
        };
    }, [isplaying]);



    const URL_CREAR = '/marcapaginas/create'
    async function handleClickSubmitMarcapaginas(){
        const capitulo = currentSong.id;
        const horas = parseInt(audioElem.current.currentTime / 3600);
        const minutos = parseInt((audioElem.current.currentTime - horas * 3600) / 60);
        const segundos = parseInt(audioElem.current.currentTime - horas * 3600 - minutos * 60);
        const tiempo = `${horas}:${minutos}:${segundos}`;
        await axios.post(URL_CREAR,
            JSON.stringify({titulo:nuevoMarcapaginas, capitulo, tiempo}),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then(response=>{
            console.log(response.data);
            setNuevoMarcapaginas('');
            setCrearMarcapaginas(false);
        }).catch(error=>{
            console.log(error);
        })
    }

    const handleNuevoMarcapaginas = (event) => {
        setNuevoMarcapaginas(event.target.value);
    }


    useEffect(() => {
        const handleChapterEnd = () => {
          const index = capitulos.findIndex(x => x.nombre === currentSong.nombre); 
          if (index < capitulos.length - 1) {
            setCurrentSong(capitulos[index + 1]);
          } else {
            console.log("Has llegado al final del último capítulo");
            clearInterval(intervalId);
          }
        };
      
        const audioElement = audioElem.current;
        if(audioElement){
            // Agregar el evento 'ended' al elemento <audio>
            audioElem.current.addEventListener('ended', handleChapterEnd);
      
            // Limpiar el evento al desmontar el componente
            return () => {
                if (audioElem.current){
                    audioElem.current.removeEventListener('ended', handleChapterEnd);
                }
            };
        }
      }, [currentSong, capitulos, audioElem]);


    const checkWidth = (e) => {
        if (!isNaN(audioElem.current.duration)) {
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        const divprogress = offset / width * 100;
        const newTime = divprogress * currentSong.length;
        audioElem.current.currentTime = newTime;
        console.log(width);
        console.log(offset);
        console.log(divprogress);
        console.log(currentSong.length);
        console.log(audioElem.current.currentTime);
        console.log("New current time:", newTime);
        } else {
            console.log("El audio no está completamente cargado.");
        }
    }

    const skipBack = () => {
        const index = capitulos.findIndex(x => x.nombre === currentSong.nombre); 
        if(index > 0){
            setCurrentSong(capitulos[index - 1]);
        }
        else{
            console.log("Has llegado al limite inferior")
        }
    }

    const skiptoNext = () => {
        const index = capitulos.findIndex(x => x.nombre === currentSong.nombre); 
        if(index < capitulos.length-1){
            setCurrentSong(capitulos[index + 1]);
        }
        else{
            console.log("Has llegado al limite superior")
        }
    }

    return(
        <div className="PlayerContainer">
            <img className='imagen' src={portada} />
            <div className="title">
                <p>{currentSong.nombre}</p>
            </div>
            <div className="Navigation">
                <div className="NavigationWrapper" onMouseDown={checkWidth} ref={clickRef}>
                    <div className="seekbar" style={{width: `${currentSong.progress+"%"}`}}></div>
                </div>
            </div>
            <div className="Controlls">
                <button type="button" >
                    <ChevronDoubleLeft className="prev" margin-top='2%' size={40} onClick={skipBack}/>
                </button>
                <button type="button">
                    {isplaying ? <Pause className="pause" margin-top='2%' size={40} onClick={PlayPause}/>
                    : <Play className="play" margin-top='2%' size={40} onClick={PlayPause}/>}
                </button>
                <button type="button" >
                    <ChevronDoubleRight className="skip" margin-top='2%' size={40} onClick={skiptoNext}/>
                </button>
                <button type ="button" className="Marcapag" margin-top='2%' size={40} onClick={showCrearMarcapaginas}>Crear Marcapaginas</button>
                { crearMarcapaginas ? (
                    <div className='crear-marcapaginas-container'>
                        <input className="nombre-nuevo-marcapginas" placeholder='Cómo quiere llamar a su nueva colección'
                        value={nuevoMarcapaginas}
                        onChange={handleNuevoMarcapaginas}/>
                        <button className="submit-marcapaginas-button" onClick={handleClickSubmitMarcapaginas}>Enter</button>
                    </div>
                ) : null }
            </div>
        </div>
        
    )
}

export default Player