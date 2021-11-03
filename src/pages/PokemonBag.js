import React from 'react'
import { useSelector } from 'react-redux';
import PokemonItem from '../components/PokemonItem';

const PokemonBag = () => {
  const likeList = useSelector(state => state.pokemonReducer.likeArray)

  return (
      <div>
        {likeList.length === 0 ? (
          <div className="bag-container">
            <h1>아직 잡은 포켓몬이 없어요!</h1>
          </div>
        ) : (
          <div className="bag">
          { likeList.map( (pokemon, index) => (
            <PokemonItem 
              name={pokemon.name}
              koreanName={pokemon.koreanName}
              image={pokemon.image}
              key={index}
            />
           ))}
        </div>
        )}
        
      </div>
  )
}

export default PokemonBag
