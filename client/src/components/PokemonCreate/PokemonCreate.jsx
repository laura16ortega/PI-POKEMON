import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getType, postPokemon } from "../../redux/actions";
import styleForm from "./pokemon.module.css";

function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = "Name required"
    }
    if (!input.img) {
        errors.img = "img required"
    }
    if (!input.hp || input.hp > 100 || input.hp < 0) {
      errors.hp = "Vida valid 0 - 100"
  }
    if (!input.attack || input.attack > 50 || input.attack < 0) {
        errors.attack = "Ataque valid 0 - 50"
    }
    if (!input.speed || input.speed > 70 || input.speed < 0) {
      errors.speed = "Velocidad valid 0 - 70"
    }
    if (!input.height || input.height > 90 || input.height < 0) {
      errors.height = "Altura valid 0 - 90"
    } 
    if (!input.weight || input.weight > 120 || input.weight < 0) {
      errors.weight = "Peso valid 0 - 120"
    }
    if (!input.defense || input.defense > 100 || input.defense < 0) {
      errors.defense = "Defensa valid 0 - 100"
    }
    if (input.types < 0 ) {
        errors.types = "Enter types"
    } else {
        errors.types = ""
    }
    return errors
}


export default function PokemonCreate() {
    const dispatch = useDispatch()
    const history = useHistory()

    const types = useSelector((state) => state.types);


    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        img: "",
        hp:0,
        attack: 0,
        speed: 0,
        defense: 0,
        height: 0,
        weight: 0,
        types: [] 
    })



    //----------Inputs---------
    function handleInputChange(e) {
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    //-----Select types----
    function handleTypesSelect(e) {
        setInput({
            ...input,
            types: input.types.includes(e.target.value) ? [...input.types] : [...input.types, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.types]: e.target.value
        }))
    }
   
    //---------Send form--------
    function handleSubmit(e) {
        if (input.name === "") {
            e.preventDefault()
            alert("Completar correctamente el formulario")
        } else {
            e.preventDefault();
            dispatch(postPokemon(input))
            alert("Pokemon Creado con exito!")
            setInput({
              name: "",
              img: "",
              hp:0,
              attack: 0,
              speed: 0,
              defense: 0,
              height: 0,
              weight: 0,
              types: [] 
            })
            history.push('/home')
        }
    }

    //---------Delete types---------
    function handleTypesDelete(el) {
        setInput({
            ...input,
            types: input.types.filter(types => types !== el)
        })
    }

  
    useEffect(() => {
        dispatch(getType());
    }, [dispatch]);
 



    return (
        <div  className={styleForm.background}>
            <h1  className={styleForm.h1}>CREATE POKEMON</h1>
            <form className={styleForm.form} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label className={styleForm.label}>Name</label>
                    <input
                        className={styleForm.inputs}
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.name && (
                            <p className={styleForm.danger}>{errors.name} </p>
                        )
                    }
                </div>

                <div>
                    <label  className={styleForm.label} >Image:</label>
                    <input
                        className={styleForm.inputImage}
                        type="url"
                        name="img"
                        value={input.img}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.img && (
                            <div className={styleForm.danger} > {errors.img} </div>
                        )
                    }
                </div>

                
                <div>
                    <label  className={styleForm.label}>Vida</label>
                    <input
                        className={styleForm.inputs}
                        type="number"
                        value={input.hp}
                        name="hp"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.hp && (
                            <div  className={styleForm.danger} > {errors.hp} </div>
                        )
                    }
                </div>

                <div>
                    <label  className={styleForm.label}>Velocidad</label>
                    <input
                        className={styleForm.inputs}
                        type="number"
                        value={input.speed}
                        name="speed"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.speed && (
                            <div  className={styleForm.danger} > {errors.speed} </div>
                        )
                    }
                </div>

                <div>
                    <label  className={styleForm.label}>Ataque</label>
                    <input
                        className={styleForm.inputs}
                        type="number"
                        value={input.attack}
                        name="attack"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.attack && (
                            <div  className={styleForm.danger} > {errors.attack} </div>
                        )
                    }
                </div>
                
                <div>
                    <label  className={styleForm.label}>Defensa</label>
                    <input
                        className={styleForm.inputs}
                        type="number"
                        value={input.defense}
                        name="defense"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.defense && (
                            <div  className={styleForm.danger} > {errors.defense} </div>
                        )
                    }
                </div>

                <div>
                    <label  className={styleForm.label}>Altura</label>
                    <input
                        className={styleForm.inputs}
                        type="number"
                        value={input.height}
                        name="height"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.height && (
                            <div  className={styleForm.danger} > {errors.height} </div>
                        )
                    }
                </div>

                <div>
                    <label  className={styleForm.label}>Peso</label>
                    <input
                        className={styleForm.inputs}
                        type="number"
                        value={input.weight}
                        name="weight"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.weight && (
                            <div  className={styleForm.danger} > {errors.weight} </div>
                        )
                    }
                </div>

                <div className={styleForm.Types}>
                    <label className={styleForm.labelType} >Tipos</label>
                    <select className = {styleForm.typeSelect} onChange={(e) => handleTypesSelect(e)}>
                        {
                            types.map((e) => (
                                <option value={e.name}> {e.name} </option>
                            ))
                        }
                    </select>
                    <ul>
                        {input.types.map(e => (
                            <div>
                                <li className={styleForm.li}>{e}<button
                                    className={styleForm.buttonClose}
                                    type="button"
                                    onClick={() => handleTypesDelete(e)}
                                >X</button>
                                </li>
                            </div>
                        ))}
                    </ul>
                    {
                        errors.types && (
                            <p className={styleForm.danger}> {errors.types} </p>
                        )
                    }
                </div>
                {
                    errors && (errors.name || errors.ataque || errors.vida || errors.background_image || errors. types) ?
                        <p className={styleForm.buttonDanger}>Complete Form</p>
                        :
                        <button
                            className={styleForm.button}
                            type="submit"
                        >Crear Pokemon
                        </button>
                }
            </form>
            <Link to="/home">
                <button className={styleForm.buttonVolver}>Home</button>
            </Link>
        </div>
    )
}



