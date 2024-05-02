import React, { useState, useEffect, useRef } from 'react';
import { MdMoreVert } from 'react-icons/md'; // Importa el ícono de tres puntos
import './DropdownButtonClubes.css';
import axios from '../../api/axios';

const DropdownButtonClubes = ({ options, club_Id, setClubes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const eliminarClubConsulta = async () => {

    const URL_Club = '/clubes';
        async function fetchClubes(){
            await axios.get(URL_Club, {withCredentials: true})
            .then(response=>{
                setClubes(response.data.clubes);    /* Revisar */
                console.log(response.data);
            }).catch(error=>{
                console.log(error);
            })
        }

    const URL_CONSULTA = '/clubes/remove'
    try {
        const respuesta = await axios.post(URL_CONSULTA, 
          JSON.stringify({club_Id}),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        console.log(respuesta); /* Solo desarrollo */
        fetchClubes();
        setIsOpen(false);
    } catch (err) {
        if (!err.response) {
            console.log('No hay respuesta del servidor');
        } else if (err.response.status === 500){
            console.log('Server error');
        } else {
            console.log('Error');
        }
    }
  }

  const handleOptionClick = (option) => {
    console.log(`Opción seleccionada: ${option}`);
    // Aquí puedes agregar la lógica para manejar la opción seleccionada
    // Por ejemplo, cerrar el menú desplegable, ejecutar una función, etc.
    switch (option) {
      case 'Eliminar club':
          eliminarClubConsulta();
          break;
      case 'Dejar de seguir club':
          eliminarClubConsulta();
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

export default DropdownButtonClubes;