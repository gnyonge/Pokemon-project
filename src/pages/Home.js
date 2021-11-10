import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import PokemonThumbnail from '../components/PokemonThumbnail';
import { fetchPokemon, getKoreanData } from '../App';
import { setPokemons, setKoreanData } from '../modules/pokemonReducer';
import PokeImage from '../images/pica.jpg';

const Home = () => {

  const [allPokemons, setAllPokemons] = useState([]); // store에 저장 될 포켓몬 배열
  const [koData, setKoData] = useState([]); // store에 저장될 한국어 설명 배열
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20'); // 다음 20개 포켓몬 가져오는 api 주소
  const [loading, setLoading] = useState(true); // 처음 렌더링 될 때 로딩중 변수
  const [moreLoading, setMoreLoading] = useState(false); // 더보기 눌렀을 때 로딩중 변수

  const dispatch = useDispatch();
  const pokemons = useSelector(state => state.pokemonReducer.pokemonArray) // allPokemons를 저장한 포켓몬 배열

  const getAllPokemons = async () => {
    setMoreLoading(true); // 더보기 버튼 -> 로딩중...으로 바뀜
    const createPokemonObject = async (results) => {
      // 포켓몬 이름으로 해당 포켓몬의 객체들을 불러와서 배열에 저장
      const nextList = await Promise.all(results.map(pokemon => fetchPokemon(pokemon.name)));
      setAllPokemons(currentList => [...currentList, ...nextList]);

      const sumList = [...allPokemons, ...nextList];
      // 누적시킨 배열을 돌면서 한국어 설명 객체들을 불러와서 배열에 저장
      const koList = await Promise.all(sumList.map(pokemon => getKoreanData(pokemon.name)));
      setKoData(koList); 
      
      setLoading(false); // 처음 렌더링 할 때의 로딩중 없어지고 포켓몬 썸네일 보여짐
      setMoreLoading(false); // 로딩중... -> 더보기로 바뀜
    }
    
    const pokemonData = await axios.get(loadMore) // 처음 20개 포켓몬 이름만 들어있는 배열 불러옴
    setLoadMore(pokemonData.data.next); // 다음 20개 포켓몬 가져올 api 주소
    createPokemonObject(pokemonData.data.results); // 이름만 들어있는 배열로 함수 실행
  }

  useEffect(() => {
    getAllPokemons(); 
  }, []);

  useEffect(() => { // koData가 변할 때마다 store에 배열 저장
    dispatch(setPokemons(allPokemons)); 
    dispatch(setKoreanData(koData))
  }, [koData]); 


  return (
    <div className="app-container">
      {loading ? (
        <div className="loading">
          <h1>로딩중...</h1>
        </div>
      ) : (
      <>
        <div className="pokemon-container">
          <div>
            <img className="header-image" src={PokeImage} alt="헤더이미지" />
          </div>
          <div className="all-container">
            { pokemons.map((pokemon, index) => (
              <PokemonThumbnail 
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.other.dream_world.front_default}
                type={pokemon.types[0].type.name}
                key={index}
              />
              ))}
          </div>
          <button className="load-more" onClick={() => getAllPokemons()}>{moreLoading ? '로딩중...' : '더보기!'}</button>
        </div>
      </>
    )}
    </div>
  );
}

export default Home
