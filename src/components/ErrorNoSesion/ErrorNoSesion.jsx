import React from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const ErrorNoSesion = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        redirectToLogin(); // Redirige automáticamente al montar el componente
    }, []);

    const redirectToLogin = () => {
        Cookie.remove('auth');
        navigate("/login");
    }

    
    return null;
}
export default ErrorNoSesion;