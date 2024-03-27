import React, { useState, useContext } from 'react';
import Carrusel from '../components/Carrusel/Carrusel';
import './Home.css';
import logo from '../images/logo.png';
import Footer from '../components/Footer/Footer';
import AuthContext from '../context/AuthProvider';
import { Link } from 'react-router-dom';

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

const Home = () => {
  
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

  const [libros2, setLibros2] = useState([
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
    {portada: Silmaril, titulo: 'El silmarillion'}
  ]);

  const [harry, setHarry] = useState([
    {portada: foto1, titulo: 'Harry Potter y la Piedra Filosofal'},
    {portada: foto2, titulo: 'Harry Potter y la Cámara Secreta'},
    {portada: foto3, titulo: 'Harry Potter y la el Prisionero de Azkaban'},
    {portada: foto4, titulo: 'Harry Potter y el Cáliz de Fuego'},
    {portada: foto5, titulo: 'Harry Potter y la Orden del Fénix'},
    {portada: foto6, titulo: 'Harry Potter y el Misterio del Príncipe'},
    {portada: foto7, titulo: 'Harry Potter y las Reliquias de la Muerte'}
  ]);

  const [lotr, setLotr] = useState([
    {portada: LOTR1, titulo: 'LOTR: La comunidad del anillo'},
    {portada: LOTR2, titulo: 'LOTR: Las dos torres'},
    {portada: LOTR3, titulo: 'LOTR: El retorno del rey'},
    {portada: Silmaril, titulo: 'El silmarillion'}
  ]);
  
  // Variables para conocer el contexto (Usuario conectado o no)
  const { auth } = useContext(AuthContext);
  const { username } = auth;

  return (
    <div className='home'>
      {!username ? (
        <>{/* Cabecera si no está logueado */}
          <img className='foto-presentacion' src={logo} alt={'Foto presentación'}></img>
          <div className="texto-presentacion">
            <h2>¡Hola, somos Narratives!</h2>
            <span>Aqui encontrarás tus libros favoritos del presente, del pasado y del futuro.</span>
            <span>Aunque de momento contentate con Harry Potter. No se que mas poner aquí, ya veremos xD.</span>
          </div>
          <Link to="/libro">
            <button className='libro'>
              Libro
            </button>
          </Link>
        </>
      ) : (<> {/* Cabecera si está logueado */}
          <Link to='/player' className='foto-presentacion'>
            <img className='foto-presentacion' src={foto1} alt={'Portada-ultimo-leido'}></img>
          </Link>
          <div className="texto-presentacion">
            <h2>Continua tu lectura</h2>
            <span>Pincha en la portada para continuar por donde lo dejaste.</span>
          </div>
        </>)}
      <Carrusel title={'Los más vendidos'} libros={libros2}/>
      <Carrusel title={`Recomendaciones para ${username}`} libros={libros}/>
      <Carrusel title={'Saga Harry Potter'} libros={harry}/>
      <Carrusel title={'Mundo del Señor de los Anillos'} libros={lotr}/>
      <Footer />
    </div>
  );
}

export default Home;