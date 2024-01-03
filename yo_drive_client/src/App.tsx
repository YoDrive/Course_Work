import React, {useContext, useEffect} from 'react'
import './App.css';
import HomePage from "./components/homePage/homePage";
import LKClient  from './components/privateOffice/lkClient';
import LKAdmin from './components/privateOffice/lkAdmin';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Footer from "../src/components/footer/footer"
import AuthorizationPage from "./components/authorization/login";
import {observer} from "mobx-react-lite";
import Registration from './components/registration/registration';
import BookingPage from './components/bookingPage/bookingPage';
import Store from "./store/Store";
import {useStore} from "./index";


const store = new Store();

function App() {
    const store = useStore();

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/homePage" element={<HomePage/>}/>
                    <Route path="/lkClient" element={store.isAuth && !store.isAdmin() ? <LKClient /> : <Navigate to="/homePage" replace/>}/>
                    <Route path="/lkAdmin" element={store.isAuth && store.isAdmin() ? <LKAdmin /> : <Navigate to="/homePage" replace/>}/>
                    <Route path="/auth" element={<AuthorizationPage/>}/>
                    <Route path='/bookingPage' element={<BookingPage/>}/>
                    <Route path="*" element={<Navigate to="/homePage" replace/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
        </div>
    );
}


export default observer(App);
