import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import useUsuarios from "../../hooks/useUsuarios";
import { Message } from "primereact/message";

const ModalAgregarUsuarios = ({ visible, onClose }) => {
  const [perfilesSeleccionados, setPerfilesSeleccionados] = useState([]);
  const [modulosSeleccionados, setModulosSeleccionados] = useState([]);
  const [permisosPorModulo, setPermisosPorModulo] = useState([]);
  const [step, setStep] = useState(1);

  const msgs = useRef(null);

  const {
    UsuariosAgg,
    handleChangeUsuario,
    obtenerPerfiles,
    perfilesAgg,
    obtenerModulos,
    modulosAgg,
    setModulosAgg,
    permisosAgg,
    guardarUsuario,
    errors,
    setErrors,
    setUsuariosAgg,
  } = useUsuarios();

  const handleClose = () => {
    // Cierra el Dialog y reinicia el estado
    onClose();

    // Limpia los campos del formulario
    setUsuariosAgg({
      nombre: "",
      usuario: "",
      correo: "",
      clave: "",
      claverepetida: "",
    });

    // Limpia las selecciones
    setPerfilesSeleccionados([]);
    setModulosSeleccionados([]);
    setPermisosPorModulo([]);

    // Limpia los errores
    setErrors({});
  };

  const handleGuardar = async () => {
    try {
      const formData = {
        nombre_completo: UsuariosAgg.nombre, //nombre_completo
        usuario: UsuariosAgg.usuario,
        correo: UsuariosAgg.correo,
        clave: UsuariosAgg.clave,
        perfiles: perfilesSeleccionados,
        roles: permisosPorModulo,
      };

      if (step === 2 && perfilesSeleccionados.length === 0) {
        console.error(
          "No se puede guardar si no se ha seleccionado ningún perfil"
        );
        return;
      }

      if (step === 3 && permisosPorModulo.length === 0) {
        console.error(
          "No se puede guardar si no se ha seleccionado ningún permiso de módulo"
        );
        return;
      }

      // Llama a la función de guardarUsuario y pasa el formData
      const response = await guardarUsuario(formData);

      if (response) {
        onClose(); // Cierra el modal
        setStep(1); // Vuelve al primer paso --> no funciona

        // Limpia los campos del formulario
        setUsuariosAgg({
          nombre: "",
          usuario: "",
          correo: "",
          clave: "",
          claverepetida: "",
        });
        setPerfilesSeleccionados([]);
        setModulosSeleccionados([]);
        setPermisosPorModulo([]);
      }
    } catch (error) {
      // Maneja los errores si ocurren
      console.error("Error al guardar el usuario:", error);
    }
  };

  const handleNext = () => {
    // Realiza las validaciones aquí antes de avanzar al siguiente paso
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const errors = {};

    if (step === 1) {
      if (UsuariosAgg.nombre.length < 10 || UsuariosAgg.nombre.length > 30) {
        errors.nombre =
          "El nombre completo debe tener entre 10 y 30 caracteres";
      }

      if (UsuariosAgg.usuario.length < 5 || UsuariosAgg.usuario.length > 15) {
        errors.usuario = "El usuario debe tener entre 5 y 15 caracteres";
      }

      if (!emailPattern.test(UsuariosAgg.correo)) {
        errors.correo = "El correo electrónico no es válido";
      }
      if (
        UsuariosAgg.clave.trim() === "" &&
        UsuariosAgg.claverepetida.trim() === ""
      ) {
        // Para cuando ambos campos están vacíos
        errors.clave = "La clave está vacía";
        errors.claverepetida = "La confirmación de clave está vacía";
      } else if (UsuariosAgg.clave !== UsuariosAgg.claverepetida) {
        // Para cuando las contraseñas no coinciden
        errors.clave = "Las contraseñas no coinciden";
        errors.claverepetida = "Las contraseñas no coinciden";
      }
    }
    if (step === 2) {
      if (perfilesSeleccionados.length === 0) {
        errors.perfiles = "Debes seleccionar al menos un perfil";
      }
    }
    if (step === 3) {
      if (permisosPorModulo.length === 0) {
        errors.modulos = "Debes seleccionar al menos un modulo";
      }
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setErrors({});
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    if (step === 2) {
      obtenerPerfiles();
    } else if (step === 3) {
      obtenerModulos(perfilesSeleccionados);
    }
  }, [step]);

  // Botones de Atrás, Siguiente y Guardar del Modal
  const footerContent = (
    <div>
      {step > 1 && (
        <Button
          className="p-button-text bg-gray-300 p-2 mx-2 rounded-md px-3 hover:bg-gray-400"
          onClick={handlePrev}
        >
          Atrás
        </Button>
      )}
      {step < 3 ? (
        <Button
          className="bg-primaryYellow p-2 mx-2 rounded-md px-3 hover:bg-yellow-500"
          onClick={handleNext}
        >
          Siguiente
        </Button>
      ) : (
        <Button
          className="bg-primaryYellow p-2 mx-2 rounded-md px-3 hover:bg-yellow-500"
          onClick={handleGuardar}
        >
          Guardar
        </Button>
      )}
    </div>
  );

  // Checkbox de Perfiles
  const CheckboxChange = (rowData) => {
    const perfilId = rowData.id_perfil;

    // Verifica si el perfil ya está en la lista de seleccionados
    if (
      perfilesSeleccionados.some(
        (perfil) => perfil.id_perfil === rowData.id_perfil
      )
    ) {
      // Si está en la lista, lo deselecciona
      const updatedSeleccionados = perfilesSeleccionados.filter(
        (per) => per.id_perfil !== perfilId
      );
      setPerfilesSeleccionados(updatedSeleccionados);
    } else {
      // Si no está en la lista, lo selecciona
      setPerfilesSeleccionados([
        ...perfilesSeleccionados,
        { id_perfil: perfilId },
      ]);
    }
  };

  const checkboxPerfil = (rowData) => {
    return (
      <input
        type="checkbox"
        checked={perfilesSeleccionados.some(
          (perfil) => perfil.id_perfil == rowData.id_perfil
        )}
        onChange={() => CheckboxChange(rowData)}
      />
    );
  };

  // Checkbox de permisos
  const CheckboxChangePermiso = (permisoId, moduloId, idRolModulo) => {
    // Verifica si el permiso ya está en la lista de seleccionados
    const isPermisoSelected = permisosPorModulo.some(
      (permiso) => permiso.id_rol === idRolModulo
    );

    if (isPermisoSelected) {
      // Deseleccionar el permiso eliminándolo del array
      const updatedPermisos = permisosPorModulo.filter(
        (permiso) => permiso.id_rol !== idRolModulo
      );
      setPermisosPorModulo(updatedPermisos);
    } else {
      // Actualizar los permisos seleccionados para el módulo
      const updatedPermisos = [...permisosPorModulo, { id_rol: idRolModulo }];
      setPermisosPorModulo(updatedPermisos);
    }
  };

  return (
    <Dialog
      header="Agregar Usuario"
      visible={visible}
      style={{ width: "40vw" }}
      onHide={handleClose}
      footer={footerContent}
    >
      <div>
        {step === 1 && (
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-gray-600">Nombre completo *</label>
                <InputText
                  value={UsuariosAgg.nombre}
                  type="text"
                  name="nombre"
                  className={`border-1 p-1 rounded-md ${
                    errors.nombre ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={(e) => handleChangeUsuario(e)}
                />
                {errors.nombre && (
                  <div className="text-red-600 text-xs w-44">
                    {errors.nombre}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600">Usuario *</label>
                <InputText
                  value={UsuariosAgg.usuario}
                  type="text"
                  name="usuario"
                  className={`border-1 p-1 rounded-md ${
                    errors.usuario ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={(e) => handleChangeUsuario(e)}
                />
                {errors.usuario && (
                  <div className="text-red-600 text-xs w-44">
                    {errors.usuario}
                  </div>
                )}
              </div>
              <div className="flex flex-col col-span-2">
                <label className="text-gray-600">Correo *</label>
                <InputText
                  value={UsuariosAgg.correo}
                  type="email"
                  name="correo"
                  className={`border-1 p-1 rounded-md ${
                    errors.correo ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={(e) => handleChangeUsuario(e)}
                />
                {errors.correo && (
                  <div className="text-red-600 text-sm">{errors.correo}</div>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600">Contraseña *</label>
                <InputText
                  value={UsuariosAgg.clave}
                  type="password"
                  name="clave"
                  className={`border-1 p-1 rounded-md ${
                    errors.clave ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={(e) => handleChangeUsuario(e)}
                />
                {errors.clave && (
                  <div className="text-red-600 text-xs ">{errors.clave}</div>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600">Repetir Contraseña *</label>
                <InputText
                  value={UsuariosAgg.claverepetida}
                  type="password"
                  name="claverepetida"
                  className={`border-1 p-1 rounded-md ${
                    errors.claverepetida ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={(e) => handleChangeUsuario(e)}
                />
                {errors.claverepetida && (
                  <div className="text-red-600 text-xs ">
                    {errors.claverepetida}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="flex">
              <h1>Perfiles</h1>
              <div className="ml-16"></div>
            </div>
            <div className="p-mx-auto mt-3 p-datatable">
              <DataTable value={perfilesAgg}>
                <Column field="id_perfil" header="ID" />
                <Column field="nombre_perfil" header="Nombre" />
                <Column
                  field="col1"
                  header="Check"
                  body={checkboxPerfil}
                  style={{ width: "3em" }}
                />
              </DataTable>
              <div className="text-center mt-2">
                {errors.perfiles && (
                  <Message
                    severity="warn"
                    text="Debes seleccionar al menos un perfil"
                  >
                    {errors.perfiles}
                  </Message>
                )}
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h1>Modulos</h1>
            <div className="p-mx-auto mt-3 p-datatable">
              <DataTable value={modulosAgg}>
                <Column field="id_modulo" header="ID" />
                <Column field="nombre_modulo" header="Nombre del Módulo" />
                

                {/* Columna para el permiso "Consultar" */}
                <Column
                  header="Consultar"
                  body={(rowData) =>
                    rowData.permisos.map((r, index) => {
                      if (r.nombre === "Consultar") {
                        return (
                          <input
                            key={index}
                            type="checkbox"
                            data-idrolmodulo={r.id_rol_modulo}
                            checked={permisosPorModulo.some(
                              (permiso) => permiso.id_rol == r.id_rol_modulo
                            )}
                            onChange={() =>
                              CheckboxChangePermiso(
                                "Consultar",
                                rowData.id_modulo,
                                r.id_rol_modulo
                              )
                            }
                          />
                        );
                      }
                    })
                  }
                  style={{ width: "5em" }}
                />

                {/* Columna para el permiso "Crear/Editar" */}
                <Column
                  header="Crear/Editar"
                  body={(rowData) =>
                    rowData.permisos.map((r, index) => {
                      if (r.nombre === "Crear/Editar") {
                        return (
                          <input
                            key={index}
                            type="checkbox"
                            data-idrolmodulo={r.id_rol_modulo}
                            checked={permisosPorModulo.some(
                              (permiso) => permiso.id_rol == r.id_rol_modulo
                            )}
                            onChange={() =>
                              CheckboxChangePermiso(
                                "Crear/Editar",
                                rowData.id_modulo,
                                r.id_rol_modulo
                              )
                            }
                          />
                        );
                      }
                    })
                  }
                  style={{ width: "5em" }}
                />

                {/* Columna para el permiso "Eliminar" */}
                <Column
                  header="Eliminar"
                  body={(rowData) =>
                    rowData.permisos.map((r, index) => {
                      if (r.nombre === "Borrar") {
                        return (
                          <input
                            key={index}
                            type="checkbox"
                            data-idrolmodulo={r.id_rol_modulo}
                            checked={permisosPorModulo.some(
                              (permiso) => permiso.id_rol == r.id_rol_modulo
                            )}
                            onChange={() =>
                              CheckboxChangePermiso(
                                "Borrar",
                                rowData.id_modulo,
                                r.id_rol_modulo
                              )
                            }
                          />
                        );
                      }
                    })
                  }
                  style={{ width: "5em" }}
                />
              </DataTable>
          <div className="text-center mt-2">
          {errors.modulos && (
            <Message severity="warn" text={errors.modulos} />
          )}
        </div>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default ModalAgregarUsuarios;
