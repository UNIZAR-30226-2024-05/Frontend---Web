import React, { useState } from 'react';
import './Biblioteca.css';
import Lista from '../components/Lista/Lista';
import Footer from '../components/Footer/Footer';

import foto1 from '../images/1.png';
import foto2 from '../images/2.jpg';
import foto3 from '../images/3.jpg';
import foto4 from '../images/4.jpg';
import foto5 from '../images/5.jpg';
import foto6 from '../images/6.jpg';
import foto7 from '../images/7.jpg';
import LOTR1 from '../images/LOTR1.jpg';
import LOTR2 from '../images/LOTR2.jpg';
import LOTR3 from '../images/LOTR3.jpg';
import Silmaril from '../images/Silmarillion.jpg';

const Biblioteca = () => {

  const [libros, setLibros] = useState([
    {portada: foto1, titulo: 'Harry Potter y la Piedra Filosofal'},
    {portada: foto2, titulo: 'Harry Potter y la Cámara Secreta'},
    {portada: foto3, titulo: 'Harry Potter y la el Prisionero de Azkaban'},
    {portada: foto4, titulo: 'Harry Potter y el Cáliz de Fuego'},
    {portada: foto5, titulo: 'Harry Potter y la Orden del Fénix'},
    {portada: foto6, titulo: 'Harry Potter y el Misterio del Príncipe'},
    {portada: foto7, titulo: 'Harry Potter y las Reliquias de la Muerte'},
    {portada: LOTR1, titulo: 'LOTR: La comunidad del anillo'},
    {portada: LOTR2, titulo: 'LOTR: Las dos torres'},
    {portada: LOTR3, titulo: 'LOTR: El retorno del rey'},
    {portada: Silmaril, titulo: 'El silmarillion'},
    {portada: foto5, titulo: 'Libro 12'},
    {portada: foto6, titulo: 'Libro 13'},
    {portada: foto7, titulo: 'Libro 14'},
    {portada: foto1, titulo: 'Libro 15'},
    {portada: foto2, titulo: 'Libro 16'}
  ]);

  return (
    <div className='biblioteca'>
        <Lista className='list' libros={libros}></Lista>
        <Footer className='footer' />
    </div>
  );
}

export default Biblioteca