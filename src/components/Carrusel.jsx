import React, { useRef, useState } from 'react';
import * as BsIcons from "react-icons/bs";
import './Carrusel.css';
import foto1 from '../images/1.png';
import foto2 from '../images/2.jpg';
import foto3 from '../images/3.jpg';
import foto4 from '../images/4.jpg';
import foto5 from '../images/5.jpg';
import foto6 from '../images/6.jpg';
import foto7 from '../images/7.jpg';

const Carrusel = ({title}) => {
  const filaRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [paginaActiva, setPaginaActiva] = useState(0);

  const libros = [
    {portada: foto1, titulo: 'Harry Potter y la Piedra Filosofal'},
    {portada: foto2, titulo: 'Harry Potter y la Cámara Secreta'},
    {portada: foto3, titulo: 'Harry Potter y la el Prisionero de Azkaban'},
    {portada: foto4, titulo: 'Harry Potter y el Cáliz de Fuego'},
    {portada: foto5, titulo: 'Harry Potter y la Orden del Fénix'},
    {portada: foto6, titulo: 'Harry Potter y el Misterio del Príncipe'},
    {portada: foto7, titulo: 'Harry Potter y las Reliquias de la Muerte'},
    {portada: foto1, titulo: 'Libro 8'},
    {portada: foto2, titulo: 'Libro 9'},
    {portada: foto3, titulo: 'Libro 10'}
  ]

  const numPaginas = Math.ceil(libros.length / 4);

/*----- Botones laterales -----*/

  const handleFlechaIzq = () => {
    if (paginaActiva > 0){
      const newScrollLeft = scrollLeft - filaRef.current.offsetWidth;
      setScrollLeft(newScrollLeft);
      filaRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      setPaginaActiva(paginaActiva - 1);
    }
  };

  const handleFlechaDch = () => {
    if (paginaActiva < numPaginas - 1) {
      const newScrollLeft = scrollLeft + filaRef.current.offsetWidth;
      setScrollLeft(newScrollLeft);
      filaRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      setPaginaActiva(paginaActiva + 1);
    }
  };

/*----- Hover -----*/

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const ampliar = (i) => {
    setTimeout(() => {
      setHoveredIndex(i);
    }, 300);
  };
  
  const reducir = () => {
    setTimeout(() => {
      setHoveredIndex(null);
    }, 500);
  };

/*----- Paginación -----*/

const botones = () => {
  const elementosBotones = [];
  for(let i = 0; i < numPaginas; i++){
    elementosBotones.push(
    <button key={i} onClick={() => handlePaginaClick(i)} className={paginaActiva === i ? 'activo' : ''}></button>
    );
  }
  return elementosBotones;
}

const handlePaginaClick = (i) => {
  const newScrollLeft = filaRef.current.offsetWidth * i;
  setScrollLeft(newScrollLeft);
  filaRef.current.scrollTo({
    left: newScrollLeft,
    behavior: 'smooth'
  });
  setPaginaActiva(i);
}


return (
    <div className='carrusel-libros container'>
        <div className='contenedor-titulo-controles'>
          <h3>{title}</h3>
          <div className="paginas">
            {botones()}
          </div>
        </div>

        <div className='contenedor-principal'>
          

          <div className='contenedor-carrusel' ref={filaRef}>
            <div className='carrusel' onMouseLeave={reducir}>
              {libros.map((libro, i) => (
                <div key={i}
                className={`libro ${i === hoveredIndex ? 'hover' : ''}`}
                onMouseEnter={() => ampliar(i)}>
                  <a href='#'><img className='portadas' src={libro.portada} alt={libro.titulo}></img></a>
                </div>
              ))}

            </div>
          </div>
          <button role='button' className='flecha-izq' onClick={handleFlechaIzq}><BsIcons.BsCaretLeftFill /></button>
          <button role='button' className='flecha-dch' onClick={handleFlechaDch}><BsIcons.BsCaretRightFill /></button>
        </div>
      
      </div>
      );
}
    
    
export default Carrusel;