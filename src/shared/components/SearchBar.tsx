import { useState } from "react";
import { Search } from "lucide-react";

interface Building {
  _id: number;
  name: string;
  code: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface SearchBarProps {
  placeholder?: string;
  buildings: Building[];
  onSearch: (building: Building | null) => void;
}

const SearchBar = ({ 
    placeholder = "건물을 입력하세요", 
    buildings, onSearch 
  }: SearchBarProps) => {
    
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    const found = buildings.find(b => 
      b.name.includes(searchTerm) ||
      b.code.includes(searchTerm)
    )
    if(found) {
      onSearch(found);
      setSearchTerm(found.name)
    } else {
      console.log("건물을 찾을 수 없습니다.");
      alert("건물을 찾을 수 없습니다.");
    }
  }

  return (
    <div className="relative w-full px-16 py-12 bg-p-white">
      <div className="flex items-center gap-12 px-2 py-2 bg-gray-100 rounded-12">
        <Search className="w-20 h-20 text-gray-400" />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value) }
          placeholder={placeholder} 
          className="flex-1 text-gray-600 bg-gray-100 outline-none text-17" 
        />
        <button 
          onClick={handleSearch}
          className="px-3 py-2 font-bold bg-primary-600 text-p-white rounded-8">검색</button>
      </div>
    </div>
  );
};

export default SearchBar;
