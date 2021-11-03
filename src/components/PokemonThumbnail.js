import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PokemonThumbnail = ({ id, name, image, type }) => {
  const style = `thumb-container ${type} card__one`;
  const pokemonArray = useSelector(state => state.pokemonReducer.koreanArray)
  const nameInKorean = pokemonArray.find(pokemon => pokemon.name === name).names[2].name
  
  return (
    <div className={style}>
      <div className="number">
        <small>#{id}</small>
      </div>
      <Link to={`/pokemon/${name}`}>
        <img src={image} alt={name} />
      </Link>
      <div className="detail-wrapper">
        <h3>{nameInKorean}</h3>
        <small>Type: {type}</small>
      </div>
    </div>
  )
}

export default PokemonThumbnail
