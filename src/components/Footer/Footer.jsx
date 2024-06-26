import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='sobreNosotros'>
        <h3>Sobre nosotros</h3>
        <p>Somos el equipo Carol Shaw de la asignatura de Proyecto Software de Ingeniería Informática en la Escuela de Ingeniería y Arquitectura en Zaragoza. A continuación presentamos a sus miembros:</p>
        <p className='sobreNosotros-miembros'>Pablo Latre Villacampa</p>
        <p className='sobreNosotros-miembros'>Ismael Martínez Vicens</p>
        <p className='sobreNosotros-miembros'>Luis Daniel Gómez Sevilla</p>
        <p className='sobreNosotros-miembros'>Alicia Lázaro Huerta</p>
        <p className='sobreNosotros-miembros'>Manel Jordá Puig Rubio</p>
        <p className='sobreNosotros-miembros'>Elizabeth Lilai Naranjo Ventura</p>
        <p className='sobreNosotros-miembros'>Curro Valero Casajús</p>
        <p className='sobreNosotros-miembros'>Daniel Villarreal Gurrea</p>
      </div>
      <div className='contactos'>
        <h3>Contáctanos</h3>
        <p className='correo'><FontAwesomeIcon icon={faEnvelope} style={{ color: 'black', marginRight: '5px' }} />
          <a href='mailto: narratives.unizar@gmail.com'/>
          narratives.unizar@gmail.com
        </p>
        <h3>¿Dónde nos puedes encontrar?</h3>
        <p className='dondeEstamos'><FontAwesomeIcon icon={faMapMarkerAlt}/> María de Luna, 3 - 50018 Zaragoza</p>
        
      </div>
    </div>
  )
}

export default Footer