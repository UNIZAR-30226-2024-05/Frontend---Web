import { Play, Pause, ChevronDoubleLeft, ChevronDoubleRight, CakeOutline } from "heroicons-react"
import { SpeakerWaveIcon } from "@heroicons/react/24/outline"
import { useState, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import "./Player.css"
import { Howl } from "howler"
import {motion} from "framer-motion"

const Player = ({audioElem, isplaying, setisplaying, currentSong, portada, setCurrentSong, capitulos}) => {

    const PlayPause = () => {
        setisplaying(!isplaying);
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
        if(index > capitulos.length-1){
            setCurrentSong(capitulos[index + 1])
            audioElem.current.currentTime = 0;
        }
        else{
            console.log("Has llegado al limite inferior")
        }
    }

    return(
        <div className="PlayerContainer">
            <img className='imagen' src={portada} />
            <div className="title">
                <p>{currentSong.nombre}</p>
            </div>
            <div className="Navigation">
                <div className="NavigationWrapper">
                    <div className="seekbar" style={{width: `${currentSong.progress+"%"}`}}></div>
                </div>
            </div>
            <div className="Controlls">
                <button type="button" >
                    <ChevronDoubleLeft className="prev" margin-top='2%' size={40} onClick={skipBack}/>
                </button>
                <Play className="play" margin-top='2%' size={40} onClick={PlayPause}/>
                <button type="button" >
                    <ChevronDoubleRight className="skip" margin-top='2%' size={40} onClick={skiptoNext}/>
                </button>
            </div>
        </div>
        
    )
}

export default Player