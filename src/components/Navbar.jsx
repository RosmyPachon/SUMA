import { memo, useState } from "react";
import useAuth from "../hooks/useAuth.jsx";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const { cerrar_salir, authModulos, setAuthModulos, authUsuario } = useAuth();

  const { usuario, correo } = authUsuario;

  const [open, setOpen] = useState(true);
  const setSubMenuOpen = (index) => {
    setAuthModulos((prevModulos) =>
      prevModulos.map((modulos, i) => {
        if (i === index) {
          return { ...modulos, isOpen: !modulos.isOpen };
        }
        return modulos;
      })
    );
  };
  const toggleSidebar = () => {
    setOpen(!open);
  };
  return (
    <div className="h-full flex flex-col border-r shadow-sm">
      <button
        className="fixed lg:hidden z-90 bottom-10 right-8 bg-primaryYellow w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-amber-500 duration-300"
        onClick={toggleSidebar}
      >
        <span className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-6 m-auto"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
            />
          </svg>
        </span>
      </button>

      <div
        className={` ${
          open
            ? "w-52 px-2 overflow-hidden transition-all duration-700 ease-in-out"
            : "w-16 overflow-hidden transition-all duration-700 ease-in-out"
        } h-screen bg-white`}
      >
        <div className=" flex p-2 mx-1">
          <img
            src="https://img.freepik.com/vector-premium/avatar-hombre-sonriente-joven-hombre-bigote-barba-marron-cabello-sueter-amarillo-o-sudadera-ilustracion-personaje-personas-vector-3d-estilo-minimalista-dibujos-animados_365941-860.jpg?w=740"
            alt=""
            className={`w-10 h-10 rounded-md`}
          />
          <div className={`flex justify-between items-center w-40 ml-3`}>
            <div className={`leading-4 ${!open && "invisible"}`}>
              <h4 className=" font-semibold">{usuario}</h4>
              <span className=" text-xs text-gray-600">{correo}</span>
            </div>
          </div>
          <div
            onClick={cerrar_salir}
            className={` ${
              open
                ? "w-40 p-2 mx-1 overflow-hidden transition-all duration-700 ease-in-out"
                : "w-14 p-2 mx-1 overflow-hidden transition-all duration-700 ease-in-out"
            } hover:bg-primaryYellow overflow-hidden transition-all duration-700 ease-in-out absolute inset-x-0 bottom-5 flex rounded-md cursor-pointer hover:bg-amarillo text-sm items-center`}
          >
            <i className="pi pi-sign-out"></i>
            {open && <span className="ml-1">Salir</span>}
          </div>
        </div>
        <ul className="">
          {authModulos.map((modulo, index) => (
            <div key={index}>
              <li
                onClick={() => setSubMenuOpen(index)}
                className={`flex font-semibold rounded-md p-2 mx-2 cursor-pointer hover:bg-primaryYellow text-sm items-center gap-x-4 ${
                  modulo.gap ? "mt-9" : "mt-2"
                }`}
              >
                <div className="mx-1">
                  {modulo.icono ? (
                    <i className={`pi ${modulo.icono}`}></i>
                  ) : (
                    <i className="pi pi-inbox "></i>
                  )}
                </div>
                {open && <span>{modulo.nombre_modulo}</span>}
                {open && modulo.menus && (
                  <i
                    className={`pi pi-angle-down ${
                      modulo.isOpen && "rotate-180"
                    } `}
                  ></i>
                )}
              </li>

              {modulo.menus && modulo.isOpen && open && (
                <ul className="bg-slate-100 m-2 rounded-md">
                  {modulo.menus.map((subMenuItem, idx) => (
                    <li
                      key={idx}
                      className="flex px-2 rounded-md cursor-pointer m-2 text-center hover:bg-gray-300 text-sm py-1"
                    >
                      <Link to={subMenuItem.link_menu}>
                        {subMenuItem.nombre_menu}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default memo(Navbar);
