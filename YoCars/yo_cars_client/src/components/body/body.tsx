import React from 'react';
import styles from './body.module.css'
import Header from "../header/header";
import Main from "../main/main";
import Slider from "../slider/slider";
<link href="https://fonts.googleapis.com/css?family=Montserrat:100" rel="stylesheet"></link>;
<link href="https://fonts.googleapis.com/css2?family=Rosarivo&display=swap" rel="stylesheet"></link>


const SiteComponent = () => {

    return (
        <div className="App">
            <Header/>
            <Main/>
            <Slider/>
           
        </div>
    );
};

export default SiteComponent;