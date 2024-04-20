import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as BsIcons from "react-icons/bs";
import './Carrusel.css';

const Carrusel = ({title, libros}) => {
  const filaRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [paginaActiva, setPaginaActiva] = useState(0);

  const numPaginas = Math.ceil(libros.length / 6);

/*----- Botones laterales -----*/

  const flechas = () => {
    const elementosBotones = [];
  if(libros.length > 6){
    elementosBotones.push( <>
      <button role='button' className='flecha-izq' onClick={handleFlechaIzq}><BsIcons.BsCaretLeftFill /></button>
      <button role='button' className='flecha-dch' onClick={handleFlechaDch}><BsIcons.BsCaretRightFill /></button>
    </>);
  }
  return elementosBotones;
  };

  const handleFlechaIzq = () => {
    if (paginaActiva > 0){
      const newScrollLeft = scrollLeft - filaRef.current.offsetWidth;
      setScrollLeft(newScrollLeft);
      filaRef.current.scrollTo({
        left: newScrollLeft
      });
      setPaginaActiva(paginaActiva - 1);
    }
  };

  const handleFlechaDch = () => {
    if (paginaActiva < numPaginas - 1) {
      const newScrollLeft = scrollLeft + filaRef.current.offsetWidth;
      setScrollLeft(newScrollLeft);
      filaRef.current.scrollTo({
        left: newScrollLeft
      });
      setPaginaActiva(paginaActiva + 1);
    }
  };

/*----- Hover -----*/

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const ampliar = (i) => {
    setTimeout(() => {
      setHoveredIndex(i);
    }, 1);
  };
  
  const reducir = () => {
    setTimeout(() => {
      setHoveredIndex(null);
    }, 400);
  };

/*----- Paginación -----*/

const botones = () => {
  const elementosBotones = [];
  if (libros.length > 6){
    for(let i = 0; i < numPaginas; i++){
      elementosBotones.push(
      <button key={i} onClick={() => handlePaginaClick(i)} className={paginaActiva === i ? 'activo' : ''}></button>
      );
    }
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

const navigate = useNavigate();

const handleLibroClick = (id_libro) => {
  console.log(id_libro);
  navigate('/libro', {state: {id_libro}})
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
                <div key={`${title}-${i}`}
                className={`libro ${i === hoveredIndex ? 'hover' : ''}`}
                onMouseEnter={() => ampliar(i)}
                onClick={() => handleLibroClick(libro.id)}
                >
                  <img className='portadas' src={libro.img} alt={libro.titulo}></img>
                </div>
              ))}

            </div>
          </div>
          {flechas()}
        </div>
      
      </div>
      );
}
    
    
export default Carrusel;