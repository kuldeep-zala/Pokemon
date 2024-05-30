import React from 'react';

interface PokemonGridProps {
  pokemonList: Array<{ name: string}>;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemonList }) => {
  return (
    <div className="bg-gray-200 grid grid-cols-2 md:grid-cols-4 gap-2 p-2  max-h-[70vh] overflow-y-auto border rounded-lg shadow-md scrollbar-hidden">
      {pokemonList.map((pokemon) => (
        <div
          key={pokemon.name}
          className="flex flex-col items-center justify-center bg-white rounded-md shadow-sm hover:shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-100 p-5"
        >
              <p className="text-lg font-bold text-gray-800 capitalize first-letter:uppercase">{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
};

export default PokemonGrid;
