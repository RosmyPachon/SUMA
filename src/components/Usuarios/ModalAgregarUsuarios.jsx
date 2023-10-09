import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

const ModalAgregarUsuarios = ({ visible, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    // Validación de datos en cada etapa
    // if (step === 1 && formData.name === "") {
    //   alert("El nombre es obligatorio");
    //   return;
    // }

    // if (step === 2 && formData.email === "") {
    //   alert("El correo electrónico es obligatorio");
    //   return;
    // }

    // Avanzar a la siguiente etapa
    setStep(step + 1);
  };

  const handlePrev = () => {
    // Retroceder a la etapa anterior
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // mostrar los datos en consola
    console.log("Datos del formulario:", formData);
  };

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
          onClick={handleSubmit}
        >
          Guardar
        </Button>
      )}
    </div>
  );

  const [tableData, setTableData] = useState([
    { id: 1, name: "Usuarios", col1: false, col2: false, col3: false },
    { id: 2, name: "Modulos", col1: false, col2: false, col3: false },
    { id: 2, name: "Perfiles", col1: false, col2: false, col3: false },
    { id: 2, name: "Roles", col1: false, col2: false, col3: false },
  ]);
  const [PerfilData, setPerfilData] = useState([
    { id: 1, name: "Administrador", col1: false, col2: false, col3: false },
    { id: 2, name: "Consultor", col1: false, col2: false, col3: false },
    { id: 2, name: "Proveedor", col1: false, col2: false, col3: false },
    { id: 2, name: "Cliente", col1: false, col2: false, col3: false },
  ]);

  const handleCheckboxChange = (rowData, colName) => {
    const updatedTableData = [...tableData];
    const rowIndex = updatedTableData.findIndex((row) => row.id === rowData.id);
    updatedTableData[rowIndex][colName] = !updatedTableData[rowIndex][colName];
    setTableData(updatedTableData);
  };
  const CheckboxChange = (rowData, colName) => {
    const updatedPerfilData = [...PerfilData];
    const rowIndex = updatedPerfilData.findIndex((row) => row.id === rowData.id);
    updatedPerfilData[rowIndex][colName] = !updatedPerfilData[rowIndex][colName];
    setPerfilData(updatedPerfilData);
  };

  const checkboxPerfil = (rowData, column) => {
    return (
      <input
        type="checkbox"
        checked={rowData[column.field]}
        onChange={() => CheckboxChange(rowData, column.field)}
      />
    );
  };
  const checkboxTemplate = (rowData, column) => {
    return (
      <input
        type="checkbox"
        checked={rowData[column.field]}
        onChange={() => handleCheckboxChange(rowData, column.field)}
      />
    );
  };

  return (
    <Dialog
      header="Agregar Usuario"
      visible={visible}
      style={{ width: "40vw" }}
      onHide={onClose}
      footer={footerContent}
    >
      <div>
        {step === 1 && (
          <div className="flex justify-center flex-1">
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4">
                <div className="flex flex-col">
                  <label className="text-gray-600">Nombre</label>
                  <InputText
                    type="text"
                    name="name"
                    className="border-1 border-gray-300 p-1 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-600">Usuario</label>
                  <InputText
                    type="text"
                    name="username"
                    className="border-1 border-gray-300 p-1 rounded-md"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600">Correo</label>
                <InputText
                  type="text"
                  name="email"
                  className="border-1 border-gray-300 p-1 rounded-md flex-grow"
                />
              </div>

              <div className="flex flex-row space-x-4">
                <div className="flex flex-col">
                  <label className="text-gray-600">Contraseña</label>
                  <InputText
                    type="password"
                    name="password"
                    className="border-1 border-gray-300 p-1 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-600">Repetir Contraseña</label>
                  <InputText
                    type="password"
                    name="passwordRepeat"
                    className="border-1 border-gray-300 p-1 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h1>Perfiles</h1>
            <div className="p-mx-auto mt-3 p-datatable">
              <DataTable value={PerfilData}>
                <Column field="name" header="Nombre" />
                <Column
                  field="col1"
                  header=""
                  body={checkboxPerfil}
                  style={{ width: "3em" }}
                />
                <Column field="name" header="Nombre" />
                <Column
                  field="col2"
                  header=""
                  body={checkboxPerfil}
                  style={{ width: "3em" }}
                />
              </DataTable>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h1>Modulos</h1>
            <div className="p-mx-auto mt-3 p-datatable">
              <DataTable value={tableData}>
                <Column
                  header=""
                  body={checkboxTemplate}
                  style={{ width: "3em" }}
                />
                <Column field="name" header="Nombre" />
                <Column
                  field="col1"
                  header="Crear"
                  body={checkboxTemplate}
                  style={{ width: "3em" }}
                />
                <Column
                  field="col2"
                  header="Editar"
                  body={checkboxTemplate}
                  style={{ width: "3em" }}
                />
                <Column
                  field="col3"
                  header="Eliminar"
                  body={checkboxTemplate}
                  style={{ width: "3em" }}
                />
              </DataTable>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default ModalAgregarUsuarios;
