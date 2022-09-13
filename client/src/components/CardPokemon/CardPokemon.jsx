import React from "react";
import styleCard from"./CardPokemon.module.css"

export default function CardPokemon({ name, types, img }) {
  return (
    // <div className={styleCard.container}>
          
    //           <h3>{name}</h3>
    //           <p>{types.map(e => e.name + " / ")}</p>
    //           <img src ={img} alt='imagen' width='200px' height='300px'/>
              
    // </div>

    <div className={styleCard.container}>
      <h3> {name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <li>
            {
              typeof types[0] === 'string' ? types[0].charAt(0).toUpperCase() + types[0].slice(1) : types[0]?.name.charAt(0).toUpperCase() +
              types[0].name.slice(1)}   
               { 
               typeof types[1] === 'string' ? " - " + types[1]   :  types[1]?.name
               }
        </li>
      <img src ={img} alt='imagen' width='200px' height='300px'/>
    </div>
  );
}
