import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        // Inicializar el estado 'auth' con el valor guardado en el localStorage si existe,
        // de lo contrario, inicializarlo como un objeto vacío.
        const savedAuth = localStorage.getItem('auth');
        return savedAuth ? JSON.parse(savedAuth) : {};
    });

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
        <AuthContext.Provider value={{ auth, setAuth, updateUsername, updateMail}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;