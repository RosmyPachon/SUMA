import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { Key_Icono, Trash_Icono, Edit_Icono } from "../../public/Icons/Iconos";
import { Link } from "react-router-dom";

const Usuarios = () => {
  const [data, setData] = useState([
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
    { id: 3, name: "Bob", age: 35 },
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
    { id: 3, name: "Bob", age: 35 },
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
    { id: 3, name: "Bob", age: 35 },
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
    { id: 3, name: "Bob", age: 35 },
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
    { id: 3, name: "Bob", age: 35 },
  ]);

  const [selectedColumns, setSelectedColumns] = useState([
    { field: "id", header: "ID" },
    { field: "name", header: "Name" },
    { field: "age", header: "Age" },
  ]);

  const handleColumnToggle = (event) => {
    setSelectedColumns(event.value);
  };

  return (
    <div className="w-5/6">
      <div className="flex justify-center gap-x-4 m-2 p-3">
        <h1 className="text-3xl">Usuarios</h1>
        <i className="pi pi-user" style={{ fontSize: "2rem" }}></i>
      </div>
      <div className="bg-neutral-100 my-3 p-3 rounded-md w-full">
        <button className="bg-primaryYellow p-2 mx-2 rounded-md px-3 hover:bg-yellow-500">
          <i className="pi pi-plus mx-2 font-medium"></i>
          Agregar
        </button>
        <Link
          className="px-4 p-2 mx-2 rounded-md text-red-500 border-2
           border-red-500 hover:bg-red-500
            hover:text-white transition duration-300 ease-in-out"
            to="/home/config/usuarios/inactivos"
        >
          Inactivos
        </Link>
      </div>
      <div className="bg-neutral-100 flex rounded-t-lg p-3 w-full">
        <div className="flex-grow">
          <MultiSelect
            value={selectedColumns}
            options={[
              { field: "id", header: "ID" },
              { field: "name", header: "Name" },
              { field: "age", header: "Age" },
            ]}
            onChange={handleColumnToggle}
            optionLabel="header"
            style={{ width: "200px" }}
          />
        </div>
        <div className="flex items-center justify-end">
          <span className="p-input-icon-left">
            <i className="pi pi-search " />
            <InputText className="h-10 pl-8" placeholder="Buscar" />
          </span>
        </div>
      </div>

      <div className="card">
        <DataTable
          value={data}
          paginator={true}
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          tableStyle={{ minWidth: "50rem" }}
        >
          {selectedColumns.map((col) => (
            <Column key={col.field} field={col.field} header={col.header} />
          ))}
          {/*columna Acciones */}
          <Column
            key="actions"
            style={{ width: "10%" }}
            body={(rowData) => (
              <div className="text-center flex gap-x-3">
                <Button
                  tooltip="Editar"
                  tooltipOptions={{ position: "top" }}
                  className="p-button-rounded p-button-success p-mr-2"
                >
                  {Edit_Icono}
                </Button>
                <Button
                  tooltip="Eliminar"
                  className="p-button-rounded p-button-danger p-mr-2"
                  tooltipOptions={{ position: "top" }}
                >
                  {Trash_Icono}
                </Button>
                <Button
                  tooltip="Restablecer"
                  className="p-button-rounded p-button-info"
                  tooltipOptions={{ position: "top" }}
                >
                  {Key_Icono}
                </Button>
              </div>
            )}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default Usuarios;
