import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PokemonThumbnail = ({ id, name, image, type }) => {

  const style = `thumb-container ${type}`; // 포켓몬 type마다 배경색 다르게 설정
  const pokemonArray = useSelector(state => state.pokemonReducer.koreanArray) // 한국어 설명 배열
  const nameInKorean = pokemonArray.find(pokemon => pokemon.name === name).names[2].name // 한국어 이름
  
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
