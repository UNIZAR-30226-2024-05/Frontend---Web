import React from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const ErrorNoSesion = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        handleCerrarSesion(); // Redirige automáticamente al montar el componente
    }, []);

    const handleCerrarSesion = async (event) => {
        event.preventDefault();
        const URL_LOGOUT = '/users/logout';

        try {
            const respuesta = await axios.post(URL_LOGOUT, null, {withCredentials: true});
            console.log(JSON.stringify(respuesta?.data));
            // Si la solicitud de cierre de sesión fue exitosa, redirige al usuario a la página de inicio u otra página
            setAuth({});
            window.location.href = '/login'; // Redirige a la página de inicio de sesión
        } catch (err) {
            if (!err.response) {
                console.log('No hay respuesta del servidor');
            } else if (err.response.status === 401) {
                console.log('No hay sesión iniciada');
            } else {
                console.log('Fallo en el logout');
            }
            setAuth({});
            window.location.href = '/login'; 
        }
    };

    return null;
}
export default ErrorNoSesion;