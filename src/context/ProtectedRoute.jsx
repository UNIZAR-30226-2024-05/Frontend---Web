import React, {useContext} from 'react';
import { Route, Navigate } from "react-router-dom";
import AuthContext from "./AuthProvider";

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const { auth } = useContext(AuthContext);
    const isAuth = Object.keys(auth).length !== 0;
    return isAuth ? <Element {...rest} />: <Navigate to="/login" />;
  };

export default  ProtectedRoute;