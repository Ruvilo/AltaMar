import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Sidebar from './components/Sidebar';
import './Style.scss';
import MostrarD from "./components/MostrarD";
import MostrarPez from "./components/MostrarPez";
import MostrarPub from "./components/MostrarPub";
import MostrarU from "./components/MostrarU";
import Login from './components/login.js';

const Home = () =>{
    return (
        <Router>
            <Navbar />
            <div className="flex">
            <Sidebar/>
                <div className="content">
                
                    <Route path="/mostrarPez">
                        <MostrarPez/>
                    </Route>
                    <Route path="/mostrarD">
                        <MostrarD />
                    </Route>
                    <Route path="/mostrarPub/:id/:telefono">
                        <MostrarPub />
                    </Route>

                    <Route path="/mostrarU">
                        <MostrarU />
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
    
                </div>
            </div>
            
        </Router>
            

       

    );

}

export default Home; 