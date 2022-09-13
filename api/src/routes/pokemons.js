const { Router } = require("express");
const getAllPokemons = require("../controllers/getPokemon");
const router = Router();
const { Pokemon, Type } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    let name = req.query.name; //Recibo la request en una variable
    let pokemonsTotal = await getAllPokemons(); //Guardo mi controlador que trae todos los pokemons en una variable..
    if (name) { //Consulto si me pasan un nombre y lo busco en la variable de arriba
      let pokemonName = await pokemonsTotal.filter((el) => 
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      pokemonName.length
        ? res.status(200).send(pokemonName) // Si lo encuentro lo devuelvo,
        : res.status(404).send("El pokemon ingresado no existe"); // y sino devuelvo el texto.
    } else {
      res.status(200).send(pokemonsTotal); //Sino devuelvo todos los pokemons
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => { //Busqueda por id
  try {
    const id = req.params.id;
    const pokemonsTotal = await getAllPokemons();
    if (id) { //Si me pasan un ID, filtro el que coincida con ese mismo, sino devuelvo texto.
      let pokemonId = pokemonsTotal.filter((el) => el.id == id); 
      pokemonId.length
        ? res.status(200).json(pokemonId)
        : res.status(404).send("No se encontró el pokemon");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => { //Ruta de creacion del pokemon
  try {
    let { name, img, hp, attack, defense, speed, height, weight, types} = req.body //Datos que necesito pedir

    const newPokemon = await Pokemon.create({
      name,
      img,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    if (!name) return res.json({ info: "El nombre es obligatorio" });

    if(Array.isArray(types) && types.length){ //Consulto si lo que me llega en TYPES, es un arreglo y si tiene algo adentro.
      let dbTypes = await Promise.all( //Armo una variable que dentro tendra una resolucion de promesas
        types.map((e) => { // Agarro la data de types y le hago un map para verificar que cada elemento exista en 
          return Type.findOne({where:{ name: e}}) // nuestra tabla de tipos
        })
      )
     await newPokemon.setTypes(dbTypes) //Una vez que se resuelva la promesa del Pokemon.create, le agrego los tipos

     return res.send("Pokemon creado exitosamente");
    }
  } catch (err) {
    res.status(400).send("Error en data");
  }
})


module.exports = router;
