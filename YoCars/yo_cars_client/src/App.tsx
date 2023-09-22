import React from 'react'
import './App.css';
import HomePage from "./components/homePage/homePage";
import  LKClient  from './components/privateOffice/lkClient';
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Header from "../src/components/header/header"
import Footer from "../src/components/footer/footer"

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
        <Route  path="/" element={<HomePage/>} />
        <Route  path="/lkClient" element={<LKClient/>} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}


export default App;
