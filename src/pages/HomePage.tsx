import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getPokemonList, setPage, getPokemonByType, setSearchTerm } from '../features/pokemon/pokemonSlice';
import NavBar from '../components/NavBar';
import SearchBox from '../components/SearchBox';
import PokemonGrid from '../components/PokemonGrid';
import PokemonList from '../components/PokemonList';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentPage, totalPages, selectedType, list, searchTerm } = useAppSelector((state) => state.pokemon);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedType === 'all') {
      dispatch(getPokemonList({ offset: currentPage * 28, limit: 28 }));
    } else {
      dispatch(getPokemonByType({ type: selectedType, offset: currentPage * 28, limit: 28 }));
    }
  }, [dispatch, currentPage, selectedType]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      dispatch(setPage(currentPage + 1));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      dispatch(setPage(currentPage - 1));
    }
  };

  const handleSearchChange = (search: string) => {
    dispatch(setSearchTerm(search));
  };

  const filteredList = list.filter((pokemon: any) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex-1 p-4 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
          <div className="flex justify-between items-center w-full md:w-auto md:hidden p-4">
  <h2 className="text-lg font-semibold capitalize first-letter:uppercase">{selectedType} Pokemon's</h2>
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          <div className="hidden md:flex items-center w-full justify-between">
          <h2 className="text-lg font-semibold capitalize first-letter:uppercase ">{selectedType} Pokemon's</h2>
            <SearchBox onSearchChange={handleSearchChange} />
            <div className="flex">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'font-bold' : ''}`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'font-bold' : ''}`}
              >
                List View
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden mb-4">
          <SearchBox onSearchChange={handleSearchChange} />
          <div className="flex justify-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'font-bold' : ''}`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'font-bold' : ''}`}
            >
              List View
            </button>
          </div>
        </div>

        {filteredList.length === 0 ? (
         <div className="text-center">
         No Pokémon found
       </div>
        ) : (
          <>
            {viewMode === 'grid' ? <PokemonGrid pokemonList={filteredList} /> : <PokemonList pokemonList={filteredList} />}
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className="p-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="p-2">
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1}
                className="p-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
