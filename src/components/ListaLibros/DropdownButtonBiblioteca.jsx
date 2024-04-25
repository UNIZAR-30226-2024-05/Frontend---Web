import React, { useState, useEffect, useRef } from 'react';
import { MdMoreVert } from 'react-icons/md'; // Importa el ícono de tres puntos
import './DropdownButtonBiblioteca.css';

const DropdownButtonBiblioteca = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [options, setOptions] = useState([
    'Añadir a favoritos',
    'Añadir a escuchar mas tarde',
    'Añadir a colecciones'
]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log(`Opción seleccionada: ${option}`);
    // Aquí puedes agregar la lógica para manejar la opción seleccionada
    // Por ejemplo, cerrar el menú desplegable, ejecutar una función, etc.
    switch (option) {
        case 'Añadir a favoritos':
            console.log('Añadir a favoritos');
            break;
        case 'Añadir a escuchar más tarde':
            console.log('Añadir a escuchar más tarde');
            break;
        case 'Añadir a colecciones':
            console.log('Más adelante');
            break;
    }
  };

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
                {options.map((option, index) => (
                    <div key={index}>
                        <button onClick={() => handleOptionClick(option)}>{option}</button>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default DropdownButtonBiblioteca;