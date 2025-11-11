import { useState } from "react";
import NaverMap from "../../shared/components/Map";
import LocationSelector from "../../shared/components/LocationSelector";
import SearchBar from "../../shared/components/SearchBar";
import type { Building } from "../../types/Building";

function Index() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  const [routeQuery, setRouteQuery] = useState<{start: string, end: string} | null>(null);

  return (
    <div>
      <SearchBar buildings={buildings} onSearch={setSelectedBuilding} />
      <div className="relative h-screen">
        <NaverMap 
          onBuildingsLoaded={setBuildings} 
          selectedBuilding={selectedBuilding} 
          routeQuery={routeQuery} 
        />
        {/* <LocationFetcher /> */}
        <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-p-white rounded-t-24">
          <LocationSelector
            onRouteSearch={(start, end) => {
              console.log("경로 검색:", start, "→", end);
              setRouteQuery({ start, end });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Index;
