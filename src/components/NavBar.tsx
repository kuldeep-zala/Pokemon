import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setSelectedType,
  getPokemonList,
  getPokemonByType,
  getPokemonTypes,
} from '../features/pokemon/pokemonSlice';

interface NavBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch();
  const types = useAppSelector((state) => state.pokemon.types);
  const selectedType = useAppSelector((state) => state.pokemon.selectedType);

  useEffect(() => {
    dispatch(getPokemonTypes());
  }, [dispatch]);

  const handleTabClick = (type: string) => {
    dispatch(setSelectedType(type));
    if (type === 'all') {
      dispatch(getPokemonList({ offset: 0, limit: 28 }));
    } else {
      dispatch(getPokemonByType({ type, offset: 0, limit: 28 }));
    }
    setIsOpen(false);
  };

  return (
    <div className="bg-gray-800 text-white">
      <nav
        className={`fixed top-0 left-0 h-full w-full bg-gray-800 text-white px-4 py-2 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:flex md:flex-col md:w-64 md:h-100  md:bg-gray-800 md:p-4`}
      >
        <div className="flex justify-between items-center md:mb-4">
          <span className="text-lg font-bold">Pokémon Types</span>
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        <ul className="flex flex-col space-y-2 overflow-y-auto h-auto scrollbar-hidden">
          <li
            className={`flex items-center px-2 py-1 rounded-md cursor-pointer hover:bg-gray-700 ${selectedType === 'all' ? 'bg-gray-700 font-bold' : ''}`}
            onClick={() => handleTabClick('all')}
          >
            All
          </li>
          {types.map((type: { name: string }) => (
            <li
              key={type.name}
              className={`capitalize first-letter:uppercase flex items-center px-2 py-1 rounded-md cursor-pointer hover:bg-gray-700 ${selectedType === type.name ? 'bg-gray-700 font-bold' : ''}`}
              onClick={() => handleTabClick(type.name)}
            >
              {type.name}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
