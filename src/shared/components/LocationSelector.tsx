import { useState } from 'react'

interface LocationSelectorProps {
  // buildings: Building[]; // 자동완성용
  onRouteSearch: (start: string, end: string) => void; // 검색 결과 전달
  onRouteClear : () => void;
}

const LocationSelector = ({ onRouteSearch, onRouteClear }: LocationSelectorProps) => {
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [isRouteActive, setIsRouteActive] = useState<boolean>(false);

  const handleSearchRoute = () => {
    if (isRouteActive) {
      console.log("경로 종료");
      onRouteClear();
      setIsRouteActive(false);
    } else {
        if (!start || !end) {
        alert('출발지와 도착지를 입력하세요');
        return;
      }
      // Main으로 전달
      onRouteSearch(start, end);
      setIsRouteActive(true)
    }
  };
  return (
    <div className="px-16 py-16">
      <div className="bg-p-white rounded-[10px] overflow-hidden shadow-[0, 2px, 8px, rgba(0,0,0,01)]">
        {/* 출발 */}
        <div className="flex items-center gap-8 py-1">
          <label className="font-bold text-17 text-primary-600">출발</label>
          <input
            type="text"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="출발지를 입력하세요 (예: 7호관)"
            disabled={isRouteActive} 
            className="flex-1 px-12 py-12 text-gray-600 bg-gray-100 outline-none text-14 rounded-8"
          />
        </div>
        {/* 도착 */}
        <div className="flex items-center gap-8">
          <label className="font-bold text-17 text-primary-600">도착</label>
          <input
            type="text"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            placeholder="도착지를 입력하세요 (예: 본관)"
            disabled={isRouteActive} 
            className="flex-1 px-12 py-12 text-gray-600 bg-gray-100 outline-none text-14 rounded-8"
          />
        </div>
      </div>
      {/* 길 안내 시작 버튼 */}
      <button
        onClick={handleSearchRoute}
        className="w-full py-16 mt-20 font-bold text-white bg-primary-600 rounded-[10px] text-17"
      >
        {isRouteActive ? '길 안내 종료' : '길 안내 시작'}
      </button>
    </div>
  );
};

export default LocationSelector
