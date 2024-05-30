import React from 'react';

interface PokemonListProps {
  pokemonList: Array<{ name: string }>;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemonList }) => {
  return (
    <div className="bg-gray-200 max-h-[70vh] overflow-y-auto border px-2 rounded-lg shadow-md scrollbar-hidden">
      <ul className="divide-y divide-gray-200">
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name} className="py-2 px-2 flex items-center justify-between hover:bg-gray-100 bg-white rounded-md my-2">
            <span className="text-lg font-semibold capitalize first-letter:uppercase">{pokemon.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
