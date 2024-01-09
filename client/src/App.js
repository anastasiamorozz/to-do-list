import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { UserRoleContext } from "./context/UserContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
    const [userRole, setUserRole] = useState(null);
    useEffect(() => {
      if (localStorage.getItem("userRole")) {
        setUserRole(localStorage.getItem("userRole"));
      }
    }, []);
    return (
      <UserRoleContext.Provider value={{ userRole, setUserRole }}>
        <BrowserRouter>
        <Header></Header>
          <AppRouter />
        <Footer></Footer>
        </BrowserRouter>
      </UserRoleContext.Provider>
    );
}

  export default App;
