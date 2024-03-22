import React, { useState } from 'react';
import { MdMoreVert } from 'react-icons/md'; // Importa el ícono de tres puntos
import './DropdownButton.css';

const DropdownButton = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log(`Opción seleccionada: ${option}`);
    // Aquí puedes agregar la lógica para manejar la opción seleccionada
    // Por ejemplo, cerrar el menú desplegable, ejecutar una función, etc.
  };

  return (
    <div>
        <div className="dropdown">
            <button className="dropdown-button" onClick={handleToggleDropdown}>
                <MdMoreVert /> {/* Icono de tres puntos */}
            </button>
        </div>
        {isOpen && (
            <ul className="dropdown-menu">
                {options.map((option, index) => (
                    <li key={index} onClick={() => handleOptionClick(option)}>
                        {option}
                    </li>
                ))}
            </ul>
        )}
    </div>
  );
};

export default DropdownButton;