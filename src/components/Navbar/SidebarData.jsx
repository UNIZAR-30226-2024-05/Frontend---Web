import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

// Datos de la barra desplegable

export const SidebarData = [
    {
        title: 'Biblioteca',
        path: '/biblioteca',
        icon: <IoIcons.IoIosBook />,
        cName: 'nav-text'
    },
    {
        title: 'Amigos',
        path: '/amigos',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: 'Mensajes',
        path: '/mensajes',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'nav-text'
    },
    {
        title: 'Sobre Nosotros',
        path: '/aboutus',
        icon: <IoIcons.IoMdPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Soporte',
        path: '/soporte',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text'
    }
]