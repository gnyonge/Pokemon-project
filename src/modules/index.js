import { combineReducers } from 'redux';
import pokemonReducer from './pokemonReducer';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "root",
    storage,
  };

const rootReducer = combineReducers({
    pokemonReducer,
});

export default persistReducer(persistConfig, rootReducer);