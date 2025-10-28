import { useEffect, useRef, useState } from 'react'
import { loadNaverMapScript } from '../../utils/naverMapLoader'
import axios from 'axios';

// 임시 타입 세팅
interface Building {
  _id: string;
  name: string;
  code: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface NaverMapProps {
  onBuildingsLoaded?: (buildings: Building[]) => void;
  selectedBuilding?: Building | null;
}

const NaverMap = ({ onBuildingsLoaded, selectedBuilding }: NaverMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [buildings, setBuildings] = useState<Building[]>([]);

  // 네이버 지도 스크립트 로드
  useEffect(() => {
    loadNaverMapScript()
      .then(() => setIsLoaded(true))
      .catch((err) => console.error(err));
  }, []);

  // 건물 데이터 로드
  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/buildings");
        console.log("api response", res.data);

        if (res.data.success) {
          setBuildings(res.data.data);
          onBuildingsLoaded?.(res.data.data);
          console.log("건물 개수:", res.data.data.length);
        }
      } catch (err) {
        console.error("건물 데이터 로드 실패:", err);
      }
    };
    fetchBuildings();
  }, []);

  // 지도 초기화 및 마커 설정
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;
    const centerPosition = new window.naver.maps.LatLng(37.447935, 126.657529);

    const mapOptions = {
      center: centerPosition,
      zoom: 17,
      minZoom: 13,
      maxZoom: 20,
    };
    const map = new (window as any).naver.maps.Map(mapRef.current, mapOptions);
    mapInstanceRef.current = map; 

    buildings.forEach((building) => {
      const markerPosition = new (window as any).naver.maps.LatLng(building.coordinates.lat, building.coordinates.lng);
      const marker = new (window as any).naver.maps.Marker({
        position: markerPosition,
        map: map,
        title: building.name,
      });
      console.log("마커 생성:", building.name);
    });
  }, [isLoaded, buildings]);

  // 입력 건물로 지도 이동
  useEffect(() => {
    if (!selectedBuilding || !mapInstanceRef.current) return;

    const targetPosition = new window.naver.maps.LatLng(
      selectedBuilding.coordinates.lat,
      selectedBuilding.coordinates.lng
    );
    mapInstanceRef.current.setCenter(targetPosition);
    mapInstanceRef.current.setZoom(19); // 줌 확대
  }, [selectedBuilding]);

  return (
    <div className="w-full h-screen">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};


export default NaverMap;
