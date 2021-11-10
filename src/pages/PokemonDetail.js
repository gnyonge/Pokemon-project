import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { likePokemon } from '../modules/pokemonReducer';

const PokemonDetail = ({ match }) => {
  
  const name = match.params.name; // 포켓몬 이름 (영어)
  const dispatch = useDispatch();
  
  const pokemonArray = useSelector(state => state.pokemonReducer.pokemonArray) // 포켓몬 객체 배열
  const pokemon = pokemonArray.find(pokemon => pokemon.name === name) // 이름 같은 객체 추출
  const koreanArray = useSelector(state => state.pokemonReducer.koreanArray) // 한국어 설명 배열
  const pokemonInKorean = koreanArray.find(pokemon => pokemon.name === name) // 이름 같은 객체 추출
  const likeArray = useSelector(state => state.pokemonReducer.likeArray) // 포켓몬 잡았는지 여부를 위함

  const pokemonDetails = pokemon
  const dataInKorean = pokemonInKorean
  const [loading, setLoading] = useState(true);

  const like = (name) => { // 포켓몬 잡기, 버리기 함수
    dispatch(likePokemon(name));
  }

  useEffect(() => {
    setLoading(false);
  }, [])

  
  return (
    <div className="card-container">
      {loading ? (
        <div className="loading">
          <h1>로딩중...</h1>
        </div>
      ) : (
        <div className="detail-container">
          <div className="image-container">
            <img className="detail-image" src={pokemonDetails.sprites.other.dream_world.front_default} alt={pokemonDetails.name}/>
            <p>pokemon</p>
            <div className="sizes">
              <h1>{dataInKorean.names[2].name}</h1>
            </div>
          </div>
          <div className="product">
            <div>
              <div className="genera-container">
                <h2>{dataInKorean.genera[1].genus}</h2>
              </div>
              <div className="desc">
                <ul>
                  <li>
                  {dataInKorean.flavor_text_entries[23].flavor_text}
                  </li>
                  <li>
                  {dataInKorean.flavor_text_entries[31].flavor_text}
                  </li>
                  <li>
                  {dataInKorean.flavor_text_entries[39].flavor_text}
                  </li>
                </ul>
              </div>
            </div>
            <div className="button-container">
              <button className={ likeArray.find(data => data.name === name) !== undefined ? 'remove' : 'add' } onClick={() => like(name)}>
                { likeArray.find(data => data.name === name) !== undefined ? '포켓몬 버리기 ..' : '포켓몬 잡기!' }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonDetail;
