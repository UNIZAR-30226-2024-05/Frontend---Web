import { createContext, useState, useEffect } from "react";
import io from 'socket.io-client';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        // Inicializar el estado 'auth' con el valor guardado en el localStorage si existe,
        // de lo contrario, inicializarlo como un objeto vacío.
        const savedAuth = localStorage.getItem('auth');
        return savedAuth ? JSON.parse(savedAuth) : {};
    });

    const [socket, setSocket] = useState(null);
    const [refreshFriends, setRefreshFriends] = useState(false);

    useEffect(() => {
        console.log('Entra al useEffect')
        if (auth.username && !socket) {
            // Establecer la conexión con el servidor de Socket.io
            console.log('Entra al if')
            const newSocket = io("https://server.narratives.es", {
                withCredentials: true,
            });
            console.log(newSocket);
            setSocket(newSocket);
        }
        else if (!auth.username && socket) {
            socket.disconnect();
        }
    }, [auth]);

    // Almacenar la sesión en el almacenamiento local al cambiar
    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    // Comprobar si hay una sesión almacenada en el almacenamiento local al cargar la página
    useEffect(() => {
        const savedAuth = localStorage.getItem('auth');
        if (savedAuth) {
            setAuth(JSON.parse(savedAuth));
        }
    }, []);

    const updateUsername = (newUsername) => {
        setAuth({
            ...auth,
            username: newUsername
        });
    }

    const updateMail = (newEmail) => {
        setAuth({
            ...auth,
            correo: newEmail
        });
    }

    return(
        <AuthContext.Provider value={{ auth, setAuth, socket, refreshFriends, setRefreshFriends, updateUsername, updateMail}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;