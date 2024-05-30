import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchPokemonList, fetchPokemonTypes, fetchPokemonByType } from '../../api/pokemonApi';

interface PokemonState {
  list: Array<{ name: string, url: string }>;
  types: Array<{ name: string }>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  currentPage: number;
  totalPages: number;
  selectedType: string;
  searchTerm: string;
}

const initialState: PokemonState = {
  list: [],
  types: [],
  status: 'idle',
  currentPage: 0,
  totalPages: 0,
  selectedType: 'all',
  searchTerm: '',
};

export const getPokemonList = createAsyncThunk(
  'pokemon/getPokemonList',
  async ({ offset, limit }: { offset: number, limit: number }) => {
    const response = await fetchPokemonList(offset, limit);
    return response.data;
  }
);

export const getPokemonTypes = createAsyncThunk(
  'pokemon/getPokemonTypes',
  async () => {
    const response = await fetchPokemonTypes();
    return response.data;
  }
);

export const getPokemonByType = createAsyncThunk(
  'pokemon/getPokemonByType',
  async ({ type, offset, limit }: { type: string, offset: number, limit: number }) => {
    const response = await fetchPokemonByType(type);
    const results = response.data.pokemon.slice(offset, offset + limit).map((poke: any) => poke.pokemon);
    return { results, count: response.data.pokemon.length };
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSelectedType(state, action: PayloadAction<string>) {
      state.selectedType = action.payload;
      state.currentPage = 0;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPokemonList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPokemonList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.results;
        state.totalPages = Math.ceil(action.payload.count / 28); 
      })
      .addCase(getPokemonTypes.fulfilled, (state, action) => {
        state.types = action.payload.results;
      })
      .addCase(getPokemonByType.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.results;
        state.totalPages = Math.ceil(action.payload.count / 28);
      });
  },
});

export const { setPage, setSelectedType, setSearchTerm } = pokemonSlice.actions;
export default pokemonSlice.reducer;
