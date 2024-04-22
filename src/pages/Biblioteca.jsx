import React, { useState } from 'react';
import './Biblioteca.css';
import ListaLibros from '../components/ListaLibros/ListaLibros';
import Footer from '../components/Footer/Footer';

const Biblioteca = () => {
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