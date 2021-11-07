import React, { useState } from "react";
import Axios from "axios"
import Server from "../serverData";
import logo from "../img/logoAdmin.png"
import styles from "../css/login.css"


function Login() {
    const [nombre, setNombre] = useState("");
    const [clave, setClave] = useState("");

    const manejoIngresar = (e) => {
        e.preventDefault();
        console.log(nombre, clave)
        Axios.post(Server + "/loginAdmin", {
            usuario: nombre,
            clave: clave,
        }).then((response) => {
            if (response.data === "Ingreso") {
                alert(response.data)
            }
            else {
                alert(response.data)
            }
        })
    }
    return (
        <div className="contenedor">
            <img className="logo" src={logo} alt="logo" />
            <form onSubmit={e => { manejoIngresar(e) }}>
                <h1 className="titulo">¡Bienvenido!</h1>
                <h6 className="subtitulo">Administrador</h6>
                <label className="label">Usuario</label>
                <input
                    className="input"
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    required />
                <label className="label">Contraseña</label>

                <input
                    className="input"
                    type="password"
                    value={clave}
                    onChange={e => setClave(e.target.value)}
                    required />

                <button className = "boton" type="submit">Siguiente</button>
            </form>
        </div>

    );

};

export default Login;