import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { Link,  useParams } from 'react-router-dom';
import style from'./Detail.module.css'

export default function Detail() {
  const {id} = useParams();

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  const details = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id))
    .then((response) => {
      setLoading(false);
      
   })
  }, [dispatch, id]);
  
      
  if (loading) {
    return (
        <div>
           
            <img
            src={"https://static.wixstatic.com/media/20abc5_e58061f333744c2899c375ec7f024eb3~mv2.gif"}
            width="250px" height="300px"
            alt="Not found"
          />
          
        </div>
    )
}

  

  return (
    <div className={style.container}>
      <div className={style.volver}>
      <Link to="/home"  className={style.letter}> Volver </Link> </div>
      <div>
        {details.length ? (
          details.map((p) => (
            <Link to={`/home/${p.id}`}>
              <div>
                <h1 className={style.names}>{p.name.toUpperCase()}</h1>
                {/* <h2 className={style.id}>#{p.id}</h2> */}
              </div>
              <div>
                <img  className={style.img} src={p.img} alt="" width="250px" height="250px" />
                {p.types.length === 2 ? (
                  <div>
                    <h3 className={style.type1}>
                    <ul className={style.type}>
                      <li>
                        {
                        typeof p.types[0] === 'string' ? p.types[0] : p.types[0]?.name}-  
                         {
                         typeof p.types[1] === 'string' ? p.types[1] : p.types[1]?.name}
                
                      </li>
                    </ul>
                    </h3>
                  </div>
                ) : (
                  <div>
                    <h3 className={style.type2}>{
                    typeof p.types[0] === 'string' ? p.types[0] : p.types[0]?.name}</h3>
                  </div>
                )}

                <div>
                  <h4>
                  <ul>
                    <li className={style.lista}>
                      Vida: {p.hp} Ps -
                      Fuerza: {p.attack} % -
                      Defensa: {p.defense} % -
                      Velocidad: {p.speed} % -
                      Altura: {p.height} Mt -
                      Peso: {p.weight} Kg
                    </li>
                  </ul>
                  </h4>
                </div>
              </div>
            </Link>
          ))
        ) : (
          
          <img
            src={"https://static.wixstatic.com/media/20abc5_e58061f333744c2899c375ec7f024eb3~mv2.gif"}
            width="250px" height="300px"
            alt="Not found"
          />
        )}
      </div>
    </div>
  );
}
