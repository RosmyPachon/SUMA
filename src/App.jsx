import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PrimeReactProvider } from "primereact/api";
import "primeicons/primeicons.css";

import { AuthProvider } from "./context/AuthProvider.jsx";
import { UsuariosProvider } from "./context/UsuariosProvider.jsx";

import AppMain from "./router/AppMain.jsx";
import { PerfilesProvider } from "./context/PerfilesProvider.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PrimeReactProvider>
          <UsuariosProvider>
            <PerfilesProvider>
              <AppMain />
            </PerfilesProvider>
          </UsuariosProvider>
        </PrimeReactProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
