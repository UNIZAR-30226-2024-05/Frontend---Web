import React, { useState } from 'react';
import './Colecciones.css';
import ListaColecciones from '../components/ListaColecciones/ListaColecciones';
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

const Colecciones = () => {

  const [libros, setLibros] = useState([
    {portada: foto1, titulo: 'Harry Potter y la Piedra Filosofal', autor: 'JK Rowling'},
    {portada: foto2, titulo: 'Harry Potter y la Cámara Secreta', autor: 'JK Rowling'},
    {portada: foto3, titulo: 'Harry Potter y el Prisionero de Azkaban', autor: 'JK Rowling'},
    {portada: foto4, titulo: 'Harry Potter y el Cáliz de Fuego', autor: 'JK Rowling'},
    {portada: foto5, titulo: 'Harry Potter y la Orden del Fénix', autor: 'JK Rowling'},
    {portada: foto6, titulo: 'Harry Potter y el Misterio del Príncipe', autor: 'JK Rowling'},
    {portada: foto7, titulo: 'Harry Potter y las Reliquias de la Muerte', autor: 'JK Rowling'},
    {portada: LOTR1, titulo: 'LOTR: La comunidad del anillo', autor: 'JRR Tolkien'},
    {portada: LOTR2, titulo: 'LOTR: Las dos torres', autor: 'JRR Tolkien'},
    {portada: LOTR3, titulo: 'LOTR: El retorno del rey', autor: 'JRR Tolkien'},
    {portada: Silmaril, titulo: 'El silmarillion', autor: 'JRR Tolkien'},
    {portada: foto5, titulo: 'Libro 12', autor: 'Elpe Pino'},
    {portada: foto6, titulo: 'Libro 13', autor: 'Elpe Pino'},
    {portada: foto7, titulo: 'Libro 14', autor: 'Elpe Pino'},
    {portada: foto1, titulo: 'Libro 15', autor: 'Elpe Pino'},
    {portada: foto2, titulo: 'Libro 16', autor: 'Elpe Pino'}
  ]);

  return (
    <div className='colecciones'>
        <ListaColecciones className='list' libros={libros}></ListaColecciones>
        <Footer className='footer' />
    </div>
  );
}

export default Colecciones