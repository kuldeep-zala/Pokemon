import React from 'react';

interface SearchBoxProps {
  onSearchChange: (search: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearchChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      className="p-2 border rounded"
      onChange={handleChange}
    />
  );
};

export default SearchBox;
