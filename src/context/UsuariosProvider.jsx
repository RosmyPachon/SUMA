import { useEffect, useState, createContext, useRef } from "react";
import conexionCliente from "../config/ConexionCliente";
import { useLocation } from "react-router-dom";
import { generarID } from "../helpers/utils";
// import { Resend } from 'resend';

const UsuariosContext = createContext();

const UsuariosProvider = ({ children }) => {
  const [dataUsuarios, setDataUsuarios] = useState([])
  const [usuarioState, setUsuarioState] = useState({})

  const location = useLocation()

  useEffect(() => {
    const getUsuarios = async () => {
      const token = localStorage.getItem('token')

      const config = {
        headers: {
          "Content-Type": "apllication/json",
          Authorization: `Bearer ${token}`
        }
      }
      const estado = location.pathname.includes('inactivos') ? 2 : 1

      try {
        const { data } = await conexionCliente(`/usuarios?estado=${estado}`, config)
        setDataUsuarios(data)
      } catch (error) {
        setDataUsuarios([])
      }
    }
    getUsuarios()
  }, [location.pathname])

  const eliminarUsuarioProvider = async () => {
    if (usuarioState.id_usuario) {
      const token = localStorage.getItem('token')
      let estadoUsuario = 0
      if (usuarioState.estado_usuario == "ACTIVO") {
        estadoUsuario = 2
      } else {
        estadoUsuario = 1
      }
      const config = {
        headers: {
          "Content-Type": "apllication/json",
          Authorization: `Bearer ${token}`
        }
      }
      try {
        const { data } = await conexionCliente.delete(`/usuarios/${usuarioState.id_usuario}?estado=${estadoUsuario}`, config)
        console.log(data)
        if (data.error) {
          console.log(data.message)
        }

        const usuarioActualizados = dataUsuarios.filter(usuario => usuario.id_usuario !== usuarioState.id_usuario)
        setDataUsuarios(usuarioActualizados)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const restaurarUsuarioProvider = async () => {
    if (usuarioState.id_usuario) {
      const token = localStorage.getItem('token')
      let estadoUsuario = 0
      if (usuarioState.estado_usuario == "INACTIVO") {
        estadoUsuario = 1
      } else {
        estadoUsuario = 2
      }
      const config = {
        headers: {
          "Content-Type": "apllication/json",
          Authorization: `Bearer ${token}`
        }
      }
      try {
        const { data } = await conexionCliente.delete(`/usuarios/${usuarioState.id_usuario}?estado=${estadoUsuario}`, config)
        console.log(data)
        if (data.error) {
          console.log(data.message)
        }

        const usuarioActualizados = dataUsuarios.filter(usuario => usuario.id_usuario !== usuarioState.id_usuario)
        setDataUsuarios(usuarioActualizados)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const restablecerUsuarioProvider = async () => {
    const token = localStorage.getItem('token')

    const config = {
      headers: {
        "Content-Type": "apllication/json",
        Authorization: `Bearer ${token}`
      }
    }
    let claveHash = generarID()
  
    const body = {
      "clave": claveHash
    }
    try {
      const { data } = await conexionCliente.post(`/usuarios/cambiar-clave/${usuarioState.id_usuario}`, body, config)
      // console.log(data)

      if (data.error) {
        console.log(data.message)
      }


      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  // ------------------------------------------------------------------------------------------------------------------------------------------

  const [UsuariosAgg, setUsuariosAgg] = useState({
    nombre: "",
    usuario: "",
    correo: "",
    clave: "",
    claverepetida: "",
  });
  
  const [errors, setErrors] = useState({
    nombre: '',
    usuario: '',
    correo: '',
    clave: '',
    claverepetida: '',
  });
  
  const [perfilesAgg, setPerfilesAgg] = useState([]);
  const [modulosAgg, setModulosAgg] = useState([]);
  const [permisosAgg, setPermisosAgg] = useState([]);


  const handleChangeUsuario = (e) => {
    setUsuariosAgg({ ...UsuariosAgg, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getUsuarios = async () => {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "apllication/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await conexionCliente(`/usuarios?estado=1`, config);
        // console.log(data);
        setDataUsuarios(data);
        // navigate('/home')
      } catch (error) {
        setDataUsuarios([]);
        // navigate('/')
      }
    };
    getUsuarios();
  }, []);

  const obtenerPerfiles = async () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await conexionCliente(`/perfiles?estado=1`, config);
      console.log(data);
      setPerfilesAgg(data);
    } catch (error) {
      console.error("Error al obtener perfiles:", error);
    }
  };
  const obtenerModulos = async (perfiles) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await conexionCliente.post(
        `/perfiles/modulos`,
        perfiles,
        config
      );
      console.log(data);
      setModulosAgg(data);
    } catch (error) {
      console.error("Error al obtener perfiles:", error);
    }
  };

  const guardarUsuario = async (formData) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Realiza la solicitud POST a la API para guardar la información del usuario
      const response = await conexionCliente.post("/usuarios", formData, config);
      console.log("Información guardada con éxito:", response);
      // toast.current.show({severity:'success', summary: 'Success', detail:'Registro guardado con exito', life: 3000});
      setDataUsuarios([...dataUsuarios, response.data ]); // Puedes devolver los datos guardados si es necesario
    } catch (error) {
      console.error("Error al guardar la información:", error);
      throw error; // Puedes lanzar una excepción en caso de error
    }
  };


  return (
    <UsuariosContext.Provider
      value={{
        dataUsuarios,
        handleChangeUsuario,
        UsuariosAgg,
        setUsuariosAgg,
        obtenerPerfiles,
        perfilesAgg,
        obtenerModulos,
        modulosAgg,
        setModulosAgg,
        permisosAgg,
        guardarUsuario,
        errors,
        setErrors,
        setUsuarioState,
        usuarioState,
        eliminarUsuarioProvider,
        restaurarUsuarioProvider,
        restablecerUsuarioProvider
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

export { UsuariosProvider };

export default UsuariosContext;
