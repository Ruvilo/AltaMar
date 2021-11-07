import React from 'react';
import {NavLink} from 'react-router-dom';
const Sidebar = () =>{
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <NavLink to="/MostrarPez" className="  btn" exact activeClassName="active">Agregar Productos</NavLink>
                </li>
                
                <li>
                    <NavLink to="/MostrarD" className="  btn "exact activeClassName="active">Productos por usuario</NavLink>
                </li>
                <li>
                    <NavLink to="/MostrarU" className="  btn "exact activeClassName="active">Administrar Usuario</NavLink>
                </li>
            </ul>
        </div>

    );

}

export default Sidebar; 