import { useState } from "react";
import NaverMap from "../../shared/components/Map";
import LocationSelector from "../../shared/components/LocationSelector";
import SearchBar from "../../shared/components/SearchBar";
import LocationFetcher from '../../shared/components/LocationFetcher';

interface Building {
  _id: string;
  name: string;
  code: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

function index() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  return (
    <div>
      <SearchBar buildings={buildings} onSearch={setSelectedBuilding} />
      <div className="relative h-screen">
        <NaverMap onBuildingsLoaded={setBuildings} selectedBuilding={selectedBuilding} />
        <LocationFetcher />
        <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-p-white rounded-t-24">
          <LocationSelector />
        </div>
      </div>
    </div>
  );
}

export default index;
