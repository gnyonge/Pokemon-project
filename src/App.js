import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Home from './pages/Home';
import PokemonDetail from './pages/PokemonDetail';
import PokemonBag from './pages/PokemonBag';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/pokemon/:name" component={PokemonDetail} />
      <Route path="/bag" component={PokemonBag} />
    </BrowserRouter>
  );
}

export const fetchPokemon = async (name) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return res.data;
}

export const getKoreanData = async (name) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
  return res.data;
} 

export default App;
