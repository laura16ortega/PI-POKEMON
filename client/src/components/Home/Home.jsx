import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterPokemonsByType,
  filterCreated,
  Sort,
  filterByAttack,
  getType
} from "../../redux/actions";
import { Link } from "react-router-dom";
import CardPokemon from "../CardPokemon/CardPokemon";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SeatchBar/SearchBar";
import styleHome from "./Home.module.css";
// import FilterByTypes from "../FilterTypes/types"
function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons) //
  const types = useSelector(state => state.types)


  console.log(allPokemons)
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

  const currentPokemons = allPokemons.slice( indexOfFirstPokemon, indexOfLastPokemon );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getType())
  }, [dispatch]);

  function handleFilterType(e) {
    dispatch(filterPokemonsByType(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleFilterAttack(e) {
    dispatch(filterByAttack(e.target.value));
  }

  function onSelectsChange(e) {
    dispatch(Sort(e.target.value));
  }

  return (
    <>
      <NavBar />
      <SearchBar className={styleHome.search}/>
      <div className="home">
        <div>
          <select name="select" onChange={onSelectsChange} className={styleHome.az}>
            <option value="Filtro"> A-Z:</option>
            <option value="ASCENDENTE">Ascendente</option>
            <option value="DESCENDENTE">Descendente</option>
          </select>
          <select
            name={styleHome.selects}
            onChange={handleFilterAttack}
            className={styleHome.attack}
          >
            <option value="ataque"> ataque </option>
            <option value="Mayor ataque">Mayor ataque</option>
            <option value="Menor ataque">Menor ataque</option>
          </select>
          <select  onChange={(e) => handleFilterType(e)}>
                <option value='Todos'>Todos los tipos</option>
                {
                    types && types.map(e =>(
                        <option key={e.name} value={e.name} >{e.name}</option>
                    ))
                }
            </select>
          <select onChange={handleFilterCreated}>
            <option value="Todos"> Todos </option>
            <option value="Creados"> Creados </option>
            <option value="Existentes"> Existentes </option>
          </select>
          <Paginado
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
          />
          {currentPokemons?.map((e) => {
              return (
                <fragment>
                  <Link to={"/home/" + e.id}>
                    <CardPokemon
                      name={e.name}
                      img={e.img}
                      types={e.types}
                    />
                  </Link>
                </fragment>
              );
            })} 
        </div>
      </div>
    </>
  );
}

export default Home;
