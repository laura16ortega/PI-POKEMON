import React from "react";
import style from "./Paginado.module.css"


export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={style.paginado} >
        {pageNumbers &&
          pageNumbers.map(number => {
             return <li className={style.number} key ='num'>
           <button className={style.btn} onClick={() => paginado(number)}>
             {number}
              </button>
            </li>
          })}
      </ul>
    </nav>
  );
}

