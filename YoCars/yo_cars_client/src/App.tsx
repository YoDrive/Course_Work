import React from 'react'
import './App.css';
import HomePage from "./components/homePage/homePage";
import  LKClient  from './components/privateOffice/lkClient';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Header from "../src/components/header/header"
import Footer from "../src/components/footer/footer"
import AuthorizationPage from "./components/authorization/autorization";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route  path="/" element={<HomePage/>} />
              <Route  path="/lkClient" element={<LKClient/>} />
              <Route  path={"/auth"} element={<AuthorizationPage/>} />
              <Route  path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}


export default App;
