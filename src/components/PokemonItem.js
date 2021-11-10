import React from 'react';
import { useDispatch } from 'react-redux';
import { likePokemon } from '../modules/pokemonReducer';

const PokemonItem = ({ name, koreanName, image }) => {
  
  const dispatch = useDispatch();

  return (
    <div>
      <div className="name-container">
        <div style={{visibility: 'hidden'}}>
          <button className="delete" onClick={() => dispatch(likePokemon(name))}>BYE</button>
        </div>
        <div className="item-name">{koreanName}</div>
        <button className="delete" onClick={() => dispatch(likePokemon(name))}>BYE</button>
      </div>
      <div className="item-container">
        <img src={image} alt={name}/>
      </div>
    </div>
  )
}

export default PokemonItem
