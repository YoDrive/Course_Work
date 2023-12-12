import React, {useContext, useEffect} from 'react'
import './App.css';
import HomePage from "./components/homePage/homePage";
import LKClient  from './components/privateOffice/lkClient';
import LKAdmin from './components/privateOffice/lkAdmin';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Footer from "../src/components/footer/footer"
import AuthorizationPage from "./components/authorization/login";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import Registration from './components/registration/registration';
import BookingPage from './components/bookingPage/bookingPage';

function App() {
    // const {store} = useContext(Context);
    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         store.checkAuth();
    //     }
    // }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/homePage" element={<HomePage/>}/>
                    <Route path="/lkClient" element={<LKClient/>}/>
                    <Route path="/lkAdmin" element={<LKAdmin/>}/>
                    <Route path="/auth" element={<AuthorizationPage/>}/>
                    <Route path='/bookingPage' element={<BookingPage/>}/>
                    <Route path="*" element={<Navigate to="/homePage" replace/>}/>
                    <Route path="/registration"element={<Registration/>}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
        </div>
    );
}


export default observer(App);
