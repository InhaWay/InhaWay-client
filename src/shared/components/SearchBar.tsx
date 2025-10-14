import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar = ({placeholder = '건물을 입력하세요'}: SearchBarProps) => {
  return (
    <div className='relative w-full px-16 py-12 bg-p-white'>
      <div className='flex items-center gap-12 px-16 py-12 bg-gray-100 rounded-12'>
        <Search className='w-20 h-20 text-gray-400' />
        <input
          type='text'
          placeholder={placeholder}
          className='flex-1 text-gray-600 bg-gray-100 text-16'
        />
      </div>
    </div>
  )
};

export default SearchBar;
