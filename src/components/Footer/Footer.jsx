import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const BolaNegra = () => {
    return <FontAwesomeIcon icon={faCircle} style={{ color: 'black', marginRight: '5px' }} />;
  };

  return (
    <div className='footer'>
      <div>
        <h3>Sobre nosotros</h3>
        <p>¿Quiénes somos?</p>
        <p>Somos el equipo Carol Shaw de la asignatura de Proyecto Software de Ingeniería Informática en la Escuela de Ingeniería y Arquitectura en Zaragoza. A continuación presentamos a sus miembros:</p>
        <p><BolaNegra/>Pablo Latre Villacampa</p>
        <p><BolaNegra/>Ismael Martínez Vicens</p>
        <p><BolaNegra/>Luis Daniel Gómez Sevilla</p>
        <p><BolaNegra/>Alicia Lázaro Huerta</p>
        <p><BolaNegra/>Manel Jordá Puig Rubio</p>
        <p><BolaNegra/>Elizabeth Lilai Naranjo Ventura</p>
        <p><BolaNegra/>Curro Valero Casajús</p>
        <p><BolaNegra/>Daniel Villarreal Gurrea</p>
      </div>
      <div>
        <h3>Contáctanos</h3>
        <p><FontAwesomeIcon icon={faEnvelope} style={{ color: 'black', marginRight: '5px' }} />
          <a href='mailto: narratives.unizar@gmail.com'/>
        </p>
        <h3>¿Dónde nos puedes encontrar?</h3>
        <p><FontAwesomeIcon icon={faMapMarkerAlt}/>María de Luna, 3 - 50018 Zaragoza</p>
        
      </div>
    </div>
  )
}

export default Footer