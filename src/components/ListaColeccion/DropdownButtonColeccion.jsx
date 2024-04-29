import React, { useState, useEffect, useRef } from 'react';
import { MdMoreVert } from 'react-icons/md'; // Importa el ícono de tres puntos
import './DropdownButtonColeccion.css';

const DropdownButtonColeccion = ({libro, coleccion}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const option = 'Eliminar de ' + coleccion.titulo;

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = async () => {
    const URL_RM = '/colecciones/eliminarAudiolibro'; 
    const audiolibroId = libro.audiolibro?.id;
    const coleccionId = coleccion.id;
        try {
            const respuesta = await axios.post(URL_RM, 
              JSON.stringify({audiolibroId, coleccionId}),
              {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
              }
            );
            console.log(respuesta); /* Solo desarrollo */
            setColeccion(coleccion => {
                // Realiza una copia de la colección actual y filtra el audiolibro eliminado
                const nuevaColeccion = coleccion.filter(item => item.id !== audiolibroId);
                return nuevaColeccion;
            });
        } catch (err) {
            if (!err.response) {
              console.log('No hay respuesta del servidor');
            } else if (err.response.status === 400) {
              console.log('No propietario'); 
            } else {
              console.log('Error');
            }
        }
    }


  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
    }
};

useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
        <button className="dropdown-button" onClick={handleToggleDropdown}>
            <MdMoreVert /> {/* Icono de tres puntos */}
        </button>
        {isOpen && (
            <div className="dropdown-menu">
                <button onClick={() => handleOptionClick()}>{option}</button>
            </div>
        )}
    </div>
  );
};

export default DropdownButtonColeccion;