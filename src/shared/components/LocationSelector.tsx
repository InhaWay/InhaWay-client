import { useState } from 'react'

const LocationSelector = () => {
  const [startLocation, setStartLocation] = useState<string>('');
  const [endLocation, setEndLocation] = useState<string>('');

  // TODO : 추후 API 연동
  const handleSearchRoute = () => {
    console.log("길 안내 시작");
  }
  return (
    <div className="px-16 py-16">
      <div className="bg-p-white rounded-[10px] overflow-hidden">
        {/* 출발 */}
        <div className="flex items-center gap-8 py-1">
          <label className="font-bold text-17 text-primary-600">출발</label>
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            placeholder="출발지를 입력하세요(예: 7호관)"
            className="flex-1 px-12 py-12 text-gray-600 bg-gray-100 outline-none text-14 rounded-8"
          />
        </div>
        {/* 도착 */}
        <div className="flex items-center gap-8">
          <label className="font-bold text-17 text-primary-600">도착</label>
          <input
            type="text"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            placeholder="도착지를 입력하세요(예: 본관)"
            className="flex-1 px-12 py-12 text-gray-600 bg-gray-100 outline-none text-14 rounded-8"
          />
        </div>
      </div>
      {/* 길 안내 시작 버튼 */}
      <button 
        onClick={handleSearchRoute}
        className='w-full py-16 mt-20 font-bold text-white bg-primary-600 rounded-[10px] text-17'
      >
        길 안내 시작
      </button>
    </div>
  );
}

export default LocationSelector
