import React from 'react'
import { useSelector } from 'react-redux';
import PokemonItem from '../components/PokemonItem';

const PokemonBag = () => {
  const likeList = useSelector(state => state.pokemonReducer.likeArray)

  return (
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
  )
}

export default PokemonBag
