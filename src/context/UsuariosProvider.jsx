import { useEffect, useState } from 'react'
import { createContext } from "react";
import conexionCliente from "../config/ConexionCliente";
import { useLocation } from 'react-router-dom';


const UsuariosContext = createContext();

const UsuariosProvider = ({ children }) => {
  const [dataUsuarios, setDataUsuarios] = useState([])

  useEffect(() => {
    const getUsuarios = async () => {
      const token = localStorage.getItem('token')

      const config = {
        headers: {
          "Content-Type": "apllication/json",
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await conexionCliente(`/usuarios?estado=1`, config)
        console.log(data)
        setDataUsuarios(data)
        // navigate('/home')
      } catch (error) {
        setDataUsuarios([])
        // navigate('/')
      }
    }
    getUsuarios()
  }, [])


  return (
    <UsuariosContext.Provider
      value={{ dataUsuarios, setDataUsuarios }}>
      {children}
    </UsuariosContext.Provider>
  )
}

export { UsuariosProvider };

export default UsuariosContext 