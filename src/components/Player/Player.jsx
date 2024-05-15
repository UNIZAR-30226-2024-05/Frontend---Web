import { Play, Pause, ChevronDoubleLeft, ChevronDoubleRight, CakeOutline } from "heroicons-react"
import { SpeakerWaveIcon } from "@heroicons/react/24/outline"
import { useState, useRef, useContext } from 'react';
import "./Player.css"

const Player = ({audioElem, isplaying, setisplaying, currentSong, portada, setCurrentSong, capitulos}) => {

    const clickRef = useRef();

    const PlayPause = () => {
        setisplaying(!isplaying);
    }

    const checkWidth = (e) => {
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;

        const divprogress = offset / width * 100;
        audioElem.current.currentTime = divprogress;
        console.log(width);
        console.log(offset);
        console.log(divprogress);
        console.log(audioElem.current.currentTime);
    }

    const skipBack = () => {
        const index = capitulos.findIndex(x => x.nombre == currentSong.nombre); 
        if(index > 0){
            setCurrentSong(capitulos[index - 1])
            audioElem.current.currentTime = 0;
        }
        else{
            console.log("Has llegado al limite inferior")
        }
    }

    const skiptoNext = () => {
        const index = capitulos.findIndex(x => x.nombre == currentSong.nombre); 
        if(index < capitulos.length-1){
            setCurrentSong(capitulos[index + 1])
            audioElem.current.currentTime = 0;
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
                <div className="NavigationWrapper" onClick={checkWidth} ref={clickRef}>
                    <div className="seekbar" style={{width: `${currentSong.progress+"%"}`}}></div>
                </div>
            </div>
            <div className="Controlls">
                <button type="button" >
                    <ChevronDoubleLeft className="prev" margin-top='2%' size={40} onClick={skipBack}/>
                </button>
                <button type="button">
                    {isplaying ? <Play className="play" margin-top='2%' size={40} onClick={PlayPause}/>
                    : <Pause className="pause" margin-top='2%' size={40} onClick={PlayPause}/>}
                </button>
                <button type="button" >
                    <ChevronDoubleRight className="skip" margin-top='2%' size={40} onClick={skiptoNext}/>
                </button>
            </div>
        </div>
        
    )
}

export default Player