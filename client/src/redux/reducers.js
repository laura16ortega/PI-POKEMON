const initialState = {
    pokemons: [],
    allPokemons: [],
    detail: [],
    types: [],
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_POKEMONS":
        return {
          ...state,
          pokemons: action.payload,
          allPokemons: action.payload,
        };
      case "FILTER_BY_TYPE":
        const allPokemons = state.allPokemons;
        const typeFiltered =
          action.payload === "Todos"
            ? allPokemons
            : allPokemons.filter((e) => e.types.includes(action.payload));
        return {
          ...state,
          pokemons: typeFiltered,
        };
      case "FILTER_CREATED":
        const createdFilter =
          action.payload === "Creados"
            ? state.allPokemons.filter((e) => e.id.length > 2)
            : state.allPokemons.filter((e) => e.id <= 40);
        return {
          ...state,
          pokemons:
            action.payload === "Todos" ? state.allPokemons : createdFilter,
        };
        case "FILTER_BY_ATTACK":
          let attackFilter = [...state.pokemons];
          attackFilter = attackFilter.sort((a, b) => {
            if (a.attack < b.attack) {
              return action.payload === "Mayor fuerza" ? 1 : -1;
            }
            if (a.attack > b.attack) {
              return action.payload === "Mayor fuerza" ? -1 : 1;
            }
            return 0;
          });
          return {
            ...state,
            pokemons:
              action.payload === "Fuerza" ? state.allPokemons : attackFilter
          };
      case "POST_POKEMON":
        return {
          ...state,
        };
      case "SORT":
        let orderedCharacters = [...state.pokemons];
        orderedCharacters = orderedCharacters.sort((a, b) => {
          if (a.name < b.name) {
            return action.payload === "ASCENDENTE" ? -1 : 1;
          }
          if (a.name > b.name) {
            return action.payload === "ASCENDENTE" ? 1 : -1;
          }
          return 0; 
        });
  
        return {
          ...state,
          pokemons:
            action.payload === "Filtro" ? state.allPokemons : orderedCharacters
        };
      case "SEARCH_NAME":
        return {
          ...state,
          pokemons: action.payload 
        };
      case "GET_DETAILS":
        return {
          ...state,
          detail: action.payload,
        };
  
      case "GET_TYPE":
        return {
          ...state,
          types: action.payload,
        };

      case "SET_DETAIL":
         return {
           detail: []
          }  
      default:
        return state;
    }
  }
  
  export default rootReducer;
  