import React from 'react';
import * as BsIcons from "react-icons/bs";
import './Home.css';
import foto1 from '../images/1.png';
import foto2 from '../images/2.jpg';
import foto3 from '../images/3.jpg';
import foto4 from '../images/4.jpg';
import foto5 from '../images/5.jpg';
import foto6 from '../images/6.jpg';
import foto7 from '../images/7.jpg';

const Home = () => {
  const fila = document.querySelector('.contenedor-carrusell');
  const libro = document.querySelectorAll('.libro');

  const flechaIzq = document.getElementById('flecha-izq');
  const flechaDch = document.getElementById('flecha-dch');

/*----- Botones laterales -----*/

  const handleFlechaIzq = () => {
    fila.scrollLeft -= fila.offsetWidth;

    const paginaActiva = document.querySelector('.paginas .activo');
    if (paginaActiva.previousSibling) {
      paginaActiva.previousSibling.classList.add('activo');
      paginaActiva.classList.remove('activo');
    }
  };

  const handleFlechaDch = () => {
    fila.scrollLeft += fila.offsetWidth;

    const paginaActiva = document.querySelector('.paginas .activo');
    if (paginaActiva.nextSibling) {
      paginaActiva.nextSibling.classList.add('activo');
      paginaActiva.classList.remove('activo');
    }
  };

/*----- Paginacion -----*//*

  const numPaginas = Math.ceil(libro.length / 4);
  for(let i = 0; i < numPaginas; i++){
    const pagina = document.createElement('button');

    if( i === 0 ){
      pagina.classList.add('activo');
    }

    document.querySelector('.paginas').appendChild(pagina);
    pagina.addEventListener('click', (event) => {
      fila.scrollLeft = i * fila.offsetWidth;

      document.querySelector('.paginas .activo').classList.remove('activo');
      event.target.classList.add('activo');
    });
  }

/*----- Hover -----*/

const ampliar = (event) => {
  const elem = event.currentTarget;
  setTimeout(() => {
    document.querySelectorAll('.libro').forEach(libro => libro.classList.remove('hover'));
    elem.classList.add('hover');
  }, 300);
};


const reducir = (elem) => {;
  setTimeout(() => {
    document.querySelectorAll('.libro').forEach(libro => libro.classList.remove('hover'));
  }, 500);
};

  return (
    <div className='home'>
      <div className='libros-recomendados container'>
        <div className='contenedor-titulo-controles'>
          <h3>Películas recomendadas</h3>
          <div className="paginas">

          </div>
        </div>

        <div className='contenedor-principal'>
          

          <div className='contenedor-carrusell'>
            <div className='carrusell' onMouseLeave={reducir}>
              <div className='libro' onMouseEnter={ampliar}>
                <a href='#'><img className='portadas' src={foto1} alt='Libro 1'></img></a>
              </div>
              <div className='libro' onMouseEnter={ampliar}>
                <a href='#'><img className='portadas' src={foto2} alt='Libro 2'></img></a>
              </div>
              <div className='libro' onMouseEnter={ampliar}>
                <a href='#'><img className='portadas' src={foto3} alt='Libro 3'></img></a>
              </div>
              <div className='libro' onMouseEnter={ampliar}>
                <a href='#'><img className='portadas' src={foto4} alt='Libro 4'></img></a>
              </div>
              <div className='libro' onMouseEnter={ampliar}>
                <a href='#'><img className='portadas' src={foto5} alt='Libro 5'></img></a>
              </div>
              <div className='libro' onMouseEnter={ampliar}>
                <a href='#'><img className='portadas' src={foto6} alt='Libro 6'></img></a>
              </div>
              <div className='libro' onMouseEnter={ampliar}>
                <a href='#'><img className='portadas' src={foto7} alt='Libro 7'></img></a>
              </div>
              <div className='libro' onMouseEnter={ampliar}>
                <a href='#'><img className='portadas' src={foto1} alt='Libro 8'></img></a>
              </div>
              <div className='libro' onMouseEnter={ampliar}>
                <a href='#'><img className='portadas' src={foto2} alt='Libro 9'></img></a>
              </div>
              <div className='libro' onMouseEnter={ampliar}>
                <a href='#'><img className='portadas' src={foto3} alt='Libro 10'></img></a>
              </div>

            </div>
          </div>
          <button role='button' id='flecha-izq' className='flecha-izq' onClick={handleFlechaIzq}><BsIcons.BsCaretLeftFill /></button>
          <button role='button' id='flecha-dch' className='flecha-dch' onClick={handleFlechaDch}><BsIcons.BsCaretRightFill /></button>
        </div>
      </div>
    </div>
  );
}


export default Home;