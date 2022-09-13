import React from "react";
import { Link } from "react-router-dom";
import styledLanding from './LandingPage.module.css'

export default function Landing (){
  return (
      <div className={styledLanding.background}>
      <h1> Bienvenido a mi Pagina de Pokemones</h1>
      <Link to= {'/home'}>

          <button className={styledLanding.btn}>INGRESAR</button>
      </Link>
      </div>
  )
}

