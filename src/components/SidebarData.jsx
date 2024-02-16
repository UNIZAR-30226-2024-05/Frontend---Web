import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Biblioteca',
        path: '/biblioteca',
        icon: <IoIcons.IoIosBook />,
        cName: 'nav-text'
    },
    {
        title: 'Tienda',
        path: '/tienda',
        icon: <FaIcons.FaCartPlus />,
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
        title: 'Soporte',
        path: '/soporte',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text'
    }
]