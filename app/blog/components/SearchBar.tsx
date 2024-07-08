import { CiSearch } from "react-icons/ci";
import { ChangeEvent, FC } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className='flex justify-center items-center md:p-10 w-full'>
      <div className='md:w-1/2 p-2 mx-5 rounded-xl border border-black flex transition-all duration-500 hover:scale-105'>
        <CiSearch className='text-2xl mr-2' />
        <input
          type='text'
          placeholder='Search title or tags...'
          className='w-full outline-none'
          onChange={handleInputChange}
        />
      </div>
      <button className='p-2 px-3 text-gray-100 rounded-xl bg-black'><CiSearch className='text-2xl' /></button>
    </div>
  );
};

export default SearchBar;
