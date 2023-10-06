import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PrimeReactProvider } from "primereact/api";
import "primeicons/primeicons.css";

import { AuthProvider } from "./context/AuthProvider.jsx";

import AppMain from "./router/AppMain.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PrimeReactProvider>
          <AppMain />
        </PrimeReactProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
