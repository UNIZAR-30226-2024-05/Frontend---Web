import { Play, Pause, ChevronDoubleLeft, ChevronDoubleRight, CakeOutline } from "heroicons-react"
import { SpeakerWaveIcon } from "@heroicons/react/24/outline"
import { useState, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
//import "./Reproductor.css"
import { Howl } from "howler"
import {motion} from "framer-motion"

const Player = ({audioElem,isplaying, setisplaying, currentSong}) => {

    const PlayPause = () => {
        setisplaying(!isplaying);
    }

    return(
        <div className="PlayerContainer">
            <div className="title">
                <p>currentSong.nombre</p>
            </div>
            <div className="Navigation">
                <div className="NavigationWrapper">
                    <div className="seekbar" style={{width:'50%'}}></div>
                </div>
            </div>
            <div className="Controlls">
                <button className="prev" type="button">
                    <ChevronDoubleLeft margin-top='2%' size={40}/>
                </button>
                <button className="action" type="button">
                    {isplaying ? <Play  margin-top='2%' size={40} onClick={PlayPause}/>
                        : <Pause margin-top='2%' size={40}/>
                    }
                </button>
                <button className="skip" type="button">
                    <ChevronDoubleLeft margin-top='2%' size={40}/>
                </button>
            </div>
        </div>
        
    )
}