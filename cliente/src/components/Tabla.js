import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import MostrarD from "./MostrarD";
import InsertarP from "./InsertarP";
import MostrarPez from "./MostrarPez";
import MostrarPub from "./MostrarPub";
import MostrarU from "./MostrarU";
function Tabla(){
    return (
    <Router>
        <Navbar />

        <Route path="/" exact>
            <Home />
        </Route>

        <Route path="/mostrarD">
            <MostrarD />
        </Route>

        <Route path="/insertarP">
            <InsertarP />
        </Route>

        <Route path="/mostrarPez">
            <MostrarPez />
        </Route>

        <Route path="/mostrarPub">
            <MostrarPub />
        </Route>

        <Route path="/mostrarU">
            <MostrarU />
        </Route>
    </Router>
    )
}

export default Tabla; 