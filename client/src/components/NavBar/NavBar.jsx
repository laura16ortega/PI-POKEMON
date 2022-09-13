import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

export default function NavBar() {
  return (
      <header id="navegador" className={style.header}>
        <Link to="/">
          <img  className={style.logo} src="https://i.imgur.com/avg4dfp.png" alt="404" />
        </Link>
       <div> <Link to="/create" className="created" >
              Crear Pokemon
            </Link></div>
  
      </header>

  );
}
