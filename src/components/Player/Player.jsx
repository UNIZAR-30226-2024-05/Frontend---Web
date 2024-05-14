import { Play, Pause, ChevronDoubleLeft, ChevronDoubleRight, CakeOutline } from "heroicons-react"
import { SpeakerWaveIcon } from "@heroicons/react/24/outline"
import { useState, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import "./Player.css"
import { Howl } from "howler"
import {motion} from "framer-motion"

const Player = ({audioElem,isplaying, setisplaying, currentSong, portada}) => {

    const PlayPause = () => {
        setisplaying(!isplaying);
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
                <button className="prev" type="button">
                    <ChevronDoubleLeft margin-top='2%' size={40}/>
                </button>
                <Play className="play" margin-top='2%' size={40} onClick={PlayPause}/>
                <button className="skip" type="button">
                    <ChevronDoubleRight margin-top='2%' size={40}/>
                </button>
            </div>
        </div>
        
    )
}

export default Player