import React, { useState } from 'react';
import Carrusel from '../components/Carrusel';
import './Home.css';
import logo from '../images/logo.png';
import Footer from '../components/Footer';

import foto1 from '../images/1.png';
import foto2 from '../images/2.jpg';
import foto3 from '../images/3.jpg';
import foto4 from '../images/4.jpg';
import foto5 from '../images/5.jpg';
import foto6 from '../images/6.jpg';
import foto7 from '../images/7.jpg';

const Home = () => {
  
  const [libros, setLibros] = useState([
    {portada: foto1, titulo: 'Harry Potter y la Piedra Filosofal'},
    {portada: foto2, titulo: 'Harry Potter y la Cámara Secreta'},
    {portada: foto3, titulo: 'Harry Potter y la el Prisionero de Azkaban'},
    {portada: foto4, titulo: 'Harry Potter y el Cáliz de Fuego'},
    {portada: foto5, titulo: 'Harry Potter y la Orden del Fénix'},
    {portada: foto6, titulo: 'Harry Potter y el Misterio del Príncipe'},
    {portada: foto7, titulo: 'Harry Potter y las Reliquias de la Muerte'},
    {portada: foto1, titulo: 'Libro 8'},
    {portada: foto2, titulo: 'Libro 9'},
    {portada: foto3, titulo: 'Libro 10'},
    {portada: foto4, titulo: 'Libro 11'},
    {portada: foto5, titulo: 'Libro 12'},
    {portada: foto6, titulo: 'Libro 13'},
    {portada: foto7, titulo: 'Libro 14'},
    {portada: foto1, titulo: 'Libro 15'},
    {portada: foto2, titulo: 'Libro 16'}
  ]);

  return (
    <div className='home'>
      <img className='foto-presentacion' src={logo} alt={'Foto presentación'}></img>
      <div className="texto-presentacion">
        <h2>¡Hola, somos Narratives!</h2>
        <span>Aqui encontrarás tus libros favoritos del presente, del pasado y del futuro.</span>
        <span>Aunque de momento contentate con Harry Potter. No se que mas poner aquí, ya veremos xD.</span>
        </div>
      <Carrusel title={'Los más vendidos'} libros={libros}/>
      <Carrusel title={'Tus recomendaciones'} libros={libros}/>
      <Carrusel title={'Saga Harry Potter'} libros={libros}/>
      <Footer />
    </div>
  );
}

export default Home;