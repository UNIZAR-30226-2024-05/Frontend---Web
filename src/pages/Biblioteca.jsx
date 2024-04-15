import React, { useState } from 'react';
import './Biblioteca.css';
import ListaLibros from '../components/ListaLibros/ListaLibros';
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
  /*
  const [libros, setLibros] = useState([
    {img: foto1, titulo: 'Harry Potter y la Piedra Filosofal', autor: 'JK Rowling'},
    {img: foto2, titulo: 'Harry Potter y la Cámara Secreta', autor: 'JK Rowling'},
    {img: foto3, titulo: 'Harry Potter y el Prisionero de Azkaban', autor: 'JK Rowling'},
    {img: foto4, titulo: 'Harry Potter y el Cáliz de Fuego', autor: 'JK Rowling'},
    {img: foto5, titulo: 'Harry Potter y la Orden del Fénix', autor: 'JK Rowling'},
    {img: foto6, titulo: 'Harry Potter y el Misterio del Príncipe', autor: 'JK Rowling'},
    {img: foto7, titulo: 'Harry Potter y las Reliquias de la Muerte', autor: 'JK Rowling'},
    {img: LOTR1, titulo: 'LOTR: La comunidad del anillo', autor: 'JRR Tolkien'},
    {img: LOTR2, titulo: 'LOTR: Las dos torres', autor: 'JRR Tolkien'},
    {img: LOTR3, titulo: 'LOTR: El retorno del rey', autor: 'JRR Tolkien'},
    {img: Silmaril, titulo: 'El silmarillion', autor: 'JRR Tolkien'},
    {img: foto5, titulo: 'Libro 12', autor: 'Elpe Pino'},
    {img: foto6, titulo: 'Libro 13', autor: 'Elpe Pino'},
    {img: foto7, titulo: 'Libro 14', autor: 'Elpe Pino'},
    {img: foto1, titulo: 'Libro 15', autor: 'Elpe Pino'},
    {img: foto2, titulo: 'Libro 16', autor: 'Elpe Pino'}
  ]);
  */
  const [generos, setGeneros] = useState([
    'Misterio',
    'Fantasía',
    'Romance',
    'Terror',
    'Ciencia ficción',
    'Historico',
    'Infantil',
    'Mitología',
    'Humor',
    'Autoayuda',
    'Poesía',
    'Aventuras']);

  return (
    <div className='biblioteca'>
      <div className='biblioteca-container'>
        <ListaLibros className='list' generos={generos}></ListaLibros>
      </div>
      <div className='biblioteca-footer'>
        <Footer className='footer' />
        </div>
    </div>
  );
}

export default Biblioteca