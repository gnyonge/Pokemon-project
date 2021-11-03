const initialState = {
    pokemonArray: [],
    koreanArray: [],
    likeArray: [],
};

const SET_POKEMONS = 'SET_POKEMONS';
const SET_KOREAN_DATA = 'SET_KOREAN_DATA';
const LIKE_POKEMON = 'LIKE_POKEMON';

export const setPokemons = pokemonArray => ({ type: SET_POKEMONS, pokemonArray });
export const setKoreanData = koreanData => ({ type: SET_KOREAN_DATA, koreanData });
export const likePokemon = pokemonName => ({ type: LIKE_POKEMON, pokemonName });

export default function pokemonReducer(state = initialState, action) {
    switch (action.type) {
        case SET_POKEMONS:
            return {
                ...state,
                pokemonArray: action.pokemonArray
            };
        case SET_KOREAN_DATA:
            return {
                ...state,
                koreanArray: action.koreanData
            };
        case LIKE_POKEMON:
            console.log(state.likeArray)
            if (state.likeArray.find(data => data.name === action.pokemonName) !== undefined) {
                return {
                    ...state,
                    likeArray: state.likeArray.filter(data => data.name !== action.pokemonName)
                }
            }
            return {
                ...state,
                likeArray: state.likeArray.concat({
                    name: action.pokemonName,
                    koreanName: state.koreanArray.find(data => data.name === action.pokemonName).names[2].name,
                    image: state.pokemonArray.find(data => data.name === action.pokemonName).sprites.other.dream_world.front_default,
                })
            }
        default:
            return state;
    };
};