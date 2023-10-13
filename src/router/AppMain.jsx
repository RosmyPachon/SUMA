import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../Pages/Login.jsx";
import Home from "../Pages/Home.jsx";
import Layout from "../layout/Layout.jsx";
import AuthLayouth from "../layout/AuthLayouth.jsx";
import useAuth from "../hooks/useAuth.jsx";
import routesUsuario from "./routes.jsx";
import ResetearContraseñaUsuario from "../Pages/Usuarios/ResetearContraseñaUsuario.jsx";
import Perfiles from "../Pages/Perfiles.jsx"

let rutas = [];

const obtenerRutas = (menu) => {
  let rutasIncluidas = routesUsuario.filter((ruta) =>
    ruta.route.includes(menu.link_menu)
  );
  return rutasIncluidas;
};

const AppMain = () => {
  const { authModulos } = useAuth();

  useEffect(() => {
    const nuevasRutas = [];

    authModulos.forEach((modulo) => {
      modulo.menus.forEach((menu) => {
        nuevasRutas.push(...obtenerRutas(menu));
      });
    });

    rutas = nuevasRutas;
    console.log(rutas);
  }, [authModulos]); // Asegúrate de que rutas se actualice cuando authModulos cambie

  return (
    <Routes>
      {/* Area Publica */}
      <Route path="/" element={<AuthLayouth />}>
        <Route index element={<Login />} />
        <Route path="auth/resetear" element={<ResetearContraseñaUsuario />} />
      </Route>

      {/* Area Privada */}


      <Route path="/home" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="config/perfiles" element={<Perfiles />} />

        {rutas.map((ruta) => (
          <Route
            exact
            path={ruta?.route}
            element={ruta?.component}
            key={ruta?.key}
          />
        ))}
      </Route>



    </Routes>
  );
};

export default AppMain;
