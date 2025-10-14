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

const NaverMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [buildings, setBuildings] = useState<Building[]>([]);

  // 네이버 지도 스크립트 로드
  useEffect(() => {
    loadNaverMapScript()
      .then(() => setIsLoaded(true))
      .catch((err) => console.error(err));
  }, []);

  // useEffect(() => {
  //   if (!isLoaded || !mapRef.current) return;

  //   // 7호관 좌표
  //   const centerPosition = new window.naver.maps.LatLng(37.449020, 126.657111);

  //   // 지도 옵션
  //   const mapOptions = {
  //     center: centerPosition,
  //     zoom: 17,
  //     minZoom: 13,
  //     maxZoom: 20,
  //   };
  //   const map = new window.naver.maps.Map(mapRef.current, mapOptions);

  //   // 테스트용 마커
  //   new window.naver.maps.Marker({
  //     position: centerPosition,
  //     map: map,
  //     title: "7호관",
  //   });
  // }, [isLoaded]);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/buildings");
        console.log("api response", res.data);

        if (res.data.success) {
          setBuildings(res.data.data);
          console.log("📍 건물 개수:", res.data.data.length);
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

    buildings.forEach((building) => {
      const markerPosition = new (window as any).naver.maps.LatLng(
        building.coordinates.lat,
        building.coordinates.lng
      );
      const marker = new (window as any).naver.maps.Marker({
        position: markerPosition,
        map: map, 
        title: building.name,
      });
      console.log("마커 생성:", building.name);
    })
  }, [isLoaded, buildings]);
  return (
    <div className="w-full h-screen">
      <div ref={mapRef} className="w-full h-[420px]" />
    </div>
  );
}


export default NaverMap;
