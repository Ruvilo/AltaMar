import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import MostrarD from "./MostrarD";
import InsertarP from "./InsertarP";
import MostrarP from "./MostrarP";
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

        <Route path="/mostrarP/:id">
            <MostrarP />
        </Route>
    </Router>
    )
}

export default Tabla; 