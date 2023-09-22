import React from 'react'
import './App.css';
import HomePage from "./components/homePage/homePage";
import PrivateOffice from './components/privateOffice/privateOffice';
import {BrowserRouter, Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route  path="/" element={<HomePage/>} />
        <Route  path="/PrivateOffice" element={<PrivateOffice/>} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}


export default App;
