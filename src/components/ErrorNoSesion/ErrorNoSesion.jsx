import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorNoSesion = () => {
    const navigate = useNavigate();

    const redirectToLogin = () => {
        navigate("/login");
    }

    return (
        <div>
        <h1>ErrorNoSesion</h1>
        </div>
    );
}
export default ErrorNoSesion;