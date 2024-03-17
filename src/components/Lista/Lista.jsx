import React from 'react';
import './Lista.css';

const Lista = ({libros}) => {
  
    return (
    <div className='contenedor-lista'>
        <div className='buscador'>
            
        </div>

        <div className='lista'>
            {libros.map((libro, i) => (
                <div key={i}
                className='libro'>
                    <a className='portadas' href='#'>
                        <img src={libro.portada} alt={libro.titulo}></img>
                    </a>
                    <a className='titulo' href='#'>
                        <h1>{libro.titulo}</h1>
                    </a>
                </div>
              ))}
        </div>
        
    </div>
  )
}

export default Lista