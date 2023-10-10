import { useEffect, useState } from 'react'
import { createContext } from "react";
import conexionCliente from "../config/ConexionCliente";
import { useLocation } from 'react-router-dom';


const UsuariosContext = createContext();

const UsuariosProvider = ({ children }) => {
  const [dataUsuarios, setDataUsuarios] = useState([])
  const [eliminarUsuario, setEliminarUsuario] = useState({})
  

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
    if (eliminarUsuario.id_usuario) {
      const token = localStorage.getItem('token')
      let estadoUsuario = 0
      if (eliminarUsuario.estado_usuario == "ACTIVO") {
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
        const { data } = await conexionCliente.delete(`/usuarios/${eliminarUsuario.id_usuario}?estado=${estadoUsuario}`, config)
        console.log(data)
        if (data.error) {
          console.log(data.message)
        }

        const usuarioActualizados = dataUsuarios.filter(usuario => usuario.id_usuario !== eliminarUsuario.id_usuario)
        setDataUsuarios(usuarioActualizados)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <UsuariosContext.Provider
      value={{ dataUsuarios, setDataUsuarios, setEliminarUsuario, eliminarUsuario, eliminarUsuarioProvider }}>
      {children}
    </UsuariosContext.Provider>
  )
}

export { UsuariosProvider };

export default UsuariosContext 