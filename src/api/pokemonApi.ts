 import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const fetchPokemonList = (offset: number = 0, limit: number = 28) =>
  api.get(`/pokemon?limit=${limit}&offset=${offset}`);

export const fetchPokemonTypes = () =>
  api.get('/type');

export const fetchPokemonByType = (type: string) =>
  api.get(`/type/${type}`);
