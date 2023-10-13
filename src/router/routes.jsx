import Login from "../Pages/Login";
import ResetearContraseñaUsuario from "../Pages/Usuarios/ResetearContraseñaUsuario";
import Usuario from "../Pages/Usuarios/Usuarios";
import UsuarioInactivos from "../Pages/Usuarios/UsuariosInactivos";
import Perfiles from "../Pages/Perfiles"

const routesUsuario = [
  {
    name: "Usuarios",
    route: "config/usuarios",
    component: <Usuario />,
    key: 1
  },
  {
    name: "Usuarios",
    route: "config/usuarios/inactivos",
    component: <UsuarioInactivos />,
    key: 2
  },
  {
    name: "Prueba",
    route: "prueba",
    component: <Login />,
    key: 3
  },
  {
    name: "Resetear Contraseña",
    route: "auth/resetear",
    component: <ResetearContraseñaUsuario />,
    key: 4
  },
  {
    name: "Perfiles",
    route: "config/perfiles",
    component: <Perfiles />,
    key: 5
  }
];

export default routesUsuario;
